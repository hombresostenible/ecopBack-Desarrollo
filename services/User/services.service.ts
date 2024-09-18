import {
    postServicesData,
    postManyServicesData,
    getServicesData,
    getServicesPaginatedData,
    getServiceBranchByIdData,
    getServicesByIdData,
    putServicesData,
    putUpdateManyServiceData,
    deleteServicesData,
} from "../../data/User/services.data";
import { isBranchAssociatedWithUserRole } from '../../helpers/Branch.helper';
import { checkPermissionForBranchService, checkPermissionForServices } from '../../helpers/Service.helper';
import { IService } from "../../types/User/services.types";
import { ServiceError, IServiceLayerResponseService, IServiceLayerResponseServicePaginated } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR UN SERVICIO POR SEDE PARA USER
export const postServicesService = async (body: IService, userId: string, typeRole: string): Promise<IServiceLayerResponseService> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear el servicio en esta sede");
        const dataLayerResponse = await postServicesData(body, userId, typeRole);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe un servicio con el mismo nombre en esta sede, cámbialo");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA CREAR MUCHOS SERVICIOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyServicesService = async (userId: string, typeRole: string, services: IService[]): Promise<IServiceLayerResponseService> => {
    const uniqueServices: IService[] = [];
    const duplicatedServices: IService[] = [];
    try {
        for (const service of services) {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, service.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear servicio en esta sede");
            const createdService = await postManyServicesData(userId, typeRole, service);
            if (createdService) {
                uniqueServices.push(createdService);
            } else duplicatedServices.push(service);
        }
        return { code: 201, result: uniqueServices };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS SERVICIOS DEL USER
export const getServicesService = async (userId: string): Promise<IServiceLayerResponseService> => {
    try {
        const dataLayerResponse = await getServicesData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODOS LOS SERVICIOS PAGINADOS DE UN USER
export const getServicesPaginatedService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseServicePaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getServicesPaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS SERVICIOS POR SEDE PARA USER
export const getServicesBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseService> => {
    try {
        const hasPermission = await checkPermissionForBranchService(idBranch, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener los servicios de esta sede");
        const servicesFound = await getServiceBranchByIdData(idBranch);
        if (!servicesFound) return { code: 404, message: "No tienes permiso para obtener los servicios de esta sede" };
        return { code: 200, result: servicesFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UN SERVICIO POR ID PERTENECIENTE AL USER
export const getServicesByIdService = async (idMachinery: string, userId: string): Promise<IServiceLayerResponseService> => {
    try {
        const hasPermission = await checkPermissionForServices(idMachinery, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este servicio");
       
        const servicesFound = await getServicesByIdData(idMachinery);
        if (!servicesFound) return { code: 404, message: "Servicio no encontrado" };
        return { code: 200, result: servicesFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR UN SERVICIO DEL USER
export const putServicesService = async (userId: string, idService: string, body: IService): Promise<IServiceLayerResponseService> => {
    try {
        // const hasPermission = await checkPermissionForServices(userId, idService);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este servicio");
        const updateServices = await putServicesData(userId, idService, body);
        if (!updateServices) throw new ServiceError(404, "Servicio no encontrado");
        return { code: 200, message: "Servicio actualizado exitosamente", result: updateServices };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR DE FORMA MASIVA VARIO SERVICIOS
export const putUpdateManyServiceService = async (services: IService[], userId: string, typeRole: string): Promise<IServiceLayerResponseService> => {
    const uniqueServices: IService[] = [];
    const duplicatedServices: IService[] = [];
    try {
        for (const service of services) {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(service.branchId, userId, typeRole);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar los servicios en esta sede");
            const updatedService = await putUpdateManyServiceData(service, userId,);
            if (updatedService) {
                uniqueServices.push(updatedService);
            } else duplicatedServices.push(service);
        }

        return { code: 201, result: uniqueServices };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UN SERVICIO DEL USER
export const deleteServicesService = async (userId: string, idService: string): Promise<IServiceLayerResponseService> => {
    try {
        // const hasPermission = await checkPermissionForServices(userId, idService);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este service");
        await deleteServicesData(userId, idService);
        return { code: 200, message: "Servicio eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};