import {  
    postAccountsBookData,
    getAccountsBooksData,
    getAccountsBookByIdData,
    getAccountsBookByBranchData,
    putAccountsBookData,
    deleteAccountsBookData,
} from "../../data/User/accountsBook.data";
import { IAccountsBook } from "../../types/User/accountsBook.types";
import { IServiceLayerResponseAccountsBook } from '../../types/Responses/responses.types';
import { ServiceError } from '../../types/Responses/responses.types';

//CREAR UN REGISTRO CONTABLE DEL USER
export const postAccountsBookService = async (body: IAccountsBook, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const dataLayerResponse = await postAccountsBookData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar en el libro diario");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS CONTABLES DEL USER
export const getAccountsBooksService = async (userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const dataLayerResponse = await getAccountsBooksData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CONTROLLER PARA OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID PERTENECIENTE AL USER
export const getAccountsBookByIdService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const transactionsFound = await getAccountsBookByIdData(idBranch);
        if (!transactionsFound) return { code: 404, message: 'Libro diario no encontrado' };
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};




























//CONTROLLER PARA OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID PERTENECIENTE AL USER
export const getAccountsBookByBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        // const hasPermission = await checkPermissionForAccountsBook(idBranch, userId);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este libro diario");
        const transactionsFound = await getAccountsBookByBranchData(idBranch);
        if (!transactionsFound) return { code: 404, message: 'Libro diario no encontrado' };
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ACTUALIZAR UN REGISTRO EN EL LIBRO DIARIO PERTENECIENTE AL USER
export const putAccountsBookService = async (idAccountsBook: string, body: IAccountsBook, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        // const hasPermission = await checkPermissionForAccountsBookBranch(idAccountsBook, userId);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar registro");
        // const isBranchAssociatedWithUser: any = await isRegisterTransactionAssociatedWithUser(userId, body.branchId);
        // if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para actualizar el libro diario de esta sede");
        const existingTransaction = await putAccountsBookData(idAccountsBook, body);
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



//SERVICE PARA ELIMINAR UN REGISTRO DEL LIBRO DIARIO PERTENECIENTE AL USER
export const deleteAccountsBookService = async (idAccountsBook: string, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        // const hasPermission = await checkPermissionForAccountsBookBranch(idAccountsBook, userId);
        // if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro en el libro diario");
        await deleteAccountsBookData(idAccountsBook);
        return { code: 200, message: 'Registro eliminado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};