import {
    getServiceBranchByIdData,
    getServicesByIdData,
} from "../data/User/services.data";
import { ServiceError } from '../types/Responses/responses.types';

//CHEQUEA SI LOS SERVICES PERTENECEN A LA SEDE DE USER O COMPANY
export const checkPermissionForBranchService = async (idBranch: string, userId: string, userType: string): Promise<boolean> => {
    try {
        const services = await getServiceBranchByIdData(idBranch);
        if (!services) return false;
        for (const service of services) if ((userType === 'User' && service.userId !== userId) || (userType === 'Company' && service.companyId !== userId)) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CHEQUEA SI EL SERVICE PERTENECE A LA SEDE DE USER O COMPANY
export const checkPermissionForServices = async (idServices: string, userId: string, userType: string): Promise<boolean> => {
    try {
        const services = await getServicesByIdData(idServices);
        if (!services) return false;
        if (userType === 'User' && services.userId !== userId) return false; 
        if (userType === 'Company' && services.companyId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};