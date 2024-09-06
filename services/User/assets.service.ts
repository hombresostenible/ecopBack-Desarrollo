import {
    postAssetData,
    postManyAssetData,
    getAssetsData,
    getAssetBranchData,
    getAssetByIdData,
    getAssetsOffData,
    getAssetsOffByBranchData,
    putAssetData,
    putUpdateManyAssetData,
    patchAssetData,
    patchAddInventoryAssetData,
    deleteAssetData,
} from "../../data/User/assets.data";
import { isBranchAssociatedWithUserRole } from '../../helpers/Branch.helper';
import { checkPermissionForBranchAssets, checkPermissionForAssets } from '../../helpers/Assets.helper';
import { IAssets } from "../../types/User/assets.types";
import { ServiceError, IServiceLayerResponseAssets } from '../../types/Responses/responses.types';

//CREAR UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER
export const postAssetService = async (body: IAssets, userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        // const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        const dataLayerResponse = await postAssetData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe un equipo, máquina o herramienta con el mismo nombre en esta sede, cámbialo");//Esto es lo que se renderiza en la pantalla del usuario de la plataforma
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CREAR DE FORMA MASIVA UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER O DESDE EL EXCEL
export const postManyAssetService = async (userId: string, typeRole: string, assets: IAssets[]): Promise<IServiceLayerResponseAssets> => {
    const uniqueAssets: IAssets[] = [];
    const duplicatedAssets: IAssets[] = [];
    try {
        for (const asset of assets) {
            // Verificar los permisos del usuario para crear activos en la sede específica
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, asset.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear un equipo, máquina o herramienta en esta sede");
            // Crear el activo
            const createdAsset = await postManyAssetData(userId, typeRole, asset);
            if (createdAsset) {
                uniqueAssets.push(createdAsset);
            } else duplicatedAssets.push(asset);
        };

        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueAssets };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DE UN USER
export const getAssetsService = async (userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const dataLayerResponse = await getAssetsData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER UN EQUIPO, HERRAMIENTA O MAQUINA POR ID PERTENECIENTE AL USER
export const getAssetByIdService = async (idAssets: string, userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const hasPermission = await checkPermissionForAssets(idAssets, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este equipo, máquina o herramienta");
        const assetFound = await getAssetByIdData(idAssets);
        if (!assetFound) return { code: 404, message: "Equipo, máquina o herramienta no encontrado" };
        return { code: 200, result: assetFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE PARA USER
export const getAssetBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const hasPermission = await checkPermissionForBranchAssets(idBranch, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener los equipo, máquina o herramienta de esta sede");
        const assetsFound = await getAssetBranchData(idBranch);
        if (!assetsFound) return { code: 404, message: "Equipo, máquina o herramienta no encontrados en esta sede" };
        return { code: 200, result: assetsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getAssetsOffService = async (userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const dataLayerResponse = await getAssetsOffData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getAssetsOffByBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const dataLayerResponse = await getAssetsOffByBranchData(idBranch, userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//ACTUALIZAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putAssetService = async (userId: string, idAssets: string, body: IAssets): Promise<IServiceLayerResponseAssets> => {
    try {
        // const hasPermission = await checkPermissionForAssets(userId, idAssets);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este equipo, máquina o herramienta");
        const updateAsset = await putAssetData(userId, idAssets, body);
        if (!updateAsset) throw new ServiceError(404, "Equipo, máquina o herramienta no encontrado");
        return { code: 200, message: "Equipo, máquina o herramienta actualizada exitosamente", result: updateAsset };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//ACTUALIZAR DE FORMA MASIVA VARIOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putUpdateManyAssetService = async (assets: IAssets[], userId: string, typeRole: string): Promise<IServiceLayerResponseAssets> => {
    const uniqueAssets: IAssets[] = [];
    const duplicatedAssets: IAssets[] = [];
    try {
        for (const asset of assets) {
            // Verificar los permisos del usuario para actualizar activos en la sede específica
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(asset.branchId, userId, typeRole);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar los equipos, herramientas o máquinas en esta sede");
            // Actualizar el activo
            const updatedAsset = await putUpdateManyAssetData(asset, userId,);
            if (updatedAsset) {
                uniqueAssets.push(updatedAsset);
            } else duplicatedAssets.push(asset);
        };
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueAssets };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//DAR DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchAssetService = async (idAssets: string, body: any, userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const hasPermission = await checkPermissionForAssets(idAssets, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para dar de baja el activo");

        // Verificar que inventoryOff sea un array
        if (body.inventoryOff && !Array.isArray(body.inventoryOff)) {
            body.inventoryOff = [body.inventoryOff];
        }

        const updateAsset = await patchAssetData(idAssets, body);
        if (!updateAsset) throw new ServiceError(404, "Equipo, máquina o herramienta no encontrado");
        return { code: 200, message: "Equipo, máquina o herramienta dado de baja exitosamente", result: updateAsset };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchAddInventoryAssetService = async (idAssets: string, body: any, userId: string): Promise<IServiceLayerResponseAssets> => {
    try {
        const hasPermission = await checkPermissionForAssets(idAssets, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para aumentar unidades del inventario de este equipo, máquina o herramienta");
        const updateAsset = await patchAddInventoryAssetData(idAssets, body, userId);
        if (!updateAsset) throw new ServiceError(404, "Equipo, máquina o herramienta no encontrado");
        return { code: 200, message: "Unidades del equipo, máquina o herramienta añadidas al inventario exitosamente", result: updateAsset };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//ELIMINAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteAssetService = async (userId: string, idAssets: string): Promise<IServiceLayerResponseAssets> => {
    try {
        // const hasPermission = await checkPermissionForAssets(userId, idAssets);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este equipo, máquina o herramienta");
        await deleteAssetData(userId, idAssets);
        return { code: 200, message: "Equipo, máquina o herramienta eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};