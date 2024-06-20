import {
    getAssetByBranchData,
    getAssetByIdData,
} from "../data/User/assets.data";
import { ServiceError } from "../types/Responses/responses.types";

//CHEQUEA SI LOS EQUIPOS, HERRAMIENTAS O MAQUINAS PERTENECEN A LA SEDE DE USER
export const checkPermissionForBranchAsset = async (idBranch: string, userId: string): Promise<boolean> => {
    try {
        const assets = await getAssetByBranchData(idBranch);
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



//CHEQUEA SI EL EQUIPO, HERRAMIENTA O MAQUINA PERTENECE AÑ USER
export const checkPermissionForAssets = async (idAssets: string, userId: string): Promise<boolean> => {
    try {
        const asset = await getAssetByIdData(idAssets);
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