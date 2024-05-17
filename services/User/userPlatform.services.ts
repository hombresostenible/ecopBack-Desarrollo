import {
    //AMBOS
    getUserPlatformData,
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

//SERVICE PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA DE UN USER
export const getUserPlatformService = async (userId: string): Promise<IServiceLayerResponseUserPlatform> => {
    try {
        const dataLayerResponse = await getUserPlatformData(userId);
        return { code: 200, result: dataLayerResponse };
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