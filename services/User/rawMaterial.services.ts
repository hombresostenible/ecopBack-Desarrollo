import {
    postRawMaterialData,
    postManyRawMaterialData,
    getRawMaterialsData,
    getRawMaterialByBranchData,
    getRawMaterialByIdData,
    getRawMaterialsOffData,
    getRawMaterialsOffByBranchData,
    putRawMaterialData,
    putUpdateManyRawMaterialData,
    patchRawMaterialData,
    patchAddInventoryRawMaterialData,
    deleteRawMaterialData
} from "../../data/User/rawMaterial.data";
import { isBranchAssociatedWithUserRole } from '../../helpers/Branch.helper';
import { checkPermissionForBranchRawMaterial, checkPermissionForRawMaterial } from '../../helpers/RawMaterial.helper';
import { IRawMaterial } from "../../types/User/rawMaterial.types";
import { ServiceError, IServiceLayerResponseRawMaterial } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR MATERIA PRIMA POR SEDE PARA USER
export const postRawMaterialService = async (userId: string, typeRole: string, body: IRawMaterial): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, body.branchId);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear una materia en esta sede");
        const dataLayerResponse = await postRawMaterialData(userId, typeRole, body);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe una materia prima con el mismo nombre en esta sede, cámbialo");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//DATA PARA CREAR MUCHAS MATERIAS PRIMAS POR SEDE PARA USER DESDE EL EXCEL
export const postManyRawMaterialService = async (userId: string, typeRole: string, rawMaterials: IRawMaterial[]): Promise<IServiceLayerResponseRawMaterial> => {
    const uniqueRawMaterials: IRawMaterial[] = [];
    const duplicatedRawMaterials: IRawMaterial[] = [];
    try {
        for (const rawMaterial of rawMaterials) {
            // Verificar los permisos del usuario para crear materias primas en la sede específica
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, rawMaterial.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear materias primas en esta sede");
            // Crear la materia prima
            const createdRawMaterial = await postManyRawMaterialData(userId, typeRole, rawMaterial);
            if (createdRawMaterial) {
                uniqueRawMaterials.push(createdRawMaterial);
            } else duplicatedRawMaterials.push(rawMaterial);
        }
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueRawMaterials };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UN USER
export const getRawMaterialsService = async (userId: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const dataLayerResponse = await getRawMaterialsData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UNA SEDE DE USER
export const getRawMaterialBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForBranchRawMaterial(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener las materias primas de esta sede");
        const rawMaterialsFound = await getRawMaterialByBranchData(idBranch);
        if (!rawMaterialsFound) return { code: 404, message: "Materias primas no encontradas en esta sede" };
        return { code: 200, result: rawMaterialsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UNA MATERIA PRIMA POR ID PERTENECIENTE AL USER
export const getRawMaterialService = async (userId: string, idRawMaterial: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(userId, idRawMaterial);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a esta materia prima");
        const rawMaterialFound = await getRawMaterialByIdData(idRawMaterial);
        if (!rawMaterialFound) return { code: 404, message: "Materia prima no encontrada" };
        return { code: 200, result: rawMaterialFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODAS LAS MATERIAS PRIMAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getRawMaterialsOffService = async (userId: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const dataLayerResponse = await getRawMaterialsOffData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODAS LAS MATERIAS PRIMAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getRawMaterialsOffByBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const dataLayerResponse = await getRawMaterialsOffByBranchData(userId, idBranch);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ACTUALIZAR UNA MATERIA PRIMA PERTENECIENTE AL USER
export const putRawMaterialService = async (userId: string, idRawMaterial: string, body: IRawMaterial): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        // const hasPermission = await checkPermissionForRawMaterial(userId, idRawMaterial);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar esta materia prima");
        const updateRawMaterial = await putRawMaterialData(userId, idRawMaterial, body);
        if (!updateRawMaterial) throw new ServiceError(404, 'Materia prima no encontrada');
        return { code: 200, message: 'Materia prima actualizado exitosamente', result: updateRawMaterial };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR DE FORMA MASIVA VARIAS MATERIAS PRIMAS
export const putUpdateManyRawMaterialService = async (userId: string, typeRole: string, rawMaterials: IRawMaterial[]): Promise<IServiceLayerResponseRawMaterial> => {
    const uniqueRawMaterials: IRawMaterial[] = [];
    const duplicatedRawMaterials: IRawMaterial[] = [];
    try {
        for (const rawMaterial of rawMaterials) {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, rawMaterial.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar las materias primas en esta sede");
            const updatedRawMaterial = await putUpdateManyRawMaterialData(userId, rawMaterial);
            if (updatedRawMaterial) {
                uniqueRawMaterials.push(updatedRawMaterial);
            } else duplicatedRawMaterials.push(rawMaterial);
        }
        return { code: 201, result: uniqueRawMaterials };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA DAR DE BAJA UNA MATERIA PRIMAS DEL USER
export const patchRawMaterialService = async (userId: string, idRawMaterial: string, body: any): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(userId, idRawMaterial);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para retirar del inventario esta materia prima");

        // Verificar que inventoryOff sea un array
        if (body.inventoryOff && !Array.isArray(body.inventoryOff)) {
            body.inventoryOff = [body.inventoryOff];
        }

        const updateMerchandise = await patchRawMaterialData(idRawMaterial, body);
        if (!updateMerchandise) throw new ServiceError(404, "Materia prima no encontrado");
        return { code: 200, message: "Unidades de la materia prima retiradas del inventario exitosamente", result: updateMerchandise };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UNA MATERIA PRIMA DEL USER
export const patchAddInventoryRawMaterialService = async (userId: string, idRawMaterial: string, body: any): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(userId, idRawMaterial);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para aumentar unidades del inventario de esta materia prima");
        const updateRawMaterial = await patchAddInventoryRawMaterialData(userId, idRawMaterial, body);
        if (!updateRawMaterial) throw new ServiceError(404, "Materia prima no encontrado");
        return { code: 200, message: "Unidades de la materia prima añadidas al inventario exitosamente", result: updateRawMaterial };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UNA MATERIA PRIMA PERTENECIENTE AL USER
export const deleteRawMaterialService = async (userId: string, idRawMaterial: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        // const hasPermission = await checkPermissionForRawMaterial(userId, idRawMaterial);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar esta materia prima");
        await deleteRawMaterialData(userId, idRawMaterial);
        return { code: 200, message: "Materia prima eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};