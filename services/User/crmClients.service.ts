import {
    postRegisterCRMClientsData,
    postManyCRMClientsData,
    getCRMClientsData,
    getCRMClientsBranchData,
    getCRMClientByIdData,
    putCRMClientData,
    deleteCRMClientData,
} from "../../data/User/crmClients.data";
import {
    ServiceError,
    ICrmClientsServiceLayerResponse,
} from '../../types/Responses/responses.types';
import { ICrmClients } from '../../types/User/crmClients.types';

//SERVICE PARA CREAR UN CLIENTE DEL USER
export const postRegisterCRMClientsService = async (userId: string, body: ICrmClients): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const dataLayerResponse = await postRegisterCRMClientsData(userId, body);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe un cliente con el mismo documento de identidad");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//CREAR MUCHOS CLIENTES DESDE EL EXCEL
export const postManyCRMClientsService = async (bodyArray: ICrmClients[], userId: string, typeRole: string): Promise<ICrmClientsServiceLayerResponse> => {
    const uniqueCRMClient: ICrmClients[] = [];
    const duplicatedCRMClients: ICrmClients[] = [];
    try {
        for (const crmClient of bodyArray) {           
            // Crear el cliente
            const createdCRMClient = await postManyCRMClientsData(crmClient, userId, typeRole);
            if (createdCRMClient) {
                uniqueCRMClient.push(createdCRMClient);
            } else duplicatedCRMClients.push(crmClient);
        }
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueCRMClient };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS CLIENTES DE UN USER
export const getCRMClientsUserService = async (userId: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const dataLayerResponse = await getCRMClientsData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS CLIENTES POR SEDE DE USER
export const getCRMClientsBranchService = async (idBranch: string, userId: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const cRMClientsFound = await getCRMClientsBranchData(idBranch, userId);
        if (!cRMClientsFound) return { code: 404, message: "Clientes no encontrados en esta sede" };
        return { code: 200, result: cRMClientsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UN CLIENTE POR ID PERTENECIENTE AL USER
export const getCRMClientByIdService = async (idCrmClient: string, userId: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const cRMClientFound = await getCRMClientByIdData(idCrmClient, userId);
        if (!cRMClientFound) return { code: 404, message: "Cliente no encontrado" };
        return { code: 200, result: cRMClientFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR UN CLIENTE PERTENECIENTE AL USER
export const putCRMClientService = async (idCrmClient: string, body: ICrmClients, userId: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const updateCRMClient = await putCRMClientData(idCrmClient, body, userId);
        if (!updateCRMClient) throw new ServiceError(404, "Cliente no encontrado");
        return { code: 200, message: "Cliente actualizado exitosamente", result: updateCRMClient };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UN CLIENTE PERTENECIENTE AL USER
export const deleteCRMClientService = async (idCrmClient: string, userId: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        await deleteCRMClientData(idCrmClient, userId);
        return { code: 200, message: "Cliente eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};