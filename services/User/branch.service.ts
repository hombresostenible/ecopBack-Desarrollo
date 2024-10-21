import {
    postBranchesData,
    postManyBranchesData,
    getBranchesData,
    getBranchesPaginatedData,
    getBranchByIdData,
    putBranchData,
    deleteBranchData
} from "../../data/User/branch.data";
import { checkPermissionForBranch } from '../../helpers/Branch.helper';
import { IBranch } from "../../types/User/branch.types";
import { ServiceError, IServiceLayerResponseBranch, IServiceLayerResponseBranchPaginated } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR UNA SEDE PARA USER
export const postBranchesService = async (body: IBranch, userId: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const dataLayerResponse = await postBranchesData(body, userId);
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
export const postManyBranchesService = async (branches: IBranch[], userId: string): Promise<IServiceLayerResponseBranch> => {
    const uniqueBranches: IBranch[] = [];
    const duplicatedBranches: IBranch[] = [];
    try {
        for (const branch of branches) {
            const createdBranch = await postManyBranchesData(branch, userId);
            if (createdBranch) {
                uniqueBranches.push(createdBranch);
            } else duplicatedBranches.push(branch);
        };
        return { code: 201, result: uniqueBranches };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER TODAS LAS SEDES DE UN USER
export const getBranchesService = async (userId: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const dataLayerResponse = await getBranchesData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER TODAS LAS SEDES PAGINADAS DE UN USER
export const getBranchesPaginatedService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseBranchPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getBranchesPaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UNA SEDE POR ID PERTENECIENTE AL USER
export const getBranchByIdService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseBranch> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
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
export const putBranchService = async (userId: string, idBranch: string, body: IBranch): Promise<IServiceLayerResponseBranch> => {
    try {
        const updateBranch = await putBranchData(userId, idBranch, body);
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
export const deleteBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseBranch> => {
    try {
        // const hasPermission = await checkPermissionForBranch(userId, idBranch);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar esta sede");
        await deleteBranchData(userId, idBranch);
        return { code: 200, message: "Sede eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};