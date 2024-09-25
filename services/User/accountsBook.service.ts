import {  
    postAccountsBookData,
    getAccountsBooksPaginatedData,
    getAccountsBookByBranchData,
    getIncomesApprovedData,
    getIncomesApprovedByBranchData,
    getAccountsBooksExpesesData,
    getAccountsBooksExpesesByBranchData,
    getAccountsBookByIdData,
    getUnapprovedRecordsData,
    getUnapprovedRecordsByBranchData,
    patchApproveRecordData,
    putAccountsBookData,
    deleteAccountsBookData,
} from "../../data/User/accountsBook.data";
import { IAccountsBook } from "../../types/User/accountsBook.types";
import { IServiceLayerResponseAccountsBook, IServiceLayerResponseAccountsBookPaginated } from '../../types/Responses/responses.types';
import { ServiceError } from '../../types/Responses/responses.types';

//CREAR UN REGISTRO CONTABLE DEL USER
export const postAccountsBookService = async (userId: string, body: IAccountsBook): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const dataLayerResponse = await postAccountsBookData(userId, body);
        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar en el libro diario");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS CONTABLES PAGINADOS APROBADOS Y NO APROBADOS DEL USER
export const getAccountsBooksService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsBooksPaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//OBTENER TODOS LOS REGISTROS CONTABLES PAGINADOS APROBADOS Y NO APROBADOS POR SEDE DEL USER
export const getAccountsBookByBranchService = async (userId: string, idBranch: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsBookByBranchData(userId, idBranch, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS PAGINADOS APROBADOS DEL USER
export const getIncomesApprovedService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getIncomesApprovedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS PAGINADOS APROBADOS POR SEDE DEL USER
export const getIncomesApprovedByBranchService = async (userId: string, idBranch: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getIncomesApprovedByBranchData(userId, idBranch, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE GASTOS PAGINADOS DEL USER
export const getAccountsBooksExpesesService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsBooksExpesesData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE GASTOS PAGINADOS APROBADOS POR SEDE DEL USER
export const getAccountsBooksExpesesByBranchService = async (userId: string, idBranch: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsBooksExpesesByBranchData(userId, idBranch, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE TRANSACCIONES NO APROBADAS PAGINADAS DEL USER
export const getUnapprovedRecordsService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getUnapprovedRecordsData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE TRANSACCIONES NO APROBADAS PAGINADAS POR SEDE DEL USER
export const getUnapprovedRecordsByBranchService = async (userId: string, idBranch: string, page: number, limit: number): Promise<IServiceLayerResponseAccountsBookPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getUnapprovedRecordsByBranchData(userId, idBranch, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//OBTENER UN REGISTRO CONTABLE POR ID DEL USER
export const getAccountsBookByIdService = async (idAccountsBook: string, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const transactionsFound = await getAccountsBookByIdData(idAccountsBook, userId);
        if (!transactionsFound) return { code: 404, message: 'Libro diario no encontrado' };
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//APROBAR UN REGISTRO DE INGRESO DEL USER
export const patchApproveRecordService = async (userId: string, idAccountsBook: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        const updateAsset = await patchApproveRecordData(userId, idAccountsBook);
        if (!updateAsset) throw new ServiceError(404, "Registro pendiente de aprobar no encontrado");
        return { code: 200, message: "Registro aprobado exitosamente", result: updateAsset };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//ACTUALIZAR UN REGISTRO CONTABLE DEL USER
export const putAccountsBookService = async (idAccountsBook: string, body: IAccountsBook, userId: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
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



//ELIMINAR UN REGISTRO CONTABLE DEL USER
export const deleteAccountsBookService = async (userId: string, idAccountsBook: string): Promise<IServiceLayerResponseAccountsBook> => {
    try {
        await deleteAccountsBookData(userId, idAccountsBook);
        return { code: 200, message: 'Registro eliminado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};