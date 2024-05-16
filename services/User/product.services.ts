import * as cron from 'node-cron';
import {
    postProductsData,
    postManyProductsData,
    getProductsData,
    getProductsByUserIdData,
    getProductsBranchByIdData,
    getProductByIdData,
    putProductData,
    putUpdateManyProductData,
    patchProductData,
    deleteProductData,
} from "../../data/User/product.data";
import { isBranchAssociatedWithUserRole } from '../../helpers/Branch.helper';
import { checkPermissionForBranchProduct, checkPermissionForProduct } from '../../helpers/Product.helper';
import { IProduct } from "../../types/User/products.types";
import { ServiceError, IServiceLayerResponseProduct } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR UN PRODUCTO POR SEDE PARA USER
export const postProductService = async (body: IProduct, userId: string, userType: string, employerId: string, typeRole: string, userBranchId: string): Promise<IServiceLayerResponseProduct> => {
    try {
        if (userType === 'User') {
            const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, employerId, typeRole, userBranchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear un producto en esta sede");
        }
        const dataLayerResponse = await postProductsData(body, userId, userType, employerId, typeRole);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya existe un producto con el mismo nombre en esta sede, cámbialo");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



// // Función para autoincrementar el inventario
// async function autoIncrementInventory(product: IProduct) {
//     // Lógica para incrementar el inventario
//     product.inventory += product.automaticInventoryIncrease || 0;
  
//     // Guarda los cambios en la base de datos
//     await postProductsData(product, product.userId || '');
//   }
  
//   // Función para iniciar la tarea cron según la periodicidad especificada
//   export function startCronJob(product: IProduct) {
//     const periodicity = product.periodicityAutomaticIncrease;
  
//     // Configura la tarea cron según la periodicidad
//     switch (periodicity) {
//       case 'Diario':
//         cron.schedule('0 0 * * *', () => {
//           autoIncrementInventory(product);
//         });
//         break;
//       case 'Semanal':
//         // Configura para ejecutarse todos los lunes a las 0:00
//         cron.schedule('0 0 * * 1', () => {
//           autoIncrementInventory(product);
//         });
//         break;
//       // Añade casos para las otras periodicidades según sea necesario
//       // ...
//       default:
//         console.error('Periodicidad no válida');
//     }
//   }



//DATA PARA CREAR MUCHOS PRODUCTOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyProductService = async (products: IProduct[], userId: string, userType: string, employerId: string, typeRole: string, userBranchId: string): Promise<IServiceLayerResponseProduct> => {
    const uniqueProducts: IProduct[] = [];
    const duplicatedProducts: IProduct[] = [];

    try {
        for (const product of products) {
            // Verificar los permisos del usuario para crear productos en la sede específica
            if (userType === 'User') {
                const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(product.branchId, userId, employerId, typeRole, userBranchId);
                if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para crear productos en esta sede");
            }
            // Crear el producto
            const createdProduct = await postManyProductsData(product, userId, userType, employerId, typeRole);
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



//SERVICE PARA OBTENER TODOS LOS PRODUCTOS DE TODOS LOS USER - CEO PLATATORMA
export const getProductsService = async (): Promise<IServiceLayerResponseProduct> => {
    try {
        const dataLayerResponse = await getProductsData();
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PRODUCTOS DE UN USER
export const getProductsUserService = async (userId: string, userType: string): Promise<IServiceLayerResponseProduct> => {
    try {
        let dataLayerResponse;
        if (userType === 'User') {
            dataLayerResponse = await getProductsByUserIdData(userId);
        }
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER TODOS LOS PRODUCTOS DE UNA SEDE DE USER
export const getProductBranchService = async (idBranch: string, userId: string, userType: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForBranchProduct(idBranch, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener los productos de esta sede");
        const productsFound = await getProductsBranchByIdData(idBranch);
        if (!productsFound) return { code: 404, message: "Productos no encontrados en esta sede" };
        return { code: 200, result: productsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA OBTENER UN PRODUCTO POR ID PERTENECIENTE AL USER
export const getProductByIdService = async (idProduct: string, userId: string, userType: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(idProduct, userId, userType);
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



//SERVICE PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
export const putProductService = async (idProduct: string, body: IProduct, userId: string, userType: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(idProduct, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este producto");
        const updateProduct = await putProductData(idProduct, body, userId, userType);
        if (!updateProduct) throw new ServiceError(404, "Producto no encontrado");
        return { code: 200, message: "Producto actualizado exitosamente", result: updateProduct };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA ACTUALIZAR DE FORMA MASIVA VARIOS PRODUCTOS
export const putUpdateManyProductService = async (products: IProduct[], userId: string, userType: string, employerId: string, typeRole: string, userBranchId: string): Promise<IServiceLayerResponseProduct> => {
    const uniqueProducts: IProduct[] = [];
    const duplicatedProducts: IProduct[] = [];

    try {
        for (const product of products) {
            if (userType === 'User') {
                const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(product.branchId, userId, employerId, typeRole, userBranchId);
                if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualziar los productos en esta sede");
            }
            const updatedProduct = await putUpdateManyProductData(product, userId, userType,);
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




//SERVICE PARA DAR DE BAJA UN PRODUCTO DEL USER
export const patchProductService = async (idProduct: string, body: any, userId: string, userType: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(idProduct, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para retirar del inventario este producto");
        const updateProduct = await patchProductData(idProduct, body, userId, userType);
        if (!updateProduct) throw new ServiceError(404, "Producto no encontrado");
        return { code: 200, message: "Unidades del producto retiradas del inventario exitosamente", result: updateProduct };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};


//SERVICE PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
export const deleteProductService = async (idProduct: string, userId: string, userType: string): Promise<IServiceLayerResponseProduct> => {
    try {
        const hasPermission = await checkPermissionForProduct(idProduct, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este producto");
        await deleteProductData(idProduct);
        return { code: 200, message: "Producto eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};