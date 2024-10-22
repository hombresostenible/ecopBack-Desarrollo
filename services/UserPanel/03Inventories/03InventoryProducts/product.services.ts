import * as cron from 'node-cron';
import {
    postProductsData,
    postManyProductsData,
    getProductsData,
    getProductsPaginatedData,
    getProductsBranchData,
    getProductByIdData,
    getProductOffData,
    getProductsOffByBranchData,
    putProductData,
    putUpdateManyProductsData,
    patchProductData,
    patchAddInventoryProductData,
    deleteProductData,
} from "../../../../data/UserPanel/03Inventories/03InventoryProducts/product.data";
import { isBranchAssociatedWithUserRole } from '../../../../helpers/Branch.helper';
import { checkPermissionForBranchProduct, checkPermissionForProduct } from '../../../../helpers/Product.helper';
import { IProduct } from '../../../../types/UserPanel/03Inventories/03InventoryProducts/products.types';
import { ServiceError, IServiceLayerResponseProduct, IServiceLayerResponseProductPaginated } from '../../../../types/Responses/responses.types';

//CREAR UN PRODUCTO POR SEDE PARA USER
export const postProductService = async (userId: string, typeRole: string, body: IProduct): Promise<IServiceLayerResponseProduct> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, body.branchId);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear un producto en esta sede");
        const dataLayerResponse = await postProductsData(userId, typeRole, body);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe un producto con el mismo nombre en esta sede, cámbialo");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//CREAR MUCHOS PRODUCTOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyProductsService = async (userId: string, typeRole: string, products: IProduct[]): Promise<IServiceLayerResponseProduct> => {
    const uniqueProducts: IProduct[] = [];
    const duplicatedProducts: IProduct[] = [];
    try {
        for (const product of products) {
            // Verificar los permisos del usuario para crear productos en la sede específica
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, product.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear productos en esta sede");
            // Crear el producto
            const createdProduct = await postManyProductsData(userId, typeRole, product);
            if (createdProduct) {
                uniqueProducts.push(createdProduct);
            } else duplicatedProducts.push(product);
        }
        // Devolver una respuesta adecuada
        return { code: 201, result: uniqueProducts };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS DE UN USER
export const getProductsService = async (userId: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const dataLayerResponse = await getProductsData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS PAGINADOS DE UN USER
export const getProductsPaginatedService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseProductPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getProductsPaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS DE UNA SEDE DE USER
export const getProductsBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForBranchProduct(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener los productos de esta sede");
        const productsFound = await getProductsBranchData(idBranch);
        if (!productsFound) return { code: 404, message: "Productos no encontrados en esta sede" };
        return { code: 200, result: productsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER UN PRODUCTO POR ID PERTENECIENTE AL USER
export const getProductByIdService = async (userId: string, idProduct: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(userId, idProduct);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este producto");
        const productFound = await getProductByIdData(idProduct);
        if (!productFound) return { code: 404, message: "Producto no encontrado" };
        return { code: 200, result: productFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getProductOffService = async (userId: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const dataLayerResponse = await getProductOffData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS PRODUCTOS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getProductsOffByBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const dataLayerResponse = await getProductsOffByBranchData(userId, idBranch);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
export const putProductService = async (userId: string, idProduct: string, body: IProduct): Promise<IServiceLayerResponseProduct> => {
    try {
        // const hasPermission = await checkPermissionForProduct(userId, idProduct);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este producto");
        const updateProduct = await putProductData(userId, idProduct, body);
        if (!updateProduct) throw new ServiceError(404, "Producto no encontrado");
        return { code: 200, message: "Producto actualizado exitosamente", result: updateProduct };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//ACTUALIZAR DE FORMA MASIVA VARIOS PRODUCTOS
export const putUpdateManyProductService = async (userId: string, typeRole: string, products: IProduct[]): Promise<IServiceLayerResponseProduct> => {
    const uniqueProducts: IProduct[] = [];
    const duplicatedProducts: IProduct[] = [];

    try {
        for (const product of products) {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, typeRole, product.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar los productos en esta sede");
            const updatedProduct = await putUpdateManyProductsData(userId, product);
            if (updatedProduct) {
                uniqueProducts.push(updatedProduct);
            } else duplicatedProducts.push(product);
        }

        return { code: 201, result: uniqueProducts };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//DAR DE BAJA UN PRODUCTO DEL USER
export const patchProductService = async (userId: string, idProduct: string, body: any): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(userId, idProduct);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para retirar del inventario este producto");

        // Verificar que inventoryOff sea un array
        if (body.inventoryOff && !Array.isArray(body.inventoryOff)) {
            body.inventoryOff = [body.inventoryOff];
        }

        const updateProduct = await patchProductData(idProduct, body);
        if (!updateProduct) throw new ServiceError(404, "Producto no encontrado");
        return { code: 200, message: "Unidades del producto retiradas del inventario exitosamente", result: updateProduct };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UN PRODUCTO DEL USER
export const patchAddInventoryProductService = async (userId: string, idProduct: string, body: any): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(userId, idProduct);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para aumentar unidades del inventario de este productos");
        const updateProduct = await patchAddInventoryProductData(userId, idProduct, body);
        if (!updateProduct) throw new ServiceError(404, "Producto no encontrado");
        return { code: 200, message: "Unidades del producto añadidas al inventario exitosamente", result: updateProduct };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
export const deleteProductService = async (userId: string, idProduct: string): Promise<IServiceLayerResponseProduct> => {
    try {
        // const hasPermission = await checkPermissionForProduct(userId, idProduct);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este producto");
        await deleteProductData(userId, idProduct);
        return { code: 200, message: "Producto eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};