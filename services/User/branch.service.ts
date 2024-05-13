import {
    postBranchData,
    postManyBranchData,
    getBranchsByUserIdData,
    getBranchByIdData,
    putBranchData,
    deleteBranchData
} from "../../data/User/branch.data";
import { checkPermissionForBranch } from '../../helpers/Branch.helper';
import { IBranch } from "../../types/User/branch.types";
import { ServiceError, IServiceLayerResponseBranch } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR UNA SEDE PARA USER
export const postBranchService = async (body: IBranch, userId: string, userType: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const dataLayerResponse = await postBranchData(body, userId, userType);
        if (!dataLayerResponse) throw new ServiceError(400, "La sede ya existe");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA CREAR MASIVAMENTE SEDES PARA USER DESDE EL EXCEL
export const postManyBranchService = async (branches: IBranch[], userId: string, userType: string): Promise<IServiceLayerResponseBranch> => {
    const uniqueBranches: IBranch[] = [];
    const duplicatedBranches: IBranch[] = [];
    try {
        for (const branch of branches) {
            const createdBranch = await postManyBranchData(branch, userId, userType);
            if (createdBranch) {
                uniqueBranches.push(createdBranch);
            } else duplicatedBranches.push(branch);
        };
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueBranches };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER TODAS LAS SEDES DE UN USER
export const getBranchsUserService = async (userId: string, userType: string): Promise<IServiceLayerResponseBranch> => {
    try {
        let dataLayerResponse;
        if (userType === 'User') {
            dataLayerResponse = await getBranchsByUserIdData(userId);
        }
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER UNA SEDE POR ID PERTENECIENTE AL USER
export const getBranchService = async (idBranch: string, userId: string, userType: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const hasPermission = await checkPermissionForBranch(idBranch, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a esta sede");
        const transactionFound = await getBranchByIdData(idBranch);
        if (!transactionFound) return { code: 404, message: 'Sede no encontrada' };
        return { code: 200, result: transactionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ACTUALIZAR UNA SEDE PERTENECIENTE AL USER
export const putBranchService = async (idBranch: string, body: IBranch, userId: string, userType: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const hasPermission = await checkPermissionForBranch(idBranch, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar esta sede");
        const updateBranch = await putBranchData(idBranch, body, userId, userType);
        if (!updateBranch) throw new ServiceError(404, 'Sede no encontrada');
        return { code: 200, message: 'Sede actualizada exitosamente', result: updateBranch };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ELIMINAR UNA SEDE PERTENECIENTE AL USER
export const deleteBranchService = async (idBranch: string, userId: string, userType: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const hasPermission = await checkPermissionForBranch(idBranch, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar esta sede");
        await deleteBranchData(idBranch);
        return { code: 200, message: "Sede eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};