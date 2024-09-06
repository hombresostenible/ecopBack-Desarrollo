import {
    postRegisterCRMSupplierData,
    postManyCRMSuppliersData,
    getCRMSuppliersData,
    getCRMSuppliersBranchData,
    getCRMSupplierByIdData,
    putCRMSupplierData,
    deleteCRMSupplierData,
} from "../../data/User/crmSupplier.data";
import {
    ServiceError,
    ICrmSuppliersServiceLayerResponse,
} from '../../types/Responses/responses.types';
import { ICrmSuppliers } from '../../types/User/crmSupplier.types';

//SERVICE PARA CREAR UN PROVEEDOR DEL USER
export const postRegisterCRMSuppliersService = async (body: ICrmSuppliers, userId: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const dataLayerResponse = await postRegisterCRMSupplierData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "El proveedor ya existe");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//CREAR MUCHOS PROVEEDORES DESDE EL EXCEL
export const postManyCRMSuppliersService = async (bodyArray: ICrmSuppliers[], userId: string, typeRole: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    const uniqueCRMSupplier: ICrmSuppliers[] = [];
    const duplicatedCRMSupplier: ICrmSuppliers[] = [];
    try {
        for (const crmSupplier of bodyArray) {           
            // Crear el proveedor
            const createdCRMSupplier = await postManyCRMSuppliersData(crmSupplier, userId, typeRole);
            if (createdCRMSupplier) {
                uniqueCRMSupplier.push(createdCRMSupplier);
            } else duplicatedCRMSupplier.push(crmSupplier);
        }
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueCRMSupplier };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PROVEEDORES DE UN USER
export const getCRMSuppliersUserService = async (userId: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const dataLayerResponse = await getCRMSuppliersData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PROVEEDORES POR SEDE DE USER
export const getCRMSuppliersBranchService = async (idBranch: string, userId: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const cRMSuppliersFound = await getCRMSuppliersBranchData(idBranch, userId);
        if (!cRMSuppliersFound) return { code: 404, message: "Proveedores no encontrados en esta sede" };
        return { code: 200, result: cRMSuppliersFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UN PROVEEDOR POR ID PERTENECIENTE AL USER
export const getCRMSupplierByIdService = async (idCrmSupplier: string, userId: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const cRMSupplierFound = await getCRMSupplierByIdData(idCrmSupplier, userId);
        if (!cRMSupplierFound) return { code: 404, message: "Proveedor no encontrado" };
        return { code: 200, result: cRMSupplierFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR UN PROVEEDOR PERTENECIENTE AL USER
export const putCRMSupplierService = async (idCrmSupplier: string, body: ICrmSuppliers, userId: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const updateCRMSupplier = await putCRMSupplierData(idCrmSupplier, body, userId);
        if (!updateCRMSupplier) throw new ServiceError(404, "Proveedor no encontrado");
        return { code: 200, message: "Proveedor actualizado exitosamente", result: updateCRMSupplier };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UN PROVEEDOR PERTENECIENTE AL USER
export const deleteCRMSupplierService = async (userId: string, idCrmSupplier: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        await deleteCRMSupplierData(userId, idCrmSupplier);
        return { code: 200, message: "Proveedor eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};