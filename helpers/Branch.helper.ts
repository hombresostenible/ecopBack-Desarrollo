import { getBranchByIdData } from "../data/UserPanel/02Branch/branch.data";
import Branch from '../schema/UserPanel/branch.schema';
import { ServiceError } from '../types/Responses/responses.types';

//CHEQUEA SI LA BRANCH PERTENECE A UN USER
export const checkPermissionForBranch = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const branch = await getBranchByIdData(idBranch);
        if (!branch) return false;
        if (branch.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};

//VALIDA SI EL ROL ES SUPERADMIN Y LA SEDE PERTENECE AL MISMO USER
export const isBranchAssociatedUserSuperadminRole = async ( userId: string, typeRole: string): Promise<boolean> => {
    try {
        if (typeRole === 'Superadmin') {
            const branch = await Branch.findOne({
                where: { userId: userId },
            });
            return !!branch;
        };
        
        // Si el tipo de rol no es 'Superadmin', devolvemos false
        return false;
    } catch (error) {
        throw error;
    };
};



//VALIDA SI EL ROL ES SUPERADMIN O ADMINISTRADOR Y LA SEDE PERTENECE AL MISMO USER
export const isBranchAssociatedWithUserRole = async (userId: string, typeRole: string, branchId: string): Promise<boolean> => {
    try {
        if (typeRole === 'Superadmin') {
            const branch = await Branch.findOne({
                where: { userId: userId },
            });
            return !!branch;
        };
        if (typeRole === 'Administrador') {
            const branch = await Branch.findOne({
                where: { userId: userId, branchId: branchId },
            });
            return !!branch;
        };
        // Si el tipo de rol no es ni 'Superadmin' ni 'Administrador', devolvemos false
        return false;
    } catch (error) {
        throw error;
    };
};



//VALIDA SI LA SEDE DONDE SE CREARÁ EL REGISTRO, PERTENECE AL MISMO USER
export const isRegisterTransactionAssociatedWithUser = async (userId: string, branchId: string): Promise<boolean> => {
    try {
        const branch = await Branch.findOne({
            where: { branchId: branchId, userId: userId },
        });
        return !!branch;
    } catch (error) {
        throw error;
    }
};