import AccountsBook from '../../../../schema/UserPanel/accountsBook.schema';
import Branch from '../../../../schema/UserPanel/branch.schema';
import Product from '../../../../schema/UserPanel/product.schema';
import RawMaterial from '../../../../schema/UserPanel/rawMaterial.schema';
import Assets from '../../../../schema/UserPanel/assets.schema';
import Merchandise from '../../../../schema/UserPanel/merchandise.schema';
import AccountsReceivable from '../../../../schema/UserPanel/accountsReceivable.schema';
import AccountsPayable from '../../../../schema/UserPanel/accountsPayable.schema';

//OBTENER TODOS LOS REGISTROS DE VENTAS DEL PERIODO DEL USUARIO
export const getSalesPerPeriodData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Ingreso', userId: userId },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE VENTAS DEL PERIODO DE UNA SEDE DEL USUARIO
export const getSalesPerPeriodBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Ingreso', userId: userId, branchId: idBranch },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//Chequea si las sedes pertenecen a User, por eso usamos el "for", para iterar cada sede
export const getPermissionSalesBranchData = async (idBranch: string): Promise<any> => {
    try {
        const branch = await Branch.findAll({ 
            where: { userId: idBranch },
        });
        return branch;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL PERIODO DEL USUARIO
export const getExpensesPerPeriodData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Gasto', userId: userId },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL PERIODO DE UNA SEDE DEL USUARIO
export const getExpensesBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Gasto', userId: userId, branchId: idBranch },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO DEL PERIODO
export const getAllTransactionsData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO DEL PERIODO
export const getAllTransactionsBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId, branchId: idBranch},
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DEL USUARIO
export const getAccountsReceivableData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsReceivable.findAll({ 
            where: { userId: userId, stateAccount: 'Activo'},
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR PAGINADOS DEL USUARIO
export const getAccountsReceivablePaginatedData = async (userId: string, page: number, limit: number): Promise<any> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            stateAccount: 'Activo',
        };
        const totalRegistersFound = await AccountsReceivable.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsReceivable.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'ASC']]
        });
        const formattedRegisters = registersPaginated.map(accountsBook => accountsBook.toJSON());
        return {
            registers: formattedRegisters,
            totalRegisters: totalRegistersFound,
            totalPages: totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DE UNA SEDE DEL USUARIO
export const getAccountsReceivableBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsReceivable.findAll({ 
            where: { userId: userId, branchId: idBranch, stateAccount: 'Activo' },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR PAGINADOS DE UNA SEDE DEL USUARIO
export const getAccountsReceivableBranchPaginatedDate = async (userId: string, idBranch: string, page: number, limit: number): Promise<any> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            branchId: idBranch,
            stateAccount: 'Activo',
        };
        const totalRegistersFound = await AccountsReceivable.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsReceivable.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'ASC']]
        });
        const formattedRegisters = registersPaginated.map(accountsBook => accountsBook.toJSON());
        return {
            registers: formattedRegisters,
            totalRegisters: totalRegistersFound,
            totalPages: totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DEL USUARIO
export const getAccountsPayableData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsPayable.findAll({ 
            where: { userId: userId, stateAccount: 'Activo' },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR PAGINADOS DEL USUARIO
export const getAccountsPayablePaginatedData = async (userId: string, page: number, limit: number): Promise<any> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            stateAccount: 'Activo',
        };
        const totalRegistersFound = await AccountsPayable.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsPayable.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'ASC']]
        });
        const formattedRegisters = registersPaginated.map(accountsBook => accountsBook.toJSON());
        return {
            registers: formattedRegisters,
            totalRegisters: totalRegistersFound,
            totalPages: totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DE UNA SEDE DEL USUARIO
export const getAccountsPayableBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsPayable.findAll({ 
            where: { userId: userId, branchId: idBranch, stateAccount: 'Activo' },
            order: [['transactionDate', 'ASC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR PAGINADOS DE UNA SEDE DEL USUARIO
export const getAccountsPayableBranchPaginatedData = async (userId: string, idBranch: string, page: number, limit: number): Promise<any> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            branchId: idBranch,
            stateAccount: 'Activo',
        };
        const totalRegistersFound = await AccountsPayable.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsPayable.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'ASC']]
        });
        const formattedRegisters = registersPaginated.map(accountsBook => accountsBook.toJSON());
        return {
            registers: formattedRegisters,
            totalRegisters: totalRegistersFound,
            totalPages: totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DEL USUARIO
export const getBestClientValueData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DE UNA SEDE DEL USUARIO
export const getBestClientValueBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId, branchId: idBranch },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER LISTA DE CLIENTE FRECUENTE DEL USUARIO
export const getBestClientQuantityData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER LISTA DE CLIENTE FRECUENTE POR SEDE DEL USUARIO
export const getBestClientQuantityBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId, branchId: idBranch },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE MAQUINAS DEL USUARIO
export const getAssetsInventoryData = async (userId: string): Promise<any> => {
    try {
        const transactions = await Assets.findAll({ 
            where: { userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE MAQUINAS POR SEDE DEL USUARIO
export const getAssetsInventoryByBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await Assets.findAll({ 
            where: { userId: userId, branchId: idBranch },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE MERCANCIA DEL USUARIO
export const getMerchandisesInventoryData = async (userId: string): Promise<any> => {
    try {
        const transactions = await Merchandise.findAll({ 
            where: { userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE MERCANCIA POR SEDE DEL USUARIO
export const getMerchandisesInventoryByBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await Merchandise.findAll({ 
            where: { userId: userId, branchId: idBranch },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE PRODUCTOS DEL USUARIO
export const getProductsInventoryData = async (userId: string): Promise<any> => {
    try {
        const transactions = await Product.findAll({ 
            where: { userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE PRODUCTOS POR SEDE DEL USUARIO
export const getProductsInventoryByBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await Product.findAll({ 
            where: { userId: userId, branchId: idBranch },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS DEL USUARIO
export const getRawMaterialsInventoryData = async (userId: string): Promise<any> => {
    try {
        const transactions = await RawMaterial.findAll({ 
            where: { userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS POR SEDE DEL USUARIO
export const getRawMaterialsInventoryByBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const transactions = await RawMaterial.findAll({ 
            where: { userId: userId, branchId: idBranch },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};