import { Op } from 'sequelize';
import sequelize from '../../db';
import Product from '../../schema/User/product.schema';
import { IProduct } from "../../types/User/products.types";
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA CREAR UN PRODUCTO POR SEDE PARA USER
export const postProductsData = async (body: IProduct, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingProduct = await Product.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingProduct) {
            if (existingProduct.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "El producto ya existe en esta sede");
        }
        const currentDate = new Date().toISOString();
        const initialInventory = body.inventory || 0;
        if (typeRole === 'Superadmin') {
            const newProduct = await Product.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newProduct;
        }
        if (typeRole === 'Administrador') {
            const newProduct = await Product.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newProduct;
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el producto: ${error}`);
    }
};



//DATA PARA CREAR MUCHOS PRODUCTOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyProductsData = async (body: IProduct, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();

    try {
        const existingProduct = await Product.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });

        // Si el producto ya existe, devuelve null
        if (existingProduct) {
            await t.rollback();
            return null;
        }
        
        if (typeRole === 'Superadmin') {
            const newProduct = await Product.create({
                ...body,
                userId: userId,
            }, { transaction: t });      
            await t.commit();
            return newProduct;            
        }
        if (typeRole === 'Administrador') {
            const newProduct = await Product.create({
                ...body,
                userId: userId,
            }, { transaction: t });      
            await t.commit();
            return newProduct;   
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el producto: ${error}`);
    }
};



//DATA PARA OBTENER TODOS LOS PRODUCTOS DE TODOS LOS USER - CEO PLATATORMA
export const getProductsData = async (): Promise<any> => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS PRODUCTOS DE UN USER
export const getProductsByUserIdData = async (userId: string): Promise<any> => {
    try {
        const userProducts = await Product.findAll({
            where: { userId: userId },
        });        
        return userProducts;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS PRODUCTOS DE UNA SEDE DE UN USER
export const getProductsBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const productsFound = await Product.findAll({
            where: { branchId: idBranch }
        });
        return productsFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN PRODUCTO POR ID PERTENECIENTE AL USER
export const getProductByIdData = async (idProduct: string): Promise<any> => {
    try {
        const productFound = await Product.findOne({ where: { id: idProduct } });
        return productFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
export const putProductData = async (idProduct: string, body: IProduct, userId: string): Promise<IProduct | null> => {
    try {
        const existingBranchWithSameName = await Product.findOne({
            where: { userId: userId, nameItem: body.nameItem, id: { [Op.not]: idProduct } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el producto porque ya existe uno con ese mismo nombre");
        const [rowsUpdated] = await Product.update(body, { where: { id: idProduct } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún producto para actualizar");
        const updatedProduct = await Product.findByPk(idProduct);
        if (!updatedProduct) throw new ServiceError(404, "No se encontró ningún producto para actualizar");
        return updatedProduct as unknown as IProduct;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR DE FORMA MASIVA VARIOS PRODUCTOS
export const putUpdateManyProductData = async (body: IProduct, userId: string): Promise<any> => {
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
export const patchProductData = async (idProduct: string, body: Partial<IProduct>, userId: string): Promise<IProduct | null> => {
    try {
        let whereClause: Record<string, any> = { id: idProduct };
        whereClause.userId = userId;
        const existingProduct = await Product.findOne({
            where: whereClause,
        });
        if (!existingProduct) throw new ServiceError(404, "No se encontró el producto");
        const newInventory = existingProduct.inventory - (body?.quantityManualDiscountingInventory ?? 0);
        const [rowsUpdated] = await Product.update({ inventory: newInventory }, {
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



//AUMENTA UNIDADES DEL INVENTARIO DE UN PRODUCTO DEL USER
export const patchAddInventoryProductData = async (idProduct: string, body: Partial<IProduct>, userId: string): Promise<IProduct | null> => {
    try {
        let whereClause: Record<string, any> = { id: idProduct };
        whereClause.userId = userId;
        const existingProduct = await Product.findOne({
            where: whereClause,
        });
        if (!existingProduct) throw new ServiceError(404, "No se encontró el producto");
        const addInventory = existingProduct.inventory + (body?.inventory ?? 0);
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
export const deleteProductData = async (idProduct: string): Promise<void> => {
    try {
        const productFound = await Product.findOne({ where: { id: idProduct } });
        if (!productFound) throw new Error("Producto no encontrado");
        await Product.destroy({ where: { id: idProduct } });
    } catch (error) {
        throw error;
    }
};