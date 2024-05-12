import {  
    postAccountsBookData, 
    getAccountsBooksData, 
    getAccountsBooksByUserIdData,
    getAccountsBooksByCompanyIdData,
    getAccountsBookByIdData,
    getAccountsBookByBranch,
    getItemBarCodeData,
    getNameItemData,
    getAllItemsData,
    putAccountsBookData,
    deleteAccountsBookData
} from "../../data/User/accountsBook.data";
import { isRegisterTransactionAssociatedWithUser } from '../../helpers/Branch.helper';
import { IAccountsBook } from "../../types/User/accountsBook.types";
import { IServiceLayerResponseAccountsBook } from '../../types/Responses/responses.types';
import { ServiceError } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR EL REGISTRO EN EL LIBRO DIARIO
export const postAccountsBookService = async (body: IAccountsBook, userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        if (userType === 'User') {
            const isBranchAssociatedWithUser: any = await isRegisterTransactionAssociatedWithUser(userId, body.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en el libro diario de esta sede");
        }
        const dataLayerResponse = await postAccountsBookData(body, userId, userType);
        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar en el libro diario");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER LOS REGISTROS DE TODOS LOS USER Y COMPANY DE LA PLATAFORMA- CEO PLATATORMA
export const getAccountsBooksService = async (): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const dataLayerResponse = await getAccountsBooksData();
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER LOS REGISTROS DE TODAS LAS SEDES DE UN USER O COMPANY
export const getAccountsBooksUserService = async (userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        let dataLayerResponse;
        if (userType === 'User') {
            dataLayerResponse = await getAccountsBooksByUserIdData(userId);
        }
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER UN LIBRO DIARIO POR ID PERTENECIENTE AL USUARIO
export const getAccountsBookService = async (idBranch: string, userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const hasPermission = await checkPermissionForAccountsBook(idBranch, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este libro diario");
        const transactionsFound = await getAccountsBookByBranch(idBranch);
        if (!transactionsFound) return { code: 404, message: 'Libro diario no encontrado' };
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};

//Chequea si las sedes pertenecen a User o Company, por eso usamos el "for", para iterar cada sede
const checkPermissionForAccountsBook = async (idBranch: string, userId: string, userType: string): Promise<boolean> => {
    try {
        const transactions = await getAccountsBookByBranch(idBranch);
        if (!transactions) return false;        
        for (const transaction of transactions) {
            if (userType === 'User' && transaction.userId !== userId) {
                return false;
            };
        };
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA BUSCAR UN ITEM DE MERCHANDISE, ASSETS, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
export const getItemBarCodeService = async (idBranch: string, barCode: string, userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const itemFound = await getItemBarCodeData(idBranch, barCode, userId, userType);
        if (!itemFound) return { code: 404, message: 'Item no registrado' };
        return { code: 200, result: itemFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



export const getNameItemService = async (nameItem: string, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
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



//SERVICE PARA OBTENER TODOS LOS ACTIVOS, MERCANCIAS, PRODUCTOS, MATERIAS PRIMAS Y SERVICIOS POR SEDE DE UN USER O COMPANY
export const getAllItemsService = async (idBranch: string, userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const dataLayerResponse = await getAllItemsData(idBranch, userId, userType);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ACTUALIZAR UN REGISTRO EN EL LIBRO DIARIO PERTENECIENTE AL USER O COMPANY
export const putAccountsBookService = async (idAccountsBook: string, body: IAccountsBook, userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const hasPermission = await checkPermissionForAccountsBookBranch(idAccountsBook, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar registro");

        if (userType === 'User') {
            const isBranchAssociatedWithUser: any = await isRegisterTransactionAssociatedWithUser(userId, body.branchId);
            if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualizar el libro diario de esta sede");
        };
        const existingTransaction = await getAccountsBookByBranch(idAccountsBook);
        if (!existingTransaction) throw new ServiceError(404, 'Libro de cuentas no encontrado');
        else await putAccountsBookData(idAccountsBook, body);
        return { code: 200, message: 'Libro de cuentas actualizado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};

//Chequea si el registro del libro diario pertenece al User o Company
const checkPermissionForAccountsBookBranch = async (idAccountsBook: string, userId: string, userType: string): Promise<boolean> => {
    try {
        const rawMaterial = await getAccountsBookByIdData(idAccountsBook);
        if (!rawMaterial) return false;
        if (userType === 'User' && rawMaterial.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ELIMINAR UN REGISTRO DEL LIBRO DIARIO PERTENECIENTE AL USER O COMPANY
export const deleteAccountsBookService = async (idAccountsBook: string, userId: string, userType: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const hasPermission = await checkPermissionForAccountsBookBranch(idAccountsBook, userId, userType);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro en el libro diario");
        await deleteAccountsBookData(idAccountsBook);
        return { code: 200, message: 'Registro eliminado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};