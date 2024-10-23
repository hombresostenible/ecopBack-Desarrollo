import {
    getUserPlatformBranchByIdData,
    getUserPlatformByIdData,
} from "../data/UserPanel/06ElectronicPayroll/userPlatform.data";
import { ServiceError } from '../types/Responses/responses.types';

//VALIDA QUE LOS USARIOS DE PLATAFORMA PERTENEZCAN A UNA SEDE DE UN USER
export const checkPermissionForUserPlatformBranch = async (idBranch: string, userId: string): Promise<boolean> => {
    try {
        const usersPlatform = await getUserPlatformBranchByIdData(idBranch);
        if (!usersPlatform) return false;
        for (const userPlatform of usersPlatform) if (userPlatform.entityUserId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//VALIDA QUE SI EL USARIO DE PLATAFORMA LE PERTENECE A UN UN USER
export const checkPermissionForUserPlatform = async (userId: string, idUserPlatform: string): Promise<boolean> => {
    try {
        const userPlatform = await getUserPlatformByIdData(userId, idUserPlatform);
        if (!userPlatform) return false;
        if (userPlatform.id !== idUserPlatform) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};