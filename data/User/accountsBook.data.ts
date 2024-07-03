import sequelize from '../../db';
import AccountsBook from '../../schema/User/accountsBook.schema';
import AccountsPayable from '../../schema/User/accountsPayable.schema';
import AccountsReceivable from '../../schema/User/accountsReceivable.schema';
import Merchandise from "../../schema/User/merchandise.schema";
import Product from "../../schema/User/product.schema";
import RawMaterial from "../../schema/User/rawMaterial.schema";
import Service from "../../schema/User/service.schema";
import Sustainability from '../../schema/User/sustainability.schema';
//INGRESOS POR VENTAS EN EFECTIVO
import { incomeFromCashSaleAssets } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleAssets';
import { incomeFromCashSaleMerchandises } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleMerchandises';
import { incomeFromCashSaleProduct } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleProduct';
import { incomeFromCashSaleRawMaterials } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleRawMaterials';
import { incomeFromCashSaleServices } from '../../helpers/AccountsBook/IncomeFromCashSale/incomeFromCashSaleServices';
//INGRESOS POR VENTAS A CREDITO - CUENTAS POR COBRAR
import { incomeAccountsReceivable } from '../../helpers/AccountsBook/AccountsReceivable/incomeAccountsReceivable';
//PAGOS A CUENTAS POR COBRAR
import { paymentsAccountsReceivable } from '../../helpers/AccountsBook/AccountsReceivable/paymentsAccountsReceivable';
//GASTOS A CREDITO - CUENTAS POR PAGAR
import { expensesAccountsPayable } from '../../helpers/AccountsBook/ExpensesAccountsPayable/expensesAccountsPayable';
//PAGOS A CUENTAS POR PAGAR
import { paymentsAccountsPayable } from '../../helpers/AccountsBook/ExpensesAccountsPayable/paymentsAccountsPayable';
import { IAccountsBook } from "../../types/User/accountsBook.types";
import { ServiceError } from "../../types/Responses/responses.types";

//CREAR UN REGISTRO CONTABLE DEL USER
export const postAccountsBookData = async (body: IAccountsBook, userId: string): Promise<IAccountsBook> => {
    try {
        //PRIMERO SE GUARDA LA TRANSACCION EN ACCOUNTSBOOK
        // Establecer transactionApproved basado en meanPayment
        if (body.transactionType === 'Ingreso' && body.meanPayment === 'Efectivo' && body.creditCash === 'Contado') {
            body.transactionApproved = true;
        } else body.transactionApproved = false;
        //PRIMERO SE GUARDA LA TRANSACCION EN ACCOUNTSBOOK
        const newTransaction = new AccountsBook({
            ...body,
            userId: userId,
        });
        await newTransaction.save();
        


        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE ASSETS 
        if (body.incomeCategory === 'Activo') incomeFromCashSaleAssets(body);

        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE MERCHANDISES 
        if (body.incomeCategory === 'Mercancia') incomeFromCashSaleMerchandises(body);
        
        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE PRODUCT 
        if (body.incomeCategory === 'Producto') incomeFromCashSaleProduct(body)     
            
        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE RAWMATERIAL 
        if (body.incomeCategory === 'Materia Prima') incomeFromCashSaleRawMaterials(body);
            
        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE SERVICE 
        if (body.incomeCategory === 'Servicio') incomeFromCashSaleServices(body);

        //^INGRESOS POR VENTAS A CREDITO - CUENTAS POR COBRAR
        // SE CREA LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
        if (body.pay === 'No' && body.transactionType === 'Ingreso' && body.creditCash === "Credito") incomeAccountsReceivable(body, newTransaction.id, userId)

        //^PAGOS A CUENTAS POR COBRAR
        // SE HACE EL PAGO A LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
        if (body.pay === 'Si' && body.transactionType === 'Ingreso' && body.creditCash === "Contado") paymentsAccountsReceivable(body, userId);

        //^GASTOS A CREDITO - CUENTAS POR PAGAR
        // SE CREA LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA USER
        if (body.pay === 'No' && body.transactionType === 'Gasto' && body.creditCash === "Credito") expensesAccountsPayable(body, newTransaction.id, userId);

        //^PAGOS A CUENTAS POR PAGAR
        // SE HACE EL PAGO A LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA USER
        if (body.pay === 'Si' && body.transactionType === 'Gasto' && body.creditCash === "Contado") paymentsAccountsPayable(body, userId);
        
        //^CREAR DATOS EN LA TABLA DE SUSTAINABILITY PARA INDICADORES DE SOSTENIBILIDAD
        // PASAR LOS DATOS DEL LIBRO DIARIO A LA TABLA DE SOSTENIBILIDAD
        const isSustainabilityExpense = body.expenseCategory !== undefined && [ 'Acueducto', 'Energia', 'Gas', 'Internet', 'Celular/Plan de datos' ].includes(body.expenseCategory);
        if (isSustainabilityExpense) {
            const sustainabilityData = {
                branchId: body.branchId,
                registrationDate: body.registrationDate,
                transactionDate: body.transactionDate,
                expenseCategory: body.expenseCategory,
                periodPayService: body.periodPayService,
                totalValue: body.totalValue,
                accountsBookId: newTransaction.id,
                userId: userId
                // ... (otras propiedades que se necesiten)
            };
            const newSustainabilityTransaction = new Sustainability(sustainabilityData);
            await newSustainabilityTransaction.save();
        };
        return newTransaction;
    } catch (error) {
        throw error;
    };
};



//OBTENER TODOS LOS REGISTROS CONTABLES DEL USER
export const getAccountsBooksData = async (userId: string): Promise<any> => {
    try {
        const allAccountsBook = await AccountsBook.findAll({
            where: { userId: userId },
        });        
        return allAccountsBook;
    } catch (error) {
        throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
export const getIncomesApprovedData = async (userId: string): Promise<any> => {
    try {
        const allAccountsBook = await AccountsBook.findAll({
            where: { 
                userId: userId, 
                transactionType: 'Ingreso', 
                transactionApproved: true 
            },
            order: [
                ['transactionDate', 'DESC'] // Aquí se especifica el campo y el orden
            ]
        });
        return allAccountsBook;
    } catch (error) {
        throw error;
    };
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS POR SEDE DEL USER
export const getIncomesApprovedByBranchData = async (idBranch: string): Promise<any> => {
    try {
        const AccountsBooksIncomesFound = await AccountsBook.findAll({
            where: {
                branchId: idBranch,
                transactionType: 'Ingreso', 
                transactionApproved: true 
            },
            order: [
                ['transactionDate', 'DESC'] // Aquí se especifica el campo y el orden
            ]
        });
        return AccountsBooksIncomesFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE INGRESOS NO APROBADOS DEL USER
export const getIncomesNotApprovedData = async (userId: string): Promise<any> => {
    try {
        const allAccountsBook = await AccountsBook.findAll({
            where: {
                userId: userId,
                transactionType: 'Ingreso',
                transactionApproved: false
            },
            order: [
                ['transactionDate', 'DESC'] // Aquí se especifica el campo y el orden
            ]
        });        
        return allAccountsBook;
    } catch (error) {
        throw error;
    };
};

export const getIncomesNotApprovedByBranchData = async (idBranch: string): Promise<any> => {
    try {
        const AccountsBooksIncomesFound = await AccountsBook.findAll({
            where: {
                branchId: idBranch,
                transactionType: 'Ingreso', 
                transactionApproved: false 
            },
            order: [
                ['transactionDate', 'DESC'] // Aquí se especifica el campo y el orden
            ]
        });
        return AccountsBooksIncomesFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL USER
export const getAccountsBooksExpesesData = async (userId: string): Promise<any> => {
    try {
        const allAccountsBook = await AccountsBook.findAll({
            where: { userId: userId, transactionType: 'Gasto' },
        });
        return allAccountsBook;
    } catch (error) {
        throw error;
    };
};



//Chequea si el registro del libro diario pertenece al User
export const getAccountsBookByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const transactionFound = await AccountsBook.findOne({ where: { id: idAccountsBook } });
        return transactionFound;
    } catch (error) {
        throw error;
    };
};



//Chequea si la sede pertenece a User
export const getAccountsBookByBranchData = async (idAccountsBook: string): Promise<any> => {
    try {
        const accountsBookFound = await AccountsBook.findOne({
            where: { id: idAccountsBook }
        });
        return accountsBookFound;
    } catch (error) {
        throw error;
    };
};



//ACTUALIZA UN REGISTRO EN EL LIBRO DIARIO PERTENECIENTE AL USER
export const putAccountsBookData = async (idAccountsBook: string, body: IAccountsBook): Promise<IAccountsBook | null> => {
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



export const patchIncomesNotApprovedData = async (idAssets: string, body: Partial<IAccountsBook>, userId: string): Promise<IAccountsBook | null> => {
    try {
        let whereClause: Record<string, any> = { id: idAssets };
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
        const updatedRawMaterial = await AccountsBook.findByPk(idAssets);
        if (!updatedRawMaterial) throw new ServiceError(404, "No se encontró ningún registro para aprobar para actualizar");
        return updatedRawMaterial;
    } catch (error) {
        throw error;
    }
};


//ELIMINA UN REGISTRO DEL LIBRO DIARIO PERTENECIENTE AL USER
export const deleteAccountsBookData = async (idAccountsBook: string): Promise<void> => {
    const transaction = await sequelize.transaction();
    try {
        const transactionFound = await AccountsBook.findOne({ where: { id: idAccountsBook }, transaction });
        if (!transactionFound) throw new Error('Registro del libro diario no encontrado');

        if (transactionFound.incomeCategory === 'Mercancia') {
            const merchandiseFound = await Merchandise.findOne({
                where: { id: transactionFound.itemId, nameItem: transactionFound.nameItem, branchId: transactionFound.branchId },
                transaction
            });
            if (!merchandiseFound) throw new ServiceError(400, "No se encontró la mercancía de este registro");
            if (transactionFound.transactionType === 'Ingreso') {
                merchandiseFound.inventory += transactionFound.quantity;
                merchandiseFound.salesCount -= transactionFound.quantity;
            } else if (transactionFound.transactionType === 'Gasto') {
                merchandiseFound.inventory -= transactionFound.quantity;
            }
            await merchandiseFound.save({ transaction });
        } else if (transactionFound.incomeCategory === 'Producto') {
            const productFound = await Product.findOne({
                where: { id: transactionFound.itemId, nameItem: transactionFound.nameItem, branchId: transactionFound.branchId },
                transaction
            });
            if (!productFound) throw new ServiceError(400, "No se encontró el producto de este registro");
            if (transactionFound.transactionType === 'Ingreso') {
                productFound.inventory += transactionFound.quantity;
                productFound.salesCount -= transactionFound.quantity;
            } else if (transactionFound.transactionType === 'Gasto') {
                productFound.inventory -= transactionFound.quantity;
            }
            await productFound.save({ transaction });
        } else if (transactionFound.incomeCategory === 'Materia Prima') {
            const rawMaterialFound = await RawMaterial.findOne({
                where: { id: transactionFound.itemId, nameItem: transactionFound.nameItem, branchId: transactionFound.branchId },
                transaction
            });
            if (!rawMaterialFound) throw new ServiceError(400, "No se encontró la materia prima de este registro");
            if (transactionFound.transactionType === 'Ingreso') {
                rawMaterialFound.inventory += transactionFound.quantity;
                rawMaterialFound.salesCount -= transactionFound.quantity;
            } else if (transactionFound.transactionType === 'Gasto') {
                rawMaterialFound.inventory -= transactionFound.quantity;
            }
            await rawMaterialFound.save({ transaction });
        } else if (transactionFound.incomeCategory === 'Servicio') {
            const serviceFound = await Service.findOne({
                where: { id: transactionFound.itemId, nameItem: transactionFound.nameItem, branchId: transactionFound.branchId },
                transaction
            });
            if (!serviceFound) throw new ServiceError(400, "No se encontró el servicio de este registro");
            if (transactionFound.transactionType === 'Ingreso') {
                serviceFound.salesCount -= transactionFound.quantity;
            }
            await serviceFound.save({ transaction });
        }

        // Eliminar registros relacionados
        const accountReceivableFound = await AccountsReceivable.findOne({ where: { accountsBookId: idAccountsBook }, transaction });
        if (accountReceivableFound) await AccountsReceivable.destroy({ where: { accountsBookId: idAccountsBook }, transaction });

        const accountPayableFound = await AccountsPayable.findOne({ where: { accountsBookId: idAccountsBook }, transaction });
        if (accountPayableFound) await AccountsPayable.destroy({ where: { accountsBookId: idAccountsBook }, transaction });

        const sustainabilityFound = await Sustainability.findOne({ where: { accountsBookId: idAccountsBook }, transaction });
        if (sustainabilityFound) await Sustainability.destroy({ where: { accountsBookId: idAccountsBook }, transaction });

        await AccountsBook.destroy({ where: { id: idAccountsBook }, transaction });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error('Error: ', error);
        throw error;
    }
};