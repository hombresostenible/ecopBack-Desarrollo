import {  
    getItemBarCodeData,
    getNameItemData,
    getAllItemsByBranchData,
} from "../../data/User/allItems.data";
import { IServiceLayerResponseItemByBarCodeOrName, IServiceLayerResponseAllItems } from '../../types/Responses/responses.types';
import { ServiceError } from '../../types/Responses/responses.types';

//BUSCA TODOS LOS ARTICULOS DEL USUARIO EN TODAS LAS TABLAS
export const getAllItemsByBranchService = async (idBranch:string, userId: string): Promise<IServiceLayerResponseAllItems> => {
    try {
        const itemFound = await getAllItemsByBranchData(idBranch, userId);
        if (!itemFound) return { code: 404, message: 'Item no registrado' };
        return { code: 200, result: itemFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//BUSCAR UN ITEM DE ASSETS, MERCHANDISE, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
export const getItemBarCodeService = async (userId: string, barCode: string): Promise<IServiceLayerResponseItemByBarCodeOrName> => {
    try {
        const itemFound = await getItemBarCodeData(userId, barCode);
        if (!itemFound) return { code: 404, message: 'Item no registrado' };
        return { code: 200, result: itemFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//BUSCAR UN ITEM DE ASSETS, MERCHANDISE, PRODUCT O RAWMATERIAL POR NOMBRE
export const getNameItemService = async (nameItem: string, userId: string): Promise<IServiceLayerResponseItemByBarCodeOrName> => {
    try {
        const itemFound = await getNameItemData(nameItem, userId);
        if (!itemFound) return { code: 404, message: 'Item no registrado' };
        return { code: 200, result: itemFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};