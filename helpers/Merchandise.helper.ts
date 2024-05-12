import {
    getMerchandiseBranchByIdData,
    getMerchandiseByIdData,
} from "../data/User/merchandise.data";
import { ServiceError } from '../types/Responses/responses.types';

//CHEQUEA SI LAS MERCHANDISES PERTENECEN A LA SEDE DE USER O COMPANY
export const checkPermissionForBranchMerchandise = async (idBranch: string, userId: string, userType: string): Promise<boolean> => {
    try {
        const merchandises = await getMerchandiseBranchByIdData(idBranch);
        if (!merchandises) return false;
        for (const merchandise of merchandises) {
            if ((userType === 'User' && merchandise.userId !== userId) ||
                (userType === 'Company' && merchandise.companyId !== userId)) {
                return false;
            }
        }
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CHEQUEA SI LA MERCHANDISE PERTENECE A LA SEDE DE USER O COMPANY
export const checkPermissionForMerchandise = async (idMerchandise: string, userId: string, userType: string): Promise<boolean> => {
    try {
        const merchandise = await getMerchandiseByIdData(idMerchandise);
        if (!merchandise) return false;
        if (userType === 'User' && merchandise.userId !== userId) return false; 
        if (userType === 'Company' && merchandise.companyId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};