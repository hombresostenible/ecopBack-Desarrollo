import {
    //VENTAS DEL PERIODO
    getSalesPerPeriodData,
    getSalesPerPeriodBranchData,
    getPermissionSalesBranchData,

    //GASTOS DEL PERIODO
    getExpensesPerPeriodData,
    getExpensesBranchData,

    //TODAS LAS TRANSACCIONES
    getAllTransactionsData,
    getAllTransactionsBranchData,

    //CUENTAS POR COBRAR
    getAccountsReceivableData,
    getAccountsReceivablePaginatedData,
    getAccountsReceivableBranchData,
    getAccountsReceivableBranchPaginatedDate,

    //CUENTAS POR PAGAR
    getAccountsPayableData,
    getAccountsPayablePaginatedData,
    getAccountsPayableBranchData,
    getAccountsPayableBranchPaginatedData,

    //MEJOR CLIENTE POR VALOR
    getBestClientValueData,
    getBestClientValueBranchData,

    //MEJOR CLIENTE POR CANTIDAD
    getBestClientQuantityData,
    getBestClientQuantityBranchData,

    //INVENTARIO DE ACIVOS
    getAssetsInventoryData,
    getAssetsInventoryByBranchData,

    //INVENTARIO DE MERCANCIA
    getMerchandisesInventoryData,
    getMerchandisesInventoryByBranchData,

    //INVENTARIO DE PRODUCTO
    getProductsInventoryData,
    getProductsInventoryByBranchData,

    //INVENTARIO DE MATERIAS PRIMAS
    getRawMaterialsInventoryData,
    getRawMaterialsInventoryByBranchData,
} from '../../../data/User/Indicators/financialIndicators.data';
import { ServiceError, IServiceLayerResponseFinancialIndicators, IServiceLayerResponseFinancialIndicatorsPaginated } from '../../../types/Responses/responses.types';
import { IProduct } from '../../../types/User/products.types';
import { IRawMaterial } from '../../../types/User/rawMaterial.types';
import { IAccountsBook } from '../../../types/User/accountsBook.types';
import { IAssets } from '../../../types/User/assets.types';
import { IMerchandise } from '../../../types/User/merchandise.types';

//OBTENER TODOS LOS REGISTROS DE VENTAS DEL PERIODO DEL USUARIO
export const getSalesPerPeriodService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getSalesPerPeriodData(userId);
        if (!transactionsFound) throw new ServiceError(403, "No hay ventas registradas del usuario");
        const salesResult = transactionsFound.map((sales: IAccountsBook) => ({
            id: sales.id,
            branchId: sales.branchId,
            transactionDate: sales.transactionDate,
            itemsSold: sales.itemsSold,           
            totalValue: sales.totalValue,
        }));
        return { code: 200, result: salesResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE VENTAS DEL PERIODO DE UNA SEDE DEL USUARIO
export const getSalesPerPeriodBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const transactionsFound = await getSalesPerPeriodBranchData(userId, idBranch);
        if (!transactionsFound) throw new ServiceError(403, "No hay ventas del usuario en esta sede");
        const salesResult = transactionsFound.map((sales: IAccountsBook) => ({
            id: sales.id,
            branchId: sales.branchId,
            transactionDate: sales.transactionDate,
            itemsSold: sales.itemsSold,
            totalValue: sales.totalValue,
        }));
        return { code: 200, result: salesResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//Chequea si las sedes pertenecen a User, por eso usamos el "for", para iterar cada sede
const checkPermissionForBranch = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const transactions = await getPermissionSalesBranchData(idBranch);
        if (!transactions) return false;        
        for (const transaction of transactions) {
            if (transaction.userId !== userId) return false;
        }
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
}



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL PERIODO DEL USUARIO
export const getExpensesPerPeriodService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getExpensesPerPeriodData(userId);
        if (!transactionsFound) throw new ServiceError(403, "No hay gastos del usuario");
        const salesResult = transactionsFound.map((expenses: IAccountsBook) => ({
            id: expenses.id,
            branchId: expenses.branchId,
            transactionDate: expenses.transactionDate,
            otherExpenses: expenses.otherExpenses,
            // nameItem: expenses.nameItem,
            // unitValue: expenses.unitValue,
            // quantity: expenses.quantity,            
            totalValue: expenses.totalValue,
        }));
        return { code: 200, result: salesResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL PERIODO DE UNA SEDE DEL USUARIO
export const getExpensesPerPeriodBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const transactionsFound = await getExpensesBranchData(userId, idBranch);
        if (!transactionsFound) throw new ServiceError(403, "No hay gastos del usuario en esta sede");
        const salesResult = transactionsFound.map((expenses: IAccountsBook) => ({
            id: expenses.id,
            branchId: expenses.branchId,
            transactionDate: expenses.transactionDate,
            otherExpenses: expenses.otherExpenses,
            // nameItem: expenses.nameItem,
            // unitValue: expenses.unitValue,
            // quantity: expenses.quantity,            
            totalValue: expenses.totalValue,
        }));
        return { code: 200, result: salesResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO DEL PERIODO
export const getAllTransactionsService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getAllTransactionsData(userId);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de AccountsBook");
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO DEL PERIODO
export const getAllTransactionsBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const transactionsFound = await getAllTransactionsBranchData(userId, idBranch);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de AccountsBook para esta sede");
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DEL USUARIO
export const getAccountsReceivableService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getAccountsReceivableData(userId);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de cuentas por cobrar en del usuario");
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR PAGINADOS DEL USUARIO
export const getAccountsReceivablePaginatedService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseFinancialIndicatorsPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsReceivablePaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DE UNA SEDE DEL USUARIO
export const getAccountsReceivableBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const transactionsFound = await getAccountsReceivableBranchData(userId, idBranch);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de cuentas por cobrar de esta sede");        
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR PAGINADOS DE UNA SEDE DEL USUARIO
export const getAccountsReceivableBranchPaginatedService = async (userId: string, idBranch: string, page: number, limit: number): Promise<IServiceLayerResponseFinancialIndicatorsPaginated> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsReceivableBranchPaginatedDate(userId, idBranch, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DEL USUARIO
export const getAccountsPayableService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getAccountsPayableData(userId);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de cuentas por pagar del usuario");
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR PAGINADOS DEL USUARIO
export const getAccountsPayablePaginatedService = async (userId: string, page: number, limit: number): Promise<IServiceLayerResponseFinancialIndicatorsPaginated> => {
    try {
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsPayablePaginatedData(userId, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DE UNA SEDE DEL USUARIO
export const getAccountsPayableBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const transactionsFound = await getAccountsPayableBranchData(userId, idBranch);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de cuentas por pagar de esta sede");
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR PAGINADOS DE UNA SEDE DEL USUARIO
export const getAccountsPayableBranchPaginatedService = async (userId: string, idBranch: string, page: number, limit: number): Promise<IServiceLayerResponseFinancialIndicatorsPaginated> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para ver las transacciones de esta sede");
        const { registers, totalRegisters, totalPages, currentPage } = await getAccountsPayableBranchPaginatedData(userId, idBranch, page, limit);
        return { code: 200, result: registers, totalRegisters, totalPages, currentPage };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DEL USUARIO
export const getBestClientValueService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactions = await getBestClientValueData(userId);
        if (!transactions || transactions.length === 0) throw new ServiceError(404, "No hay lista de los mejores clientes por valor del usuario");

        const salesTransactions = transactions.filter((transaction: { transactionType: string; }) => transaction.transactionType === 'Ingreso');
        const clientCountArray = salesTransactions.map((transaction: any) => ({
            id: transaction.id,
            branchId: transaction.branchId,
            transactionDate: transaction.transactionDate,
            transactionCounterpartId: transaction.transactionCounterpartId,
            totalValue: transaction.totalValue,
        }));
        return { code: 200, result: clientCountArray };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//CONTROLLER PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DE UNA SEDE DEL USUARIO
export const getBestClientValueBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener los mejores clientes por valor de esta sede");
        const transactions = await getBestClientValueBranchData(userId, idBranch);
        const salesTransactions = transactions.filter((transaction: { transactionType: string; }) => transaction.transactionType === 'Ingreso');
        const clientCountArray = salesTransactions.map((transaction: any) => ({
            id: transaction.id,
            branchId: transaction.branchId,
            transactionDate: transaction.transactionDate,
            transactionCounterpartId: transaction.transactionCounterpartId,
            totalValue: transaction.totalValue,
        }));
        return { code: 200, result: clientCountArray };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER LISTA DE CLIENTE FRECUENTE DEL USUARIO
export const getBestClientQuantityService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactions = await getBestClientQuantityData(userId);
        if (!transactions || transactions.length === 0) throw new ServiceError(404, "No hay lista para cliente frecuente del usuario");
        const salesTransactions = transactions.filter((transaction: { transactionType: string; }) => transaction.transactionType === 'Ingreso');        
        const clientCountArray = salesTransactions.map((transaction: any) => ({
            id: transaction.id,
            branchId: transaction.branchId,
            transactionDate: transaction.transactionDate,
            transactionCounterpartId: transaction.transactionCounterpartId,
            totalValue: transaction.totalValue,
        }));
        return { code: 200, result: clientCountArray };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER LISTA DE CLIENTE FRECUENTE POR SEDE DEL USUARIO
export const getBestClientQuantityBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No hay lista para cliente frecuente por sede del usuario");
        const transactions = await getBestClientQuantityBranchData(userId, idBranch);
        if (!transactions || transactions.length === 0) throw new ServiceError(404, "No hay lista para cliente frecuente de esta sede del usuario");
        const salesTransactions = transactions.filter((transaction: { transactionType: string; }) => transaction.transactionType === 'Ingreso');
        const clientCountArray = salesTransactions.map((transaction: any) => ({
            id: transaction.id,
            branchId: transaction.branchId,
            transactionDate: transaction.transactionDate,
            transactionCounterpartId: transaction.transactionCounterpartId,
            totalValue: transaction.totalValue,
        }));
        return { code: 200, result: clientCountArray };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO PARA CALCULAR EL TICKET PROMEDIO
export const getAverageTicketTicketService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getSalesPerPeriodData(userId);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de AccountsBook para AverageTicket del usuario");
        return { code: 200, result: transactionsFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO PARA CALCULAR EL TICKET PROMEDIO POR SEDE
export const getAverageTicketTicketBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const transactionsFound = await getSalesPerPeriodBranchData(userId, idBranch);
        if (!transactionsFound) throw new ServiceError(403, "No se pudieron obtener registros de AccountsBook para AverageTicket por sede del usuario");
        const transactionsResult = transactionsFound.map((transaction: IAccountsBook) => ({
            id: transaction.id,
            branchId: transaction.branchId,
            transactionType: transaction.transactionType,
            transactionDate: transaction.transactionDate,
            totalValue: transaction.totalValue,
        }));
        return { code: 200, result: transactionsResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE MAQUINAS DEL USUARIO
export const getAssetsInventoryService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const rawMaterialsFound = await getAssetsInventoryData(userId);
        if (!rawMaterialsFound) throw new ServiceError(403, "No hay máquinas para calcular el inventario del usuario");
        const inventoryResult = rawMaterialsFound.map((asset: IAssets) => ({
            id: asset.id,
            branchId: asset.branchId,
            nameItem: asset.nameItem,
            conditionAssets: asset.conditionAssets,
            stateAssets: asset.stateAssets,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE MAQUINAS POR SEDE DEL USUARIO
export const getaAssetsInventoryBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener las máquinas por sede del usuario");
        const rawMaterialsFound = await getAssetsInventoryByBranchData(userId, idBranch);
        if (!rawMaterialsFound) throw new ServiceError(403, "No hay maquinas en esta sede para calcular el inventario del usuario");
        const inventoryResult = rawMaterialsFound.map((asset: IAssets) => ({
            id: asset.id,
            branchId: asset.branchId,
            nameItem: asset.nameItem,
            conditionAssets: asset.conditionAssets,
            stateAssets: asset.stateAssets,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE MERCANCIA DEL USUARIO
export const getMerchandisesInventoryService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const merchandisesFound = await getMerchandisesInventoryData(userId);
        if (!merchandisesFound) throw new ServiceError(403, "No hay mercancía para calcular el inventario del usuario");
        const inventoryResult = merchandisesFound.map((merchandise: IMerchandise) => ({
            id: merchandise.id,
            branchId: merchandise.branchId,
            nameItem: merchandise.nameItem,
            packaged: merchandise.packaged,
            primaryPackageType: merchandise.primaryPackageType,
            returnablePackaging: merchandise.returnablePackaging,
            inventory: merchandise.inventory,
            inventoryChanges: merchandise.inventoryChanges,            
            salesCount: merchandise.salesCount,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE MERCANCIA POR SEDE DEL USUARIO
export const getaMerchandisesInventoryBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener las mercancías por sede del usuario");
        const merchandisesFound = await getMerchandisesInventoryByBranchData(userId, idBranch);
        if (!merchandisesFound) throw new ServiceError(403, "No hay mercancías en esta sede para calcular el inventario del usuario");
        const inventoryResult = merchandisesFound.map((merchandise: IMerchandise) => ({
            id: merchandise.id,
            branchId: merchandise.branchId,
            nameItem: merchandise.nameItem,
            inventory: merchandise.inventory,            
            salesCount: merchandise.salesCount,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE PRODUCTOS DEL USUARIO
export const getProductsInventoryService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const productsFound = await getProductsInventoryData(userId);
        if (!productsFound) throw new ServiceError(403, "No hay productos para calcular el inventario del usuario");
        const inventoryResult = productsFound.map((product: IProduct) => ({
            id: product.id,
            branchId: product.branchId,
            nameItem: product.nameItem,
            packaged: product.packaged,
            primaryPackageType: product.primaryPackageType,
            returnablePackaging: product.returnablePackaging,
            productAccesory: product.productAccesory,
            inventory: product.inventory,
            inventoryChanges: product.inventoryChanges,            
            salesCount: product.salesCount,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE PRODUCTOS POR SEDE DEL USUARIO
export const getProductsInventoryBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener los productos por sede del usuario");
        const productsFound = await getProductsInventoryByBranchData(userId, idBranch);
        if (!productsFound) throw new ServiceError(403, "No hay productos en esta sede para calcular el inventario del usuario");
        const inventoryResult = productsFound.map((product: IProduct) => ({
            id: product.id,
            branchId: product.branchId,
            nameItem: product.nameItem,
            packaged: product.packaged,
            primaryPackageType: product.primaryPackageType,
            returnablePackaging: product.returnablePackaging,
            productAccesory: product.productAccesory,
            inventory: product.inventory,
            inventoryChanges: product.inventoryChanges,            
            salesCount: product.salesCount,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS DEL USUARIO
export const getRawMaterialsInventoryService = async (userId: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const rawMaterialsFound = await getRawMaterialsInventoryData(userId);
        if (!rawMaterialsFound) throw new ServiceError(403, "No hay materias primas para calcular el inventario del usuario");
        const inventoryResult = rawMaterialsFound.map((rawMaterial: IRawMaterial) => ({
            id: rawMaterial.id,
            branchId: rawMaterial.branchId,
            nameItem: rawMaterial.nameItem,
            packaged: rawMaterial.packaged,
            primaryPackageType: rawMaterial.primaryPackageType,
            returnablePackaging: rawMaterial.returnablePackaging,
            inventory: rawMaterial.inventory,
            inventoryChanges: rawMaterial.inventoryChanges,            
            salesCount: rawMaterial.salesCount,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS POR SEDE DEL USUARIO
export const getRawMaterialsInventoryBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseFinancialIndicators> => {
    try {
        const hasPermission = await checkPermissionForBranch(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para obtener las materias primas por sede del usuario");
        const rawMaterialsFound = await getRawMaterialsInventoryByBranchData(userId, idBranch);
        if (!rawMaterialsFound) throw new ServiceError(403, "No hay materias primas en esta sede para calcular el inventario del usuario");
        const inventoryResult = rawMaterialsFound.map((rawMaterial: IRawMaterial) => ({
            id: rawMaterial.id,
            branchId: rawMaterial.branchId,
            nameItem: rawMaterial.nameItem,
            packaged: rawMaterial.packaged,
            primaryPackageType: rawMaterial.primaryPackageType,
            returnablePackaging: rawMaterial.returnablePackaging,
            inventory: rawMaterial.inventory,
            inventoryChanges: rawMaterial.inventoryChanges,            
            salesCount: rawMaterial.salesCount,
        }));
        return { code: 200, result: inventoryResult };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};