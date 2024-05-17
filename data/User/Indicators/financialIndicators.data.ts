import AccountsBook from '../../../schema/User/accountsBook.schema';
import Branch from '../../../schema/User/branch.schema';
import Product from '../../../schema/User/product.schema';
import RawMaterial from '../../../schema/User/rawMaterial.schema';
import Assets from '../../../schema/User/assets.schema';
import Merchandise from '../../../schema/User/merchandise.schema';
import AccountsReceivable from '../../../schema/User/accountsReceivable.schema';
import AccountsPayable from '../../../schema/User/accountsPayable.schema';

//DATA PARA OBTENER TODOS LOS REGISTROS DE IngresoS DEL USUARIO
export const getSalesPerPeriodData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Ingreso', userId: userId },
            order: [['transactionDate', 'DESC']], // Ordenar por fecha de forma descendente
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};

//DATA PARA OBTENER TODOS LOS REGISTROS DE IngresoS DE UNA SEDE DEL USUARIO
export const getSalesPerPeriodBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Ingreso', branchId: idBranch, userId: userId },
            order: [['transactionDate', 'DESC']],
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
            where: { id: idBranch },
        });
        return branch;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE GASTOS DE UNA SEDE DEL USUARIO
export const getExpensesPerPeriodData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Gasto', userId: userId },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE GASTOS DE UNA SEDE DEL USUARIO
export const getExpensesBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { transactionType: 'Gasto', branchId: idBranch, userId: userId },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE GASTOS E INGRESOS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO
export const getAllTransactionsData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { userId: userId },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE GASTOS E INGRESOS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO
export const getAllTransactionsBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { branchId: idBranch, userId: userId },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DEL USUARIO
export const getAccountsReceivableData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsReceivable.findAll({ 
            where: { userId: userId, stateAccount: 'Activo'},
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DE UNA SEDE DEL USUARIO
export const getAccountsReceivableBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsReceivable.findAll({ 
            where: { branchId: idBranch, userId: userId, stateAccount: 'Activo' },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DEL USUARIO
export const getAccountsPayableData = async (userId: string): Promise<any> => {
    try {
        const transactions = await AccountsPayable.findAll({ 
            where: { userId: userId, stateAccount: 'Activo' },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DE UNA SEDE DEL USUARIO
export const getAccountsPayableBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsPayable.findAll({ 
            where: { branchId: idBranch, userId: userId, stateAccount: 'Activo' },
            order: [['transactionDate', 'DESC']],
        });
        return transactions;
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
export const getBestClientValueBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { branchId: idBranch, userId: userId },
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
export const getBestClientQuantityBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await AccountsBook.findAll({ 
            where: { branchId: idBranch, userId: userId },
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
export const getProductsInventoryByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await Product.findAll({ 
            where: { branchId: idBranch, userId: userId },
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
export const getRawMaterialsInventoryByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await RawMaterial.findAll({ 
            where: { branchId: idBranch, userId: userId },
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
export const getAssetsInventoryByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await Assets.findAll({ 
            where: { branchId: idBranch, userId: userId },
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
export const getMerchandisesInventoryByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const transactions = await Merchandise.findAll({ 
            where: { branchId: idBranch, userId: userId },
        });
        return transactions;
    } catch (error) {
        throw error;
    }
};