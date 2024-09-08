import {
    getRawMaterialByBranchData,
    getRawMaterialByIdData,
} from "../data/User/rawMaterial.data";
import { ServiceError } from '../types/Responses/responses.types';

//CHEQUEA SI LAS RAWMATERIAL PERTENECEN A LA SEDE DE USER
export const checkPermissionForBranchRawMaterial = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const products = await getRawMaterialByBranchData(idBranch);
        if (!products) return false;
        for (const product of products) if (product.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CHEQUEA SI LA RAWMATERIAL PERTENECE A LA SEDE DE USER
export const checkPermissionForRawMaterial = async (userId: string, idRawMaterial: string): Promise<boolean> => {
    try {
        const rawMaterial = await getRawMaterialByIdData(idRawMaterial);
        if (!rawMaterial) return false;
        if (rawMaterial.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};