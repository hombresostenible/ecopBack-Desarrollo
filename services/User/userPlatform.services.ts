import bcrypt from 'bcrypt';
import {
    postUserPlatformData,
    getUsersPlatformData,
    getUserPlatformByIdData,
    getUserPlatformBranchByIdData,
    putProfileUserPlatformData,
    deleteUserPlatformData,
} from "../../data/User/userPlatform.data";
import {
    ServiceError,
    IServiceLayerResponseUserPlatform,
} from '../../types/Responses/responses.types';
import { IUserPlatform } from '../../types/User/userPlatform.types';
import { checkPermissionForUserPlatformBranch, checkPermissionForUserPlatform } from '../../helpers/UserPlatform.helper';


//CREAR UN USUARIO DE PLATAFORMA
export const postUserPlatformService = async (body: IUserPlatform, userId: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        const serResult = await postUserPlatformData(body, userId);
        if (serResult) {          
            return { code: 201, result: serResult };
        } else return { code: 400, message: 'El email ya se encuentra registrado' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};


//SERVICE PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA DE UN USER
export const getUsersPlatformService = async (userId: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const dataLayerResponse = await getUsersPlatformData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER UN USUARIO DE PLATAFORMA POR ID PERTENECIENTE AL USER
export const getUserPlatformByIdService = async (userId: string, idUserPlatform: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const hasPermission = await checkPermissionForUserPlatformBranch(userId, idUserPlatform);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a esta mercancía");
        const merchandiseFound = await getUserPlatformByIdData(userId, idUserPlatform);
        if (!merchandiseFound) return { code: 404, message: "Producto no encontrado" };
        return { code: 200, result: merchandiseFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA PERTENECIENTES A UNA SEDE DE UN USER
export const getUserPlatformBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const hasPermission = await checkPermissionForUserPlatformBranch(idBranch, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los usuarios de esta sede");
        const usersPlatformFound = await getUserPlatformBranchByIdData(idBranch);
        if (!usersPlatformFound) return { code: 404, message: "Usuarios no encontrados en esta sede" };
        return { code: 200, result: usersPlatformFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR EL PERFIL DE UN USUARIO DE PLATAFORMA
export const putProfileUserPlatformService = async (body: IUserPlatform, userId: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const userUpdate = await putProfileUserPlatformData(body, userId);
        if (!userUpdate) throw new ServiceError(404, "Usuario de plataforma no encontrado");
        return { code: 200, message: "Usuario de plataforma actualizado exitosamente", result: userUpdate };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ELIMINAR UN USUARIO DE PLATAFORMA PERTENECIENTE A UN USER
export const deleteUserPlatformService = async (idUserPlatform: string, userId: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const hasPermission = await checkPermissionForUserPlatform(idUserPlatform, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este usuario");
        await deleteUserPlatformData(idUserPlatform);
        return { code: 200, message: "Usuario eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};