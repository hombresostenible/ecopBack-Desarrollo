import {
    postMerchandiseData,
    postManyMerchandiseData,
    getMerchandiseByUserIdData,
    getMerchandiseBranchByIdData,
    getMerchandiseByIdData,
    getMerchandiseOffData,
    getMerchandisesOffByBranchData,
    putMerchandiseData,
    putUpdateManyMerchandiseData,
    patchMerchandiseData,
    patchAddInventoryMerchandiseData,
    deleteMerchandiseData,
} from "../../data/User/merchandise.data";
import { isBranchAssociatedWithUserRole } from '../../helpers/Branch.helper';
import { checkPermissionForBranchMerchandise, checkPermissionForMerchandise } from '../../helpers/Merchandise.helper';
import { IMerchandise } from "../../types/User/merchandise.types";
import { ServiceError, IServiceLayerResponseMerchandise } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR UNA MERCANCIA POR SEDE PARA USER
export const postMerchandiseService = async (body: IMerchandise, userId: string, typeRole: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear una mercancía en esta sede");
        const dataLayerResponse = await postMerchandiseData(body, userId, typeRole);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe una mercancía con el mismo nombre en esta sede, cámbialo");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA CREAR MUCHAS MERCANCIAS POR SEDE PARA USER DESDE EL EXCEL
export const postManyMerchandiseService = async (merchandises: IMerchandise[], userId: string, typeRole: string): Promise<IServiceLayerResponseMerchandise> => {
    const uniqueMerchandises: IMerchandise[] = [];
    const duplicatedMerchandises: IMerchandise[] = [];

    try {
        for (const merchandise of merchandises) {
            // Verificar los permisos del usuario para crear mercancías en la sede específica
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(merchandise.branchId, userId, typeRole);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear mercancías en esta sede");
            // Crear la mercancía
            const createdMerchandise = await postManyMerchandiseData(merchandise, userId, typeRole);
            if (createdMerchandise) {
                uniqueMerchandises.push(createdMerchandise);
            } else duplicatedMerchandises.push(merchandise);
        }
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueMerchandises };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODA LA MERCANCIA DEL USER
export const getMerchandiseUserService = async (userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const dataLayerResponse = await getMerchandiseByUserIdData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODA LA MERCANCIA DE UNA SEDE PARA USER
export const getMerchandiseBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const hasPermission = await checkPermissionForBranchMerchandise(idBranch, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener toda la mercancía de la sede");
        const merchandisesFound = await getMerchandiseBranchByIdData(idBranch);
        if (!merchandisesFound) return { code: 404, message: "No tienes permiso para obtener toda la mercancía de la sede" };
        return { code: 200, result: merchandisesFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UNA MERCANCIA POR ID PERTENECIENTE AL USER
export const getMerchandiseService = async (idMerchandise: string, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const hasPermission = await checkPermissionForMerchandise(idMerchandise, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a esta mercancía");
        const merchandiseFound = await getMerchandiseByIdData(idMerchandise);
        if (!merchandiseFound) return { code: 404, message: "Producto no encontrado" };
        return { code: 200, result: merchandiseFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODAS LAS MERCANCIAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getMerchandiseOffService = async (userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const dataLayerResponse = await getMerchandiseOffData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODAS LAS MERCANCIAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getMerchandiseSOffByBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const dataLayerResponse = await getMerchandisesOffByBranchData(idBranch, userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ACTUALIZAR UNA MERCANCIA PERTENECIENTE AL USER
export const putMerchandiseService = async (idMerchandise: string, body: IMerchandise, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const hasPermission = await checkPermissionForMerchandise(idMerchandise, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar esta mercancía");
        const updateMerchandise = await putMerchandiseData(idMerchandise, body, userId);
        if (!updateMerchandise) throw new ServiceError(404, "Mercancia no encontrada");
        return { code: 200, message: "Mercancia actualizado exitosamente", result: updateMerchandise };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR DE FORMA MASIVA VARIAS MERCANCIAS
export const putUpdateManyMerchandiseService = async (merchandises: IMerchandise[], userId: string, typeRole: string): Promise<IServiceLayerResponseMerchandise> => {
    const uniqueMerchandises: IMerchandise[] = [];
    const duplicatedMerchandises: IMerchandise[] = [];
    try {
        for (const merchandise of merchandises) {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(merchandise.branchId, userId, typeRole);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar las mercancías en esta sede");
            const updatedMerchandise = await putUpdateManyMerchandiseData(merchandise, userId,);
            if (updatedMerchandise) {
                uniqueMerchandises.push(updatedMerchandise);
            } else duplicatedMerchandises.push(merchandise);
        }
        return { code: 201, result: uniqueMerchandises };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA DAR DE BAJA UNA MERCANCIA DEL USER
export const patchMerchandiseService = async (idMerchandise: string, body: any, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const hasPermission = await checkPermissionForMerchandise(idMerchandise, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para retirar esta mercancía del inventario");

        // Verificar que inventoryOff sea un array
        if (body.inventoryOff && !Array.isArray(body.inventoryOff)) {
            body.inventoryOff = [body.inventoryOff];
        }

        const updateMerchandise = await patchMerchandiseData(idMerchandise, body);
        if (!updateMerchandise) throw new ServiceError(404, "Mercancia no encontrada");
        return { code: 200, message: "Unidades de la mercancía retiradas del inventario exitosamente", result: updateMerchandise };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UNA MERCANCIA DEL USER
export const patchAddInventoryMerchandiseService = async (idMerchandise: string, body: any, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const hasPermission = await checkPermissionForMerchandise(idMerchandise, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para aumentar unidades del inventario de esta mercancía");
        const updateMerchandise = await patchAddInventoryMerchandiseData(idMerchandise, body, userId);
        if (!updateMerchandise) throw new ServiceError(404, "Mercancia no encontrada");
        return { code: 200, message: "Unidades de la mercancía añadidas al inventario exitosamente", result: updateMerchandise };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UNA MERCANCIA PERTENECIENTE AL USER
export const deleteMerchandiseService = async (idMerchandise: string, userId: string): Promise<IServiceLayerResponseMerchandise> => {
    try {
        const hasPermission = await checkPermissionForMerchandise(idMerchandise, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar esta mercancía");
        await deleteMerchandiseData(idMerchandise);
        return { code: 200, message: "Mercancia eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};