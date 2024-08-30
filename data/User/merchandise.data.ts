import { Op, Sequelize } from 'sequelize';
import sequelize from '../../db';
import Merchandise from '../../schema/User/merchandise.schema';
import { IMerchandise } from "../../types/User/merchandise.types";
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA CREAR UNA MERCANCIA POR SEDE PARA USER
export const postMerchandiseData = async (body: IMerchandise, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingMerchandise = await Merchandise.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingMerchandise) {
            if (existingMerchandise.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "La mercancía ya existe en esta sede");
        }
        //Inventario por pimera vez
        const currentDate = new Date().toISOString(); // Obtén la fecha actual en formato ISO
        const initialInventory = body.inventory || 0;
        if (typeRole === 'Superadmin') {
            const newMerchandise = await Merchandise.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newMerchandise;
        }
        if (typeRole === 'Administrador') {            
            const newMerchandise = await Merchandise.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newMerchandise;
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA CREAR MUCHAS MERCANCIAS POR SEDE PARA USER DESDE EL EXCEL
export const postManyMerchandiseData = async (body: IMerchandise, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();

    try {
        // Verificar si ls mercancía ya existe en la sede proporcionada
        const existingMerchandise = await Merchandise.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        // Si la mercancía ya existe, devuelve null
        if (existingMerchandise) {
            await t.rollback();
            return null;
        }
        // Si la mercancía no existe, crearlo en la base de datos
        if (typeRole === 'Superadmin') {
            const newMerchandise = await Merchandise.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newMerchandise;
        }
        if (typeRole === 'Administrador') {
            const newMerchandise = await Merchandise.create({
                ...body,
                userId: userId,
            }, { transaction: t });        
            await t.commit();
            return newMerchandise;            
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODA LA MERCANCIA DEL USER
export const getMerchandiseByUserIdData = async (userId: string): Promise<any> => {
    try {
        const userProducts = await Merchandise.findAll({
            where: { userId: userId },
            order: [ ['nameItem', 'ASC'] ]
        });        
        return userProducts;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODA LA MERCANCIA DE UNA SEDE PARA USER
export const getMerchandiseBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const merchandisesFound = await Merchandise.findAll({
            where: { branchId: idBranch },
            order: [ ['nameItem', 'ASC'] ]
        });
        return merchandisesFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UNA MERCANCIA POR ID PERTENECIENTE AL USER
export const getMerchandiseByIdData = async (idMerchandise: string): Promise<any> => {
    try {
        const merchandiseFound = await Merchandise.findOne({ where: { id: idMerchandise } });
        return merchandiseFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODAS LAS MERCANCIAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getMerchandiseOffData = async (userId: string): Promise<any> => {
    try {
        const merchandisesWithInventoryOff = await Merchandise.findAll({
            where: {
                userId: userId,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return merchandisesWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODAS LAS MERCANCIAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getMerchandisesOffByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const merchandisesWithInventoryOff = await Merchandise.findAll({
            where: {
                branchId: idBranch,
                userId: userId,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return merchandisesWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
export const putMerchandiseData = async (idMerchandise: string, body: IMerchandise, userId: string): Promise<IMerchandise | null> => {
    try {
        const existingBranchWithSameName = await Merchandise.findOne({
            where: { userId: userId, nameItem: body.nameItem, id: { [Op.not]: idMerchandise } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la mercancía porque ya existe uno con ese mismo nombre");
        const [rowsUpdated] = await Merchandise.update(body, { where: { id: idMerchandise } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna mercancía para actualizar");
        const updatedMerchandise = await Merchandise.findByPk(idMerchandise);
        if (!updatedMerchandise) throw new ServiceError(404, "No se encontró ninguna mercancía para actualizar");
        return updatedMerchandise;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR DE FORMA MASIVA VARIAS MERCANCIAS
export const putUpdateManyMerchandiseData = async (body: IMerchandise, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingBranchWithSameName = await Merchandise.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId, id: { [Op.not]: body.id } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la mercancía porque ya existe una con ese mismo nombre");
        const [rowsUpdated] = await Merchandise.update(body, { where: { id: body.id } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna mercancía para actualizar");
        const updatedMachinery = await Merchandise.findByPk(body.id);
        if (!updatedMachinery) throw new ServiceError(404, "No se encontró ninguna mercancía para actualizar");
        return updatedMachinery;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA DAR DE BAJA UNA MERCANCIA DEL USER
export const patchMerchandiseData = async (idMerchandise: string, body: Partial<IMerchandise>): Promise<IMerchandise | null> => {
    const t = await sequelize.transaction();
    try {
        let whereClause: Record<string, any> = { id: idMerchandise };
        const existingMerchandise = await Merchandise.findOne({
            where: whereClause,
            transaction: t,
        });

        if (!existingMerchandise) throw new ServiceError(404, "No se encontró el activo");
        if (body.inventory !== undefined && body.inventory > existingMerchandise.inventory) throw new ServiceError(400, "No hay suficiente cantidad de mercancía disponibles para dar de baja");
        
        if (body.inventoryOff !== undefined && body.inventoryOff.length > 0) {
            const IInventoryOffItem = body.inventoryOff[0];                      // Accede al primer elemento de inventoryOff
            const currentDate = new Date();                                     // Obtener la fecha actual
            
            // Actualizar el inventario y agregar un nuevo elemento a inventoryOff
            existingMerchandise.inventory -= IInventoryOffItem.quantity || 0;    // Restar la cantidad de mercacías dañadas del inventario actual

            existingMerchandise.inventoryOff = existingMerchandise.inventoryOff.concat({ 
                date: currentDate, 
                quantity: (IInventoryOffItem.quantity || 0),
                reason: IInventoryOffItem.reason || 'Baja de activo',
                description: IInventoryOffItem.description,
            });
        }

        const [rowsUpdated] = await Merchandise.update({
            inventory: existingMerchandise.inventory,
            inventoryOff: existingMerchandise.inventoryOff
        }, {
            where: whereClause,
            transaction: t,
        });

        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna mercancía para actualizar");
        const updatedMerchandise = await Merchandise.findByPk(idMerchandise, {
            transaction: t,
        });

        if (!updatedMerchandise) throw new ServiceError(404, "No se encontró ninguna mercancía para actualizar");

        await t.commit();
        return updatedMerchandise;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UNA MERCANCIA DEL USER
export const patchAddInventoryMerchandiseData = async (idMerchandise: string, body: Partial<IMerchandise>, userId: string): Promise<IMerchandise | null> => {
    try {
        let whereClause: Record<string, any> = { id: idMerchandise };
        whereClause.userId = userId;
        const existingMerchandise = await Merchandise.findOne({
            where: whereClause,
        });
        if (!existingMerchandise) throw new ServiceError(404, "No se encontró la mercancía");
        const addInventory = existingMerchandise.inventory + (body?.inventory ?? 0);
        const [rowsUpdated] = await Merchandise.update({ inventory: addInventory }, {
            where: whereClause,
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna mercancía para actualizar");
        const updatedMerchandise = await Merchandise.findByPk(idMerchandise);
        if (!updatedMerchandise) throw new ServiceError(404, "No se encontró ninguna mercancía para actualizar");
        return updatedMerchandise;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UNA MERCANCIA PERTENECIENTE AL USER
export const deleteMerchandiseData = async (idMerchandise: string): Promise<void> => {
    try {
        const merchandiseFound = await Merchandise.findOne({ where: { id: idMerchandise } });
        if (!merchandiseFound) throw new Error("Maercancía no encontrada");
        await Merchandise.destroy({ where: { id: idMerchandise } });
    } catch (error) {
        throw error;
    }
};