import { Op } from 'sequelize';
import sequelize from '../../db';
import AccountsBook from '../../schema/UserPanel/accountsBook.schema';
import AccountsPayable from '../../schema/UserPanel/accountsPayable.schema';
import AccountsReceivable from '../../schema/UserPanel/accountsReceivable.schema';
import Assets from "../../schema/UserPanel/assets.schema";
import Merchandise from "../../schema/UserPanel/merchandise.schema";
import Product from "../../schema/UserPanel/product.schema";
import RawMaterial from "../../schema/UserPanel/rawMaterial.schema";
import Service from "../../schema/UserPanel/service.schema";
import Sustainability from '../../schema/UserPanel/sustainability.schema';
//INGRESOS POR VENTAS EN EFECTIVO
import { incomeFromCashSaleAssets } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleAssets';
import { incomeFromCashSaleMerchandises } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleMerchandises';
import { incomeFromCashSaleProduct } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleProduct';
import { incomeFromCashSaleRawMaterials } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleRawMaterials';
import { incomeFromCashSaleServices } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleServices';
//GASTOS POR COMPRAS EN EFECTIVO
import { expenseFromCashBuyAssets } from '../../helpers/AccountsBook/ExpenseFromCashSale/expenseFromCashBuyAssets';
import { expenseFromCashBuyMerchandises } from '../../helpers/AccountsBook/ExpenseFromCashSale/expenseFromCashBuyMerchandises';
import { expenseFromCashBuyRawMaterials } from '../../helpers/AccountsBook/ExpenseFromCashSale/expenseFromCashBuyRawMaterials';
//INGRESOS POR VENTAS A CREDITO - CUENTAS POR COBRAR
import { incomeCXCAccountsReceivable } from '../../helpers/AccountsBook/01IncomeAccountsReceivable/incomeCXCAccountsReceivable';
//PAGOS A CUENTAS POR COBRAR
import { paymentsCXCAccountsReceivable } from '../../helpers/AccountsBook/01IncomeAccountsReceivable/paymentsCXCAccountsReceivable';
//OTROS INGRESOS POR PRESTAMOS
import { otherIncomesCXPAccountsPayable } from '../../helpers/AccountsBook/02OtherIncomesAccountsPayable/otherIncomesCXPAccountsPayable';
//GASTOS A CREDITO - CUENTAS POR PAGAR
import { expensesCXPAccountsPayable } from '../../helpers/AccountsBook/03ExpensesAccountsPayable/expensesCXPAccountsPayable';
//PAGOS A CUENTAS POR PAGAR
import { paymentsCXPAccountsPayable } from '../../helpers/AccountsBook/03ExpensesAccountsPayable/paymentsCXPAccountsPayable';
import { IAccountsBook } from "../../types/UserPanel/accountsBook.types";
import { ServiceError } from "../../types/Responses/responses.types";

//CREAR UN REGISTRO CONTABLE DEL USER
export const postAccountsBookData = async (userId: string, body: IAccountsBook): Promise<IAccountsBook> => {
    try {
        // Establecer transactionApproved basado en meanPayment
        if ((body.transactionType === 'Ingreso' || body.transactionType === 'Gasto') && body.meanPayment === 'Efectivo' && body.creditCash === 'Contado') {
            body.transactionApproved = true;
        } else body.transactionApproved = false;
        // Guardar la transacción en AccountsBook
        const newAccountsBook = new AccountsBook({
            ...body,
            userId: userId,
        });
        await newAccountsBook.save();
        //^ Actualizar inventario según los artículos vendidos
        if (body.itemsSold) {
            for (const item of body.itemsSold) {
                switch (item.type) {
                    case 'Asset':
                        await incomeFromCashSaleAssets(item, body.branchId, body.transactionType);
                        break;
                    case 'Merchandise':
                        await incomeFromCashSaleMerchandises(item, body.branchId, body.transactionType);
                        break;
                    case 'Product':
                        await incomeFromCashSaleProduct(item, body.branchId, body.transactionType);
                        break;
                    case 'RawMaterial':
                        await incomeFromCashSaleRawMaterials(item, body.branchId, body.transactionType);
                        break;
                    case 'Service':
                        await incomeFromCashSaleServices(item, body.branchId, body.transactionType);
                        break;
                    default:
                        throw new ServiceError(400, `Categoría de ingreso no reconocida: ${item.type}`);
                }
            }
        }

        //^ Actualizar inventario según los artículos comprados
        if (body.itemsBuy) {
            for (const item of body.itemsBuy) {
                switch (item.type) {
                    case 'Asset':
                        await expenseFromCashBuyAssets(item, body.branchId, body.transactionType);
                        break;
                    case 'Merchandise':
                        await expenseFromCashBuyMerchandises(item, body.branchId, body.transactionType);
                        break;
                    case 'RawMaterial':
                        await expenseFromCashBuyRawMaterials(item, body.branchId, body.transactionType);
                        break;
                    default:
                        throw new ServiceError(400, `Categoría de gasto no reconocida: ${item.type}`);
                }
            }
        }

        //^ Crea una CXC en AccountsReceivable por ventas a crédito
        if (body.pay === 'No' && body.transactionType === 'Ingreso' && body.creditCash === "Credito") await incomeCXCAccountsReceivable(body, newAccountsBook.id, userId);

        //^ Crea el pago a una CXC
        if (body.pay === 'Si' && body.transactionType === 'Ingreso' && body.creditCash === "Contado") await paymentsCXCAccountsReceivable(body, userId);
        
        //^ Crea una CXP en AccountsPayable por 'Otros ingresos' (Préstamos)
        if (body.pay === 'No' && body.transactionType === 'Ingreso' && body.creditCash === "Contado") await otherIncomesCXPAccountsPayable(body, newAccountsBook.id, userId);

        //^ Crea una CXP por compras de artículos o pago de otro tipo de gasto (pagos a servicios) a crédito
        if (body.pay === 'No' && body.transactionType === 'Gasto' && body.creditCash === "Credito") await expensesCXPAccountsPayable(body, newAccountsBook.id, userId);
        
        //^ Crea el pago a la CXP
        if (body.pay === 'Si' && body.transactionType === 'Gasto' && body.creditCash === "Contado") await paymentsCXPAccountsPayable(body, userId);

        //^ Crear datos en la tabla de Sustainability para indicadores de sostenibilidad
        const isSustainabilityExpense = body.otherExpenses !== undefined && ['Acueducto', 'Energia', 'Gas', 'Internet', 'Celular/Plan de datos'].includes(body.otherExpenses);
        if (isSustainabilityExpense) {
            const sustainabilityData = {
                branchId: body.branchId,
                registrationDate: body.registrationDate,
                transactionDate: body.transactionDate,
                otherExpenses: body.otherExpenses,
                totalValue: body.totalValue,
                accountsBookId: newAccountsBook.id,
                userId: userId
            };
            const newSustainabilityTransaction = new Sustainability(sustainabilityData);
            await newSustainabilityTransaction.save();
        }
        return newAccountsBook;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS CONTABLES PAGINADOS APROBADOS
export const getAccountsBooksPaginatedData = async (userId: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            transactionApproved: true,
            [Op.or]: [
                {
                    transactionType: 'Ingreso',
                    creditCash: { [Op.ne]: 'Credito' }
                },
                {
                    transactionType: 'Gasto',
                    creditCash: { [Op.ne]: 'Credito' }
                }
            ]
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
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



//OBTENER TODOS LOS REGISTROS POR SEDE CONTABLES PAGINADOS APROBADOS
export const getAccountsBookByBranchData = async (userId: string, idBranch: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            branchId: idBranch,
            transactionApproved: true,
            [Op.or]: [
                {
                    transactionType: 'Ingreso',
                    creditCash: { [Op.ne]: 'Credito' }
                },
                {
                    transactionType: 'Gasto',
                    creditCash: { [Op.ne]: 'Credito' }
                }
            ]
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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
    };
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS PAGINADOS APROBADOS DEL USER
export const getIncomesApprovedData = async (userId: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId, 
            transactionType: 'Ingreso', 
            transactionApproved: true,
            [Op.or]: [
                {
                    transactionType: 'Ingreso',
                    creditCash: { [Op.ne]: 'Credito' }
                },
            ]
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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
    };
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS PAGINADOS APROBADOS POR SEDE DEL USER
export const getIncomesApprovedByBranchData = async (userId: string, idBranch: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            branchId: idBranch,
            transactionType: 'Ingreso', 
            transactionApproved: true,
            [Op.or]: [
                {
                    transactionType: 'Ingreso',
                    creditCash: { [Op.ne]: 'Credito' }
                },
            ]
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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



//OBTENER TODOS LOS REGISTROS DE GASTOS PAGINADOS DEL USER
export const getAccountsBooksExpesesData = async (userId: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId, 
            transactionType: 'Gasto', 
            transactionApproved: true,
            [Op.or]: [
                {
                    transactionType: 'Gasto',
                    creditCash: { [Op.ne]: 'Credito' }
                },
            ]
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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
    };
};



//OBTENER TODOS LOS REGISTROS DE GASTOS PAGINADOS APROBADOS POR SEDE DEL USER
export const getAccountsBooksExpesesByBranchData = async (userId: string, idBranch: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            branchId: idBranch,
            transactionType: 'Gasto', 
            transactionApproved: true,
            [Op.or]: [
                {
                    transactionType: 'Gasto',
                    creditCash: { [Op.ne]: 'Credito' }
                },
            ]
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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



//OBTENER TODOS LOS REGISTROS DE TRANSACCIONES NO APROBADAS PAGINADAS DEL USER
export const getUnapprovedRecordsData = async (userId: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            transactionApproved: false,
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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
    };
};



//OBTENER TODOS LOS REGISTROS DE TRANSACCIONES NO APROBADAS PAGINADAS POR SEDE DEL USER
export const getUnapprovedRecordsByBranchData = async (userId: string, idBranch: string, page: number, limit: number): Promise<{ registers: IAccountsBook[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = {
            userId: userId,
            branchId: idBranch,
            transactionApproved: false,
        };
        const totalRegistersFound = await AccountsBook.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await AccountsBook.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['transactionDate', 'DESC']]
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



//OBTENER UN REGISTRO CONTABLE POR ID DEL USER
export const getAccountsBookByIdData = async (userId:string, idAccountsBook: string): Promise<any> => {
    try {
        const transactionFound = await AccountsBook.findOne({ where: { id: idAccountsBook, userId: userId } });
        return transactionFound;
    } catch (error) {
        throw error;
    };
};



//APROBAR UN REGISTRO DE INGRESO DEL USER
export const patchApproveRecordData = async (userId: string, idAccountsBook: string): Promise<IAccountsBook | null> => {
    try {
        let whereClause: Record<string, any> = { userId: userId, id: idAccountsBook };
        whereClause.userId = userId;
        const existingIncomesNotApproved = await AccountsBook.findOne({
            where: whereClause,
        });
        if (!existingIncomesNotApproved) throw new ServiceError(404, "No se encontró el registro para aprobar");
        const transactionApproved = existingIncomesNotApproved.transactionApproved = true;
        const [rowsUpdated] = await AccountsBook.update({ transactionApproved: transactionApproved }, {
            where: whereClause,
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún registro para aprobar para actualizar");
        const updatedRawMaterial = await AccountsBook.findByPk(idAccountsBook);
        if (!updatedRawMaterial) throw new ServiceError(404, "No se encontró ningún registro para aprobar para actualizar");
        return updatedRawMaterial;
    } catch (error) {
        throw error;
    }
};



//ACTUALIZAR UN REGISTRO CONTABLE DEL USER
export const putAccountsBookData = async (body: IAccountsBook, idAccountsBook: string): Promise<IAccountsBook | null> => {
    try {
        const [rowsUpdated] = await AccountsBook.update(body, { where: { id: idAccountsBook } });
        if (rowsUpdated === 0) return null;
        const updatedTransaction = await AccountsBook.findByPk(idAccountsBook);
        if (!updatedTransaction) return null;
        return updatedTransaction;
    } catch (error) {
        throw error;
    };
};



//ELIMINAR UN REGISTRO CONTABLE DEL USER
export const deleteAccountsBookData = async (userId: string, idAccountsBook: string): Promise<void> => {
    const transaction = await sequelize.transaction();
    try {
        // ENCONTRAMOS LA TRANSACCION
        const transactionFound = await AccountsBook.findOne({ where: { userId: userId, id: idAccountsBook }, transaction });
        console.log('transactionFound: ', transactionFound?.dataValues)
        if (!transactionFound) throw new Error('Registro del libro diario no encontrado');       
        // PROCEDEMOS A REVERTIR LOS REGISTROS DE ASSETS, MERCHANDISES, PRODUCTS, RAWMATERIALS Y SERVICES, PARA REAJUSTAR INVENTARIOS
        const items = transactionFound.transactionType === 'Gasto' ? transactionFound.itemsBuy : transactionFound.itemsSold;
        if (items && items.length > 0) {
            for (const item of items) {
                switch (item.type) {
                    case 'Asset': {
                        await processAsset(transactionFound, item, transaction);
                        break;
                    }
                    case 'Merchandise': {
                        await processMerchandise(transactionFound, item, transaction);
                        break;
                    }
                    case 'Product': {
                        await processProduct(transactionFound, item, transaction);
                        break;
                    }
                    case 'RawMaterial': {
                        await processRawMaterial(transactionFound, item, transaction);
                        break;
                    }
                    case 'Service': {
                        await processService(transactionFound, item, transaction);
                        break;
                    }
                    default:
                        throw new ServiceError(400, `Categoría de ingreso desconocida: ${item.type}`);
                }
            }
        }
        //HAY QUE RELACIONAR LA ELIMINACION DE LAS CXC Y CXP
        await deleteRelatedRecords(idAccountsBook, transaction);
        await AccountsBook.destroy({ where: { id: idAccountsBook }, transaction });
        await transaction.commit();
    } catch (error) {
        console.log('Error: ', error)
        await transaction.rollback();
        throw error;
    }
};

// REVERSION DEL AUMENTO O DESCUENTO EN EL INVENTARIO DE ASSETS
const processAsset = async (transactionFound: any, itemSold: any, transaction: any) => {
    const itemFound = await Assets.findOne({
        where: { id: itemSold.id, nameItem: itemSold.nameItem, branchId: transactionFound.branchId },
        transaction
    });
    if (!itemFound) throw new ServiceError(400, "No se encontró la mercancía de este registro");
    if (transactionFound.transactionType === 'Ingreso') {
        itemFound.inventory += itemSold.quantity;
    } else if (transactionFound.transactionType === 'Gasto') {
        itemFound.inventory -= itemSold.quantity;
    }
    await itemFound.save({ transaction });
};


// REVERSION DEL AUMENTO O DESCUENTO EN EL INVENTARIO DE MERCHANDISES
const processMerchandise = async (transactionFound: any, itemSold: any, transaction: any) => {
    const itemFound = await Merchandise.findOne({
        where: { id: itemSold.id, nameItem: itemSold.nameItem, branchId: transactionFound.branchId },
        transaction
    });
    if (!itemFound) throw new ServiceError(400, "No se encontró la mercancía de este registro");
    if (transactionFound.transactionType === 'Ingreso') {
        itemFound.inventory += itemSold.quantity;
        itemFound.salesCount -= itemSold.quantity;
    } else if (transactionFound.transactionType === 'Gasto') {
        itemFound.inventory -= itemSold.quantity;
    }
    await itemFound.save({ transaction });
};

// REVERSION DEL AUMENTO O DESCUENTO EN EL INVENTARIO DE PRODUCTS
const processProduct = async (transactionFound: any, itemSold: any, transaction: any) => {
    const itemFound = await Product.findOne({
        where: { id: itemSold.id, nameItem: itemSold.nameItem, branchId: transactionFound.branchId },
        transaction
    });
    if (!itemFound) throw new ServiceError(400, "No se encontró el producto de este registro");
    if (transactionFound.transactionType === 'Ingreso') {
        itemFound.inventory += itemSold.quantity;
        itemFound.salesCount -= itemSold.quantity;
    } else if (transactionFound.transactionType === 'Gasto') {
        itemFound.inventory -= itemSold.quantity;
    }
    await itemFound.save({ transaction });
};

// REVERSION DEL AUMENTO O DESCUENTO EN EL INVENTARIO DE RAWMATERIALS
const processRawMaterial = async (transactionFound: any, itemSold: any, transaction: any) => {
    const itemFound = await RawMaterial.findOne({
        where: { id: itemSold.id, nameItem: itemSold.nameItem, branchId: transactionFound.branchId },
        transaction
    });
    if (!itemFound) throw new ServiceError(400, "No se encontró la materia prima de este registro");
    if (transactionFound.transactionType === 'Ingreso') {
        itemFound.inventory += itemSold.quantity;
        itemFound.salesCount -= itemSold.quantity;
    } else if (transactionFound.transactionType === 'Gasto') {
        itemFound.inventory -= itemSold.quantity;
    }
    await itemFound.save({ transaction });
};

// REVERSION DEL AUMENTO O DESCUENTO EN EL INVENTARIO DE SERVICES
const processService = async (transactionFound: any, itemSold: any, transaction: any) => {
    const itemFound = await Service.findOne({
        where: { id: itemSold.id, nameItem: itemSold.nameItem, branchId: transactionFound.branchId },
        transaction
    });
    if (!itemFound) throw new ServiceError(400, "No se encontró el servicio de este registro");
    if (transactionFound.transactionType === 'Ingreso') {
        itemFound.salesCount -= itemSold.quantity;
    }
    await itemFound.save({ transaction });
};

// REVERSION DE REGISTROS EN CXC CXP Y SUSTAINABILITY
const deleteRelatedRecords = async (idAccountsBook: string, transaction: any) => {
    await Promise.all([
        AccountsReceivable.destroy({ where: { id: idAccountsBook }, transaction }),
        AccountsPayable.destroy({ where: { id: idAccountsBook }, transaction }),
        Sustainability.destroy({ where: { id: idAccountsBook }, transaction })
    ]);
};