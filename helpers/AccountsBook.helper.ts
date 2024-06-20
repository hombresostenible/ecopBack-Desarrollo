import {
    getAccountsBookByBranchData,
    getAccountsBookByIdData,
} from "../data/User/accountsBook.data";
import { ServiceError } from "../types/Responses/responses.types";

//CHEQUEA SI LOS REGISTROS PERTENECEN A LA SEDE DE USER
export const checkPermissionForBranchAccountsBook = async (idBranch: string, userId: string): Promise<boolean> => {
    try {
        console.log('Hola 3')
        const accountsBooks = await getAccountsBookByBranchData(idBranch);
        if (!accountsBooks) return false;
        for (const machinery of accountsBooks) {
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



//CHEQUEA SI EL REGISTRO PERTENECEN AL USER
export const checkPermissionForAccountsBook = async (idAssets: string, userId: string): Promise<boolean> => {
    try {
        const accountsBook = await getAccountsBookByIdData(idAssets);
        if (!accountsBook) return false;
        if (accountsBook.userId !== userId) return false; 
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};