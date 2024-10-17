import { Op, Sequelize } from 'sequelize';
import sequelize from '../../db';
import Product from '../../schema/User/product.schema';
import { IProduct } from "../../types/User/products.types";
import { ServiceError } from '../../types/Responses/responses.types';
import { CapitalizeNameItems } from './../../helpers/CapitalizeNameItems/CapitalizeNameItems';

//DATA PARA CREAR UN PRODUCTO POR SEDE PARA USER
export const postProductsData = async (userId: string, typeRole: string, body: IProduct): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        body.nameItem = CapitalizeNameItems(body.nameItem);
        if (body.brandItem) body.brandItem = CapitalizeNameItems(body.brandItem);
        const existingRegister = await Product.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            if (existingRegister.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "El producto ya existe en esta sede");
        }
        const currentDate = new Date().toISOString();
        const initialInventory = body.inventory || 0;
        if (typeRole === 'Superadmin') {
            const newRegister = await Product.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await Product.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el producto: ${error}`);
    }
};



//DATA PARA CREAR MUCHOS PRODUCTOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyProductsData = async (userId: string, typeRole: string, body: IProduct): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        body.nameItem = CapitalizeNameItems(body.nameItem);
        if (body.brandItem) body.brandItem = CapitalizeNameItems(body.brandItem);
        const existingRegister = await Product.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await Product.create({
                ...body,
                userId: userId,
            }, { transaction: t });      
            await t.commit();
            return newRegister;            
        }
        if (typeRole === 'Administrador') {
            const newRegister = await Product.create({
                ...body,
                userId: userId,
            }, { transaction: t });      
            await t.commit();
            return newRegister;   
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el producto: ${error}`);
    }
};



//DATA PARA OBTENER TODOS LOS PRODUCTOS DE UN USER
export const getProductsData = async (userId: string): Promise<any> => {
    try {
        const userProducts = await Product.findAll({
            where: { userId: userId },
            order: [ ['nameItem', 'ASC'] ]
        });
        return userProducts;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS PAGINADOS DE UN USER
export const getProductsPaginatedData = async (userId: string, page: number, limit: number): Promise<{ registers: IProduct[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = { userId: userId };
        const totalRegistersFound = await Product.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await Product.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        });
        const formattedRegisters = registersPaginated.map(register => register.toJSON());
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



//DATA PARA OBTENER TODOS LOS PRODUCTOS DE UNA SEDE DE UN USER
export const getProductsBranchData = async (idBranch: string): Promise<any> => {
    try {
        const productsFound = await Product.findAll({
            where: { branchId: idBranch },
            order: [ ['nameItem', 'ASC'] ]
        });
        return productsFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN PRODUCTO POR ID PERTENECIENTE AL USER
export const getProductByIdData = async (idProduct: string): Promise<any> => {
    try {
        const productFound = await Product.findOne({where: { id: idProduct } });
        return productFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getProductOffData = async (userId: string): Promise<any> => {
    try {
        const productsWithInventoryOff = await Product.findAll({
            where: {
                userId: userId,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return productsWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS PRODUCTOS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getProductsOffByBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const productsWithInventoryOff = await Product.findAll({
            where: {
                userId: userId,
                branchId: idBranch,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return productsWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
export const putProductData = async (userId: string, idProduct: string, body: IProduct): Promise<IProduct | null> => {
    try {
        const existingBranchWithSameName = await Product.findOne({
            where: {
                userId: userId,
                nameItem: body.nameItem,
                id: { [Op.not]: idProduct }
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el producto porque ya existe uno con ese mismo nombre");
        const [rowsUpdated] = await Product.update(body, {
            where: { id: idProduct, userId: userId } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún producto para actualizar");
        const updatedProduct = await Product.findByPk(idProduct);
        if (!updatedProduct) throw new ServiceError(404, "No se encontró ningún producto para actualizar");
        return updatedProduct as unknown as IProduct;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR DE FORMA MASIVA VARIOS PRODUCTOS
export const putUpdateManyProductsData = async (userId: string, body: IProduct): Promise<any> => {
    const t = await sequelize.transaction();

    try {
        const existingBranchWithSameName = await Product.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId, id: { [Op.not]: body.id } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el producto porque ya existe un con ese mismo nombre");
        const [rowsUpdated] = await Product.update(body, { where: { id: body.id } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún producto para actualizar");
        const updatedProduct = await Product.findByPk(body.id);
        if (!updatedProduct) throw new ServiceError(404, "No se encontró ningún producto para actualizar");
        return updatedProduct;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA DAR DE BAJA UN PRODUCTO DEL USER
export const patchProductData = async (idProduct: string, body: Partial<IProduct>): Promise<IProduct | null> => {
    const t = await sequelize.transaction();
    try {
        let whereClause: Record<string, any> = { id: idProduct };
        const existingRegister = await Product.findOne({
            where: whereClause,
            transaction: t,
        });

        if (!existingRegister) throw new ServiceError(404, "No se encontró el producto");
        if (body.inventory !== undefined && body.inventory > existingRegister.inventory) throw new ServiceError(400, "No hay suficiente cantidad de mercancía disponibles para dar de baja");
        
        if (body.inventoryOff !== undefined && body.inventoryOff.length > 0) {
            const IInventoryOffItem = body.inventoryOff[0];                      // Accede al primer elemento de inventoryOff
            const currentDate = new Date();                                     // Obtener la fecha actual
            
            // Actualizar el inventario y agregar un nuevo elemento a inventoryOff
            existingRegister.inventory -= IInventoryOffItem.quantity || 0;    // Restar la cantidad de productos dañados del inventario actual

            existingRegister.inventoryOff = existingRegister.inventoryOff.concat({ 
                date: currentDate, 
                quantity: (IInventoryOffItem.quantity || 0),
                reason: IInventoryOffItem.reason || 'Baja de producto',
                description: IInventoryOffItem.description,
            });
        }

        const [rowsUpdated] = await Product.update({
            inventory: existingRegister.inventory,
            inventoryOff: existingRegister.inventoryOff
        }, {
            where: whereClause,
            transaction: t,
        });

        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún producto para actualizar");
        const updatedProduct = await Product.findByPk(idProduct, {
            transaction: t,
        });

        if (!updatedProduct) throw new ServiceError(404, "No se encontró ningún producto para actualizar");

        await t.commit();
        return updatedProduct;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UN PRODUCTO DEL USER
export const patchAddInventoryProductData = async (userId: string, idProduct: string, body: Partial<IProduct>): Promise<IProduct | null> => {
    try {
        let whereClause: Record<string, any> = { id: idProduct };
        whereClause.userId = userId;
        const existingRegister = await Product.findOne({
            where: whereClause,
        });
        if (!existingRegister) throw new ServiceError(404, "No se encontró el producto");
        const addInventory = existingRegister.inventory + (body?.inventory ?? 0);
        const [rowsUpdated] = await Product.update({ inventory: addInventory }, {
            where: whereClause,
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún producto para actualizar");
        const updatedProduct = await Product.findByPk(idProduct);
        if (!updatedProduct) throw new ServiceError(404, "No se encontró ningún producto para actualizar");
        return updatedProduct;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
export const deleteProductData = async (userId: string, idProduct: string): Promise<void> => {
    try {
        const productFound = await Product.findOne({ where: { id: idProduct } });
        if (!productFound) throw new Error("Producto no encontrado");
        await Product.destroy({ where: { userId: userId, id: idProduct } });
    } catch (error) {
        throw error;
    }
};