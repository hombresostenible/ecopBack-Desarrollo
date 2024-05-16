import { QueryTypes } from 'sequelize';
import sequelize from '../../db';
import AccountsBook from '../../schema/User/accountsBook.schema';
import AccountsPayable from '../../schema/User/accountsPayable.schema';
import AccountsReceivable from '../../schema/User/accountsReceivable.schema';
import Assets from "../../schema/User/assets.schema";
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

//DATA PARA CREAR EL REGISTRO EN EL LIBRO DIARIO
export const postAccountsBookData = async (body: IAccountsBook, userId: string, userType: string): Promise<IAccountsBook> => {
    try {
        //PRIMERO SE GUARDA LA TRANSACCION EN ACCOUNTSBOOK
        // Establecer transactionApproved basado en meanPayment
        if (body.meanPayment === 'Efectivo') {
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
        if (body.incomeCategory === 'Mercancía') incomeFromCashSaleMerchandises(body);
        
        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE PRODUCT 
        if (body.incomeCategory === 'Producto') incomeFromCashSaleProduct(body)     
            
        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE RAWMATERIAL 
        if (body.incomeCategory === 'Materia Prima') incomeFromCashSaleRawMaterials(body);
            
        //ACTUALIZAMOS EL INVENTARIO EN LA TABLA DE SERVICE 
        if (body.incomeCategory === 'Servicio') incomeFromCashSaleServices(body);


        
        //^INGRESOS POR VENTAS A CREDITO - CUENTAS POR COBRAR
        // SE CREA LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
        if (body.pay === 'No' && body.transactionType === 'Ingreso' && body.creditCash === "Crédito") incomeAccountsReceivable(body, newTransaction.id, userId)


        //^PAGOS A CUENTAS POR COBRAR
        // SE HACE EL PAGO A LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
        if (body.pay === 'Si' && body.transactionType === 'Ingreso' && body.creditCash === "Contado") paymentsAccountsReceivable(body, userId);


        //^GASTOS A CREDITO - CUENTAS POR PAGAR
        // SE CREA LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA USER
        if (body.pay === 'No' && body.transactionType === 'Gasto' && body.creditCash === "Crédito") expensesAccountsPayable(body, newTransaction.id, userId);


        //^PAGOS A CUENTAS POR PAGAR
        // SE HACE EL PAGO A LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA USER
        if (body.pay === 'Si' && body.transactionType === 'Gasto' && body.creditCash === "Contado") paymentsAccountsPayable(body, userId);
        
        
        //^CREAR DATOS EN LA TABLA DE SUSTAINABILITY PARA INDICADORES DE SOSTENIBILIDAD
        // PASAR LOS DATOS DEL LIBRO DIARIO A LA TABLA DE SOSTENIBILIDAD
        const isSustainabilityExpense = body.typeExpenses !== undefined && [ 'Acueducto', 'Energía', 'Gas', 'Internet', 'Celular/Plan de datos' ].includes(body.typeExpenses);
        if (isSustainabilityExpense) {
            const sustainabilityData = {
                branchId: body.branchId,
                registrationDate: body.registrationDate,
                transactionDate: body.transactionDate,
                typeExpenses: body.typeExpenses,
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



//DATA PARA OBTENER LOS REGISTROS DE TODAS LAS SEDES DE UN USER
export const getAccountsBooksData = async (userId: string): Promise<any> => {
    try {
        const userProducts = await AccountsBook.findAll({
            where: { userId: userId },
        });        
        return userProducts;
    } catch (error) {
        throw error;
    };
};



//Chequea si la sede pertenece a User
export const getAccountsBookByBranch = async (idAccountsBook: string): Promise<any> => {
    try {
        const accountsBookFound = await AccountsBook.findOne({
            where: { id: idAccountsBook }
        });
        return accountsBookFound;
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



//DATA PARA BUSCAR UN ITEM DE MERCHANDISE, ASSETS, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
export const getItemBarCodeData = async (idBranch: string, barCode: string, userId: string, userType: string): Promise<any> => {
    try {
        let itemFound;
        const merchandiseFound = await Merchandise.findOne({
            where: { branchId: idBranch, barCode: barCode, userId: userId }
        });
        if (merchandiseFound) itemFound = merchandiseFound;
        
        const productFound = await Product.findOne({
            where: { branchId: idBranch, barCode: barCode, userId: userId }
        });
        if (productFound) itemFound = productFound;
        
        const rawMaterialFound = await RawMaterial.findOne({
            where: { branchId: idBranch, barCode: barCode, userId: userId }
        });
        if (rawMaterialFound) itemFound = rawMaterialFound;
        
        const assetsFound = await Assets.findOne({
            where: { branchId: idBranch, barCode: barCode, userId: userId }
        });
        if (assetsFound) itemFound = assetsFound;
        return itemFound;
    } catch (error) {
        throw error;
    };
};



export const getNameItemData2 = async (nameItem: string, userId: string): Promise<any> => {
    try {
        const itemFound = await sequelize.query(`
            SELECT * FROM merchandises WHERE nameItem = :nameItem AND userId = :userId
            UNION ALL
            SELECT * FROM products WHERE nameItem = :nameItem AND userId = :userId
            UNION ALL
            SELECT * FROM rawMaterials WHERE nameItem = :nameItem AND userId = :userId
            UNION ALL
            SELECT * FROM assets WHERE nameItem = :nameItem AND userId = :userId
        `, {
            replacements: { nameItem, userId },
            type: QueryTypes.SELECT
        });

        return itemFound;
    } catch (error) {
        throw error;
    };
};

export const getNameItemData = async (nameItem: string, userId: string): Promise<any> => {
    try {
        const itemFound = await sequelize.query(`
            SELECT 
                id, branchId, barCode, nameItem, inventory, 
                'Merchandise' as type, -- Agregamos una columna para identificar el tipo de objeto
                null as inventoryIncrease, null as periodicityAutomaticIncrease, 
                null as automaticInventoryIncrease, null as packaged, null as primaryPackageType, 
                null as returnablePackaging, null as unitMeasure, null as quantityPerPackage, 
                null as individualPackaging, null as secondaryPackageType, null as inventoryChanges, 
                null as purchasePriceBeforeTax, null as sellingPrice, null as IVA, null as expirationDate, 
                null as reasonManualDiscountingInventory, null as quantityManualDiscountingInventory, null as salesCount, userId
            FROM merchandises 
            WHERE nameItem LIKE :nameItemPattern AND userId = :userId
            UNION ALL            
            SELECT
                id, branchId, barCode, nameItem, inventory, 
                'Product' as type, -- Agregamos una columna para identificar el tipo de objeto
                inventoryIncrease, periodicityAutomaticIncrease, automaticInventoryIncrease, 
                packaged, primaryPackageType, returnablePackaging, unitMeasure, quantityPerPackage, 
                null as individualPackaging, null as secondaryPackageType, inventoryChanges, 
                null as purchasePriceBeforeTax, sellingPrice, IVA, expirationDate, null as reasonManualDiscountingInventory, 
                null as quantityManualDiscountingInventory, salesCount, userId
            FROM products 
            WHERE nameItem LIKE :nameItemPattern AND userId = :userId
            UNION ALL
            SELECT
                id, branchId, barCode, nameItem, inventory, 
                'RawMaterial' as type, -- Agregamos una columna para identificar el tipo de objeto
                inventoryIncrease, periodicityAutomaticIncrease, automaticInventoryIncrease, 
                packaged, primaryPackageType, returnablePackaging, unitMeasure, quantityPerPackage, 
                individualPackaging, secondaryPackageType, inventoryChanges, 
                purchasePriceBeforeTax, sellingPrice, IVA, expirationDate, reasonManualDiscountingInventory, 
                quantityManualDiscountingInventory, salesCount, userId
            FROM rawMaterials 
            WHERE nameItem LIKE :nameItemPattern AND userId = :userId
            UNION ALL            
            SELECT 
                id, branchId, barCode, nameItem, inventory, 
                'Assets' as type, -- Agregamos una columna para identificar el tipo de objeto
                null as inventoryIncrease, null as periodicityAutomaticIncrease, 
                null as automaticInventoryIncrease, null as packaged, null as primaryPackageType, 
                null as returnablePackaging, null as unitMeasure, null as quantityPerPackage, 
                null as individualPackaging, null as secondaryPackageType, null as inventoryChanges, 
                purchasePriceBeforeTax, sellingPrice, IVA, null as expirationDate, null as reasonManualDiscountingInventory, 
                null as quantityManualDiscountingInventory, null as salesCount, userId
            FROM assets 
            WHERE nameItem LIKE :nameItemPattern AND userId = :userId
        `, {
            replacements: { nameItemPattern: `%${nameItem}%`, userId },
            type: QueryTypes.SELECT
        });
        return itemFound;
    } catch (error) {
        throw error;
    };
};



//DATA PARA OBTENER TODOS LOS ACTIVOS, MERCANCIAS, PRODUCTOS, MATERIAS PRIMAS Y SERVICIOS POR SEDE DE UN USER
export const getAllItemsData = async (idBranch: string, userId: string, userType: string): Promise<any> => {
    try {
        let whereClause: any = { branchId: idBranch };
        if (userType === 'User') {
            whereClause.userId = userId;
        } else throw new Error('Tipo de usuario no válido');

        const [merchandises, products, rawMaterials, services, assets] = await Promise.all([
            Merchandise.findAll({ where: whereClause }),
            Product.findAll({ where: whereClause }),
            RawMaterial.findAll({ where: whereClause }),
            Service.findAll({ where: whereClause }),
            Assets.findAll({ where: whereClause })
        ]);

        const foundSomething = merchandises.length > 0 || products.length > 0 || rawMaterials.length > 0 || services.length > 0 || assets.length > 0;
        if (foundSomething) {
            return { merchandises, products, rawMaterials, services, assets }; // Aquí se retornan los registros de las 5 tablas
        } else throw new Error('No se encontraron registros para los criterios especificados.');
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

//Función para revertir la operación en el ingresorio según el tipo de transacción anterior
export const reverseInventoryOperation = async (existingTransaction: IAccountsBook): Promise<void> => {
    try {
        const product = await Product.findOne({
            where: { id: existingTransaction.itemId, branchId: existingTransaction.branchId },
        });
        if (!product) throw new ServiceError(404, 'Producto no encontrado');
        if (existingTransaction.quantity !== undefined) {
            if (existingTransaction.transactionType === 'Ingreso') {
                product.inventory += existingTransaction.quantity;
                product.salesCount -= existingTransaction.quantity;
            } else if (existingTransaction.transactionType === 'Gasto') product.inventory -= existingTransaction.quantity;
        } else throw new ServiceError(404, 'La cantidad no está definida en la transacción existente');
        await product.save();
    } catch (error) {
        throw error;
    };
};


//Función para aplicar la operación correcta en el ingresorio según el nuevo tipo de transacción
export const applyInventoryOperation = async (transaction: IAccountsBook): Promise<void> => {
    try {
        const product = await Product.findOne({
            where: { id: transaction.itemId, branchId: transaction.branchId },
        });
        if (!product) throw new ServiceError(404, 'Producto no encontrado');
        if (transaction.quantity !== undefined) {
            if (transaction.transactionType === 'Ingreso') {
                product.inventory -= transaction.quantity;
                product.salesCount += transaction.quantity;
            } else if (transaction.transactionType === 'Gasto') product.inventory += transaction.quantity;
        } else throw new ServiceError(404, 'La cantidad no está definida en la transacción');
        await product.save();
    } catch (error) {
        throw error;
    };
};


//Función para aplicar la operación correcta en el producto si se modifica este en el registro
export const updateProduct = async (productId: string, newProductId: string, branchId: string): Promise<void> => {
    try {
        const product = await Product.findOne({ where: { id: productId, branchId } });
        if (!product) throw new ServiceError(404, 'Producto no encontrado');
        product.id = newProductId;
        await product.save();
    } catch (error) {
        throw error;
    };
};



//ELIMINA UN REGISTRO DEL LIBRO DIARIO PERTENECIENTE AL USER
export const deleteAccountsBookData = async (idAccountsBook: string): Promise<void> => {
    try {
        const transactionFound = await AccountsBook.findOne({ where: { id: idAccountsBook } });
        if (!transactionFound) throw new Error('Registro del libro diario no encontrado');        
        if (transactionFound.incomeCategory === 'Mercancía') {
            const merchandiseFound = await Merchandise.findOne({
                where: { id: transactionFound?.itemId, nameItem: transactionFound?.nameItem, branchId: transactionFound?.branchId },
            });
            if (!merchandiseFound) throw new ServiceError(400, "No se encontró la mercancía de este registro");
            if (merchandiseFound) {
                if (transactionFound?.transactionType === 'Ingreso') {
                    merchandiseFound.inventory += transactionFound?.quantity;
                    merchandiseFound.salesCount -= transactionFound?.quantity;
                } else if (transactionFound?.transactionType === 'Gasto') merchandiseFound.inventory -= transactionFound?.quantity;
                await merchandiseFound.save();
            }
        } else if (transactionFound.incomeCategory === 'Producto') {
            const productFound = await Product.findOne({
                where: { id: transactionFound?.itemId, nameItem: transactionFound?.nameItem, branchId: transactionFound?.branchId },
            });
            if (!productFound) throw new ServiceError(400, "No se encontró el producto de este registro");
            if (productFound) {
                if (transactionFound?.transactionType === 'Ingreso') {
                    productFound.inventory += transactionFound?.quantity;
                    productFound.salesCount -= transactionFound?.quantity;
                } else if (transactionFound?.transactionType === 'Gasto') productFound.inventory -= transactionFound?.quantity;
                await productFound.save();
            }
        } else if (transactionFound.incomeCategory === 'Materia Prima') {
            const rawMaterialFound = await RawMaterial.findOne({
                where: { id: transactionFound?.itemId, nameItem: transactionFound?.nameItem, branchId: transactionFound?.branchId },
            });
            if (!rawMaterialFound) throw new ServiceError(400, "No se encontró la materia prima de este registro");
            if (rawMaterialFound) {
                if (transactionFound?.transactionType === 'Ingreso') {
                    rawMaterialFound.inventory += transactionFound?.quantity;
                    rawMaterialFound.salesCount -= transactionFound?.quantity;
                } else if (transactionFound?.transactionType === 'Gasto') rawMaterialFound.inventory -= transactionFound?.quantity;
                await rawMaterialFound.save();
            }
        } else if (transactionFound.incomeCategory === 'Servicio') {
            const serviceFound = await Service.findOne({
                where: { id: transactionFound?.itemId, nameItem: transactionFound?.nameItem, branchId: transactionFound?.branchId },
            });
            if (!serviceFound) throw new ServiceError(400, "No se encontró el servicio de este registro");
            if (serviceFound) {
                if (transactionFound?.transactionType === 'Ingreso') serviceFound.salesCount -= transactionFound?.quantity;
                await serviceFound.save();
            }
        } else await AccountsBook.destroy({ where: { id: idAccountsBook } });

        //ELIMINAMOS EL REGISTRO DE LA TABLA DE "AccountsReceivable"
        const accountReceivableFound = await AccountsReceivable.findOne({ where: { accountsBookId: idAccountsBook } });
        if (!accountReceivableFound) throw new Error('CXC del no encontrada');
        if (accountReceivableFound) await AccountsReceivable.destroy({ where: { accountsBookId: idAccountsBook } });
        
        //ELIMINAMOS EL REGISTRO DE LA TABLA DE "AccountsReceivable"
        const accountPayableFound = await AccountsPayable.findOne({ where: { accountsBookId: idAccountsBook } });
        if (!accountPayableFound) throw new Error('CXP del no encontrada');
        if (accountPayableFound) await AccountsReceivable.destroy({ where: { accountsBookId: idAccountsBook } });
        
        //ELIMINAMOS EL REGISTRO DE LA TABLA DE "Sustainability"
        const sustainabilityFound = await Sustainability.findOne({ where: { accountsBookId: idAccountsBook } });
        if (!sustainabilityFound) throw new Error('Registro de sostenibilidad del no encontrada');
        if (sustainabilityFound) await Sustainability.destroy({ where: { accountsBookId: idAccountsBook } });

        //ELIMINAMOS EL REGISTRO DE LA TABLA DE "AccountsBook"
        await AccountsBook.destroy({ where: { id: idAccountsBook } });
    } catch (error) {
        throw error;
    };
};