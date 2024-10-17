import { Op, Sequelize } from 'sequelize';
import sequelize from '../../db';
import Merchandise from '../../schema/User/merchandise.schema';
import { IMerchandise } from "../../types/User/merchandise.types";
import { ServiceError } from '../../types/Responses/responses.types';
import { CapitalizeNameItems } from './../../helpers/CapitalizeNameItems/CapitalizeNameItems';

//DATA PARA CREAR UNA MERCANCIA POR SEDE PARA USER
export const postMerchandiseData = async (userId: string, typeRole: string, body: IMerchandise): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        body.nameItem = CapitalizeNameItems(body.nameItem);
        if (body.brandItem) body.brandItem = CapitalizeNameItems(body.brandItem);
        const existingRegister = await Merchandise.findOne({
            where: { userId: userId, nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            if (existingRegister.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "La mercancía ya existe en esta sede");
        }
        const currentDate = new Date().toISOString();
        const initialInventory = body.inventory || 0;
        if (typeRole === 'Superadmin') {
            const newRegister = await Merchandise.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {            
            const newRegister = await Merchandise.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA CREAR MUCHAS MERCANCIAS POR SEDE PARA USER DESDE EL EXCEL
export const postManyMerchandiseData = async (userId: string, typeRole: string, body: IMerchandise): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        body.nameItem = CapitalizeNameItems(body.nameItem);
        if (body.brandItem) body.brandItem = CapitalizeNameItems(body.brandItem);
        const existingRegister = await Merchandise.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await Merchandise.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await Merchandise.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
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



//OBTENER TODAS LAS MERCANCIAS PAGINADAS DE UN USER
export const getMerchandisesPaginatedData = async (userId: string, page: number, limit: number): Promise<{ registers: IMerchandise[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = { userId: userId };
        const totalRegistersFound = await Merchandise.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await Merchandise.findAll({
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
export const getMerchandiseByIdData = async (userId: string, idMerchandise: string): Promise<any> => {
    try {
        const merchandiseFound = await Merchandise.findOne({ where: { userId: userId, id: idMerchandise } });
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
export const getMerchandisesOffByBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const merchandisesWithInventoryOff = await Merchandise.findAll({
            where: {
                userId: userId,
                branchId: idBranch,
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
export const putMerchandiseData = async (userId: string, idMerchandise: string, body: IMerchandise): Promise<IMerchandise | null> => {
    try {
        const existingBranchWithSameName = await Merchandise.findOne({
            where: {
                userId: userId,
                nameItem: body.nameItem,
                id: { [Op.not]: idMerchandise }
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la mercancía porque ya existe uno con ese mismo nombre");
        const [rowsUpdated] = await Merchandise.update(body, {
            where: { userId: userId, id: idMerchandise }
        });
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
        const existingRegister = await Merchandise.findOne({
            where: whereClause,
            transaction: t,
        });

        if (!existingRegister) throw new ServiceError(404, "No se encontró el activo");
        if (body.inventory !== undefined && body.inventory > existingRegister.inventory) throw new ServiceError(400, "No hay suficiente cantidad de mercancía disponibles para dar de baja");
        
        if (body.inventoryOff !== undefined && body.inventoryOff.length > 0) {
            const IInventoryOffItem = body.inventoryOff[0];                      // Accede al primer elemento de inventoryOff
            const currentDate = new Date();                                     // Obtener la fecha actual
            
            // Actualizar el inventario y agregar un nuevo elemento a inventoryOff
            existingRegister.inventory -= IInventoryOffItem.quantity || 0;    // Restar la cantidad de mercacías dañadas del inventario actual

            existingRegister.inventoryOff = existingRegister.inventoryOff.concat({ 
                date: currentDate, 
                quantity: (IInventoryOffItem.quantity || 0),
                reason: IInventoryOffItem.reason || 'Baja de activo',
                description: IInventoryOffItem.description,
            });
        }

        const [rowsUpdated] = await Merchandise.update({
            inventory: existingRegister.inventory,
            inventoryOff: existingRegister.inventoryOff
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
export const patchAddInventoryMerchandiseData = async (userId: string, idMerchandise: string, body: Partial<IMerchandise>): Promise<IMerchandise | null> => {
    try {
        let whereClause: Record<string, any> = { id: idMerchandise };
        whereClause.userId = userId;
        const existingRegister = await Merchandise.findOne({
            where: whereClause,
        });
        if (!existingRegister) throw new ServiceError(404, "No se encontró la mercancía");
        const addInventory = existingRegister.inventory + (body?.inventory ?? 0);
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
export const deleteMerchandiseData = async (userId: string, idMerchandise: string): Promise<void> => {
    try {
        const merchandiseFound = await Merchandise.findOne({ where: { id: idMerchandise } });
        if (!merchandiseFound) throw new Error("Maercancía no encontrada");
        await Merchandise.destroy({ where: { userId: userId, id: idMerchandise } });
    } catch (error) {
        throw error;
    }
};