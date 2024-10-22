import {
    postRegisterCRMSupplierData,
    postManyCRMSuppliersData,
    getCRMSuppliersData,
    getCRMSuppliersPaginatedData,
    getCRMSuppliersBranchData,
    getCRMSupplierByIdData,
    putCRMSupplierData,
    deleteCRMSupplierData,
} from "../../data/UserPanel/crmSupplier.data";
import { ServiceError, ICrmSuppliersServiceLayerResponse, ICrmSuppliersServiceLayerResponsePaginated } from '../../types/Responses/responses.types';
import { ICrmSuppliers } from '../../types/UserPanel/crmSupplier.types';

//SERVICE PARA CREAR UN PROVEEDOR DEL USER
export const postRegisterCrmSupplierService = async (userId: string, body: ICrmSuppliers): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const dataLayerResponse = await postRegisterCRMSupplierData(userId, body);
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
export const postManyCrmSuppliersService = async (userId: string, typeRole: string, bodyArray: ICrmSuppliers[]): Promise<ICrmSuppliersServiceLayerResponse> => {
    const uniqueCRMSupplier: ICrmSuppliers[] = [];
    const duplicatedCRMSupplier: ICrmSuppliers[] = [];
    try {
        for (const crmSupplier of bodyArray) {           
            // Crear el proveedor
            const createdCRMSupplier = await postManyCRMSuppliersData(userId, typeRole, crmSupplier);
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
export const getCrmSuppliersService = async (userId: string): Promise<ICrmSuppliersServiceLayerResponse> => {
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



//OBTENER TODOS LOS PROVEEDORES PAGINADOS DE UN USER
export const getCrmSuppliersPaginatedService = async (userId: string, page: number, limit: number): Promise<ICrmSuppliersServiceLayerResponsePaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getCRMSuppliersPaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PROVEEDORES POR SEDE DE USER
export const getCrmSuppliersBranchService = async (userId: string, idBranch: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const cRMSuppliersFound = await getCRMSuppliersBranchData(userId, idBranch);
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
export const getCrmSupplierByIdService = async (userId: string, idCrmSupplier: string): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const cRMSupplierFound = await getCRMSupplierByIdData(userId, idCrmSupplier);
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
export const putCrmSupplierService = async (userId: string, idCrmSupplier: string, body: ICrmSuppliers): Promise<ICrmSuppliersServiceLayerResponse> => {
    try {
        const updateCRMSupplier = await putCRMSupplierData(userId, idCrmSupplier, body);
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
export const deleteCrmSupplierService = async (userId: string, idCrmSupplier: string): Promise<ICrmSuppliersServiceLayerResponse> => {
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