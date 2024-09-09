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
export const postManyCRMClientsService = async (userId: string, typeRole: string, bodyArray: ICrmClients[]): Promise<ICrmClientsServiceLayerResponse> => {
    const uniqueRegisters: ICrmClients[] = [];
    const duplicatedRegisters: ICrmClients[] = [];
    try {
        for (const crmClient of bodyArray) {
            // Crear el cliente
            const createdRegister = await postManyCRMClientsData(userId, typeRole, crmClient);
            if (createdRegister) {
                uniqueRegisters.push(createdRegister);
            } else duplicatedRegisters.push(crmClient);
        }
        return { code: 201, result: uniqueRegisters };
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
export const getCRMClientsBranchService = async (userId: string, idBranch: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const cRMClientsFound = await getCRMClientsBranchData(userId, idBranch);
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
export const getCRMClientByIdService = async (userId: string, idCrmClient: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const cRMClientFound = await getCRMClientByIdData(userId, idCrmClient);
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
export const putCRMClientService = async (userId: string, idCrmClient: string, body: ICrmClients): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        const updateCRMClient = await putCRMClientData(userId, idCrmClient, body);
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
export const deleteCRMClientService = async (userId: string, idCrmClient: string): Promise<ICrmClientsServiceLayerResponse> => {
    try {
        await deleteCRMClientData(userId, idCrmClient);
        return { code: 200, message: "Cliente eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};