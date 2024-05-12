import {
    postRawMaterialData,
    postManyRawMaterialData,
    getRawMaterialsData,
    getRawMaterialsByUserIdData,
    getRawMaterialBranchByIdData,
    getRawMaterialByIdData,
    putRawMaterialData,
    putUpdateManyRawMaterialData,
    patchRawMaterialData,
    deleteRawMaterialData
} from "../../data/User/rawMaterial.data";
import { isBranchAssociatedWithUserRole } from '../../helpers/Branch.helper';
import { checkPermissionForBranchRawMaterial, checkPermissionForRawMaterial } from '../../helpers/RawMaterial.helper';
import { IRawMaterial } from "../../types/User/rawMaterial.types";
import { ServiceError, IServiceLayerResponseRawMaterial } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR MATERIA PRIMA POR SEDE PARA USER
export const postRawMaterialService = async (body: IRawMaterial, userId: string, userType: string, employerId: string, typeRole: string, userBranchId: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        if (userType === 'User') {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, employerId, typeRole, userBranchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear una materia en esta sede");
        }
        const dataLayerResponse = await postRawMaterialData(body, userId, userType, employerId, typeRole);
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
export const postManyRawMaterialService = async (rawMaterials: IRawMaterial[], userId: string, userType: string, employerId: string, typeRole: string, userBranchId: string): Promise<IServiceLayerResponseRawMaterial> => {
    const uniqueRawMaterials: IRawMaterial[] = [];
    const duplicatedRawMaterials: IRawMaterial[] = [];
    try {
        for (const rawMaterial of rawMaterials) {
            // Verificar los permisos del usuario para crear materias primas en la sede específica
            if (userType === 'User') {
                const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(rawMaterial.branchId, userId, employerId, typeRole, userBranchId);
                if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear materias primas en esta sede");
            }
            // Crear la materia prima
            const createdRawMaterial = await postManyRawMaterialData(rawMaterial, userId, userType, employerId, typeRole);
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



//SERVICE PARA OBTENER TODOS LAS MATERIAS PRIMASDE DE TODOS LOS USER - CEO PLATATORMA
export const getRawMaterialsService = async (): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const dataLayerResponse = await getRawMaterialsData();
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UN USER
export const getRawMaterialsUserService = async (userId: string, userType: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        let dataLayerResponse;
        if (userType === 'User') {
            dataLayerResponse = await getRawMaterialsByUserIdData(userId);
        }
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};




//SERVICE PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UNA SEDE DE USER
export const getRawMaterialBranchService = async (idBranch: string, userId: string, userType: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForBranchRawMaterial(idBranch, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener las materias primas de esta sede");
        const rawMaterialsFound = await getRawMaterialBranchByIdData(idBranch);
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
export const getRawMaterialService = async (idRawMaterial: string, userId: string, userType: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(idRawMaterial, userId, userType);
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



//SERVICE PARA ACTUALIZAR UNA MATERIA PRIMA PERTENECIENTE AL USER
export const putRawMaterialService = async (idRawMaterial: string, body: IRawMaterial, userId: string, userType: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(idRawMaterial, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar esta materia prima");
        const updateRawMaterial = await putRawMaterialData(idRawMaterial, body, userId, userType);
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
export const putUpdateManyRawMaterialService = async (rawMaterials: IRawMaterial[], userId: string, userType: string, employerId: string, typeRole: string, userBranchId: string): Promise<IServiceLayerResponseRawMaterial> => {
    const uniqueRawMaterials: IRawMaterial[] = [];
    const duplicatedRawMaterials: IRawMaterial[] = [];

    try {
        for (const rawMaterial of rawMaterials) {
            if (userType === 'User') {
                const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(rawMaterial.branchId, userId, employerId, typeRole, userBranchId);
                if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar las materias primas en esta sede");
            }
            const updatedRawMaterial = await putUpdateManyRawMaterialData(rawMaterial, userId, userType,);
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
export const patchRawMaterialService = async (idRawMaterial: string, body: any, userId: string, userType: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(idRawMaterial, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para retirar del inventario esta materia prima");
        const updateRawMaterial = await patchRawMaterialData(idRawMaterial, body, userId, userType);
        if (!updateRawMaterial) throw new ServiceError(404, "Materia prima no encontrado");
        return { code: 200, message: "Unidades de la materia prima retiradas del inventario exitosamente", result: updateRawMaterial };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UNA MATERIA PRIMA PERTENECIENTE AL USER
export const deleteRawMaterialService = async (idRawMaterial: string, userId: string, userType: string): Promise<IServiceLayerResponseRawMaterial> => {
    try {
        const hasPermission = await checkPermissionForRawMaterial(idRawMaterial, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar esta materia prima");
        await deleteRawMaterialData(idRawMaterial);
        return { code: 200, message: "Materia prima eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};