import {
    postRegisterCRMSupplierData,
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
export const postRegisterCRMSuppliersService = async (body: ICrmSuppliers, userId: string, userType: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const dataLayerResponse = await postRegisterCRMSupplierData(body, userId, userType);
        if (!dataLayerResponse) throw new ServiceError(400, "El proveedor ya existe");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PROVEEDORES DE UN USER
export const getCRMSuppliersUserService = async (userId: string, userType: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const dataLayerResponse = await getCRMSuppliersData(userId, userType);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PROVEEDORES POR SEDE DE USER
export const getCRMSuppliersBranchService = async (idBranch: string, userId: string, userType: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const cRMSuppliersFound = await getCRMSuppliersBranchData(idBranch, userId, userType);
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
export const getCRMSupplierByIdService = async (idCRMSupplier: string, userId: string, userType: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const cRMSupplierFound = await getCRMSupplierByIdData(idCRMSupplier, userId, userType);
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
export const putCRMSupplierService = async (idCRMSupplier: string, body: ICrmSuppliers, userId: string, userType: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const updateCRMSupplier = await putCRMSupplierData(idCRMSupplier, body, userId, userType);
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
export const deleteCRMSupplierService = async (idCRMSupplier: string, userId: string, userType: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        await deleteCRMSupplierData(idCRMSupplier, userId, userType);
        return { code: 200, message: "Proveedor eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};