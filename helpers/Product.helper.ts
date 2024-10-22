import {
    getProductsBranchData,
    getProductByIdData,
} from "../data/UserPanel/03Inventories/03InventoryProducts/product.data";
import { ServiceError } from '../types/Responses/responses.types';

//CHEQUEA SI LOS PRODUCTS PERTENECEN A LA SEDE DE USER
export const checkPermissionForBranchProduct = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const products = await getProductsBranchData(idBranch);
        if (!products) return false;
        for (const product of products) if (product.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CHEQUEA SI EL PRODUCT PERTENECE A LA SEDE DE USER
export const checkPermissionForProduct = async (userId: string, idProduct: string): Promise<boolean> => {
    try {
        const product = await getProductByIdData(idProduct);
        if (!product) return false;
        if (product.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};