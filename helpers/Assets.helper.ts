import {
    getAssetBranchData,
    getAssetByIdData,
} from "../data/UserPanel/03Inventories/01InventoryAssets/assets.data";
import { ServiceError } from "../types/Responses/responses.types";

//CHEQUEA SI LOS EQUIPOS, HERRAMIENTAS O MAQUINAS PERTENECEN A LA SEDE DE USER
export const checkPermissionForBranchAssets = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const assets = await getAssetBranchData(idBranch);
        if (!assets) return false;
        for (const machinery of assets) {
            if (machinery.userId !== userId) return false;
        };
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CHEQUEA SI EL EQUIPO, HERRAMIENTA O MAQUINA PERTENECEN A LA SEDE DE USER
export const checkPermissionForAssets = async (userId: string, idAssets: string): Promise<boolean> => {
    try {
        const asset = await getAssetByIdData(userId, idAssets);
        if (!asset) return false;
        if (asset.userId !== userId) return false; 
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};