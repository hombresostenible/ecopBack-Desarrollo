import {
    getServiceBranchByIdData,
    getServiceByIdData,
} from "../data/User/services.data";
import { ServiceError } from '../types/Responses/responses.types';

//CHEQUEA SI LOS SERVICES PERTENECEN A LA SEDE DE USER
export const checkPermissionForBranchService = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const services = await getServiceBranchByIdData(idBranch);
        if (!services) return false;
        for (const service of services) if (service.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CHEQUEA SI EL SERVICE PERTENECE A LA SEDE DE USER
export const checkPermissionForServices = async (userId: string, idService: string): Promise<boolean> => {
    try {
        const services = await getServiceByIdData(idService);
        if (!services) return false;
        if (services.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};