import { Op, Sequelize } from 'sequelize';
import sequelize from '../../db';
import Assets from '../../schema/User/assets.schema';
import { IAssets } from "../../types/User/assets.types";
import { ServiceError } from '../../types/Responses/responses.types';

//CREAR UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER
export const postAssetData = async (body: IAssets, userId: string): Promise<any> => {
    try {
        const existingRegister = await Assets.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
        });
        if (existingRegister) {
            if (existingRegister.userId === userId) return null;
            throw new ServiceError(400, "Ya existe un equipo, máquina o herramienta con el mismo nombre en esta sede, cámbialo");
        }
        // Si el activo no existe, crearlo en la base de datos
        const newRegister = await Assets.create({
            ...body,
            userId: userId,
        });
        return newRegister;
    } catch (error) {
        throw error;
    }
};



//CREAR DE FORMA MASIVA UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER DESDE EL EXCEL
export const postManyAssetData = async (userId: string, typeRole: string, body: IAssets): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingRegister = await Assets.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await Assets.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await Assets.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DE UN USER
export const getAssetsData = async (userId: string): Promise<any> => {
    try {
        const userAsset = await Assets.findAll({
            where: { userId: userId },
            order: [ ['nameItem', 'ASC'] ]
        }); 
        return userAsset;
    } catch (error) {
        throw error;
    }
};



//OBTENER UN EQUIPO, HERRAMIENTA O MAQUINA POR ID PERTENECIENTE AL USER
export const getAssetByIdData = async (idAssets: string): Promise<any> => {
    try {
        const assetFound = await Assets.findOne({
            where: { userId: idAssets },
            order: [ ['nameItem', 'ASC'] ]
        });
        return assetFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE PARA USER
export const getAssetBranchData = async (idBranch: string): Promise<any> => {
    try {
        const customerAssetFound = await Assets.findAll({
            where: {branchId: idBranch },
            order: [ ['nameItem', 'ASC'] ]
        });
        return customerAssetFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getAssetsOffData = async (userId: string): Promise<any> => {
    try {
        const assetSFound = await Assets.findAll({
            where: {
                userId: userId,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return assetSFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getAssetsOffByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const assetsWithInventoryOff = await Assets.findAll({
            where: {
                branchId: idBranch,
                userId: userId,
                [Op.and]: [
                    Sequelize.literal(`json_length(inventoryOff) > 0`)  // Filtrar donde inventoryOff no esté vacío
                ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return assetsWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//ACTUALIZAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putAssetData = async (userId: string, idAssets: string, body: IAssets): Promise<IAssets | null> => {
    try {
        // Verificar si ya existe otro registro con el mismo nombre (ignorar el que se está actualizando)
        const existingBranchWithSameName = await Assets.findOne({
            where: {
                userId: userId,
                nameItem: body.nameItem,
                id: { [Op.not]: idAssets } // Verificar duplicados ignorando el registro actual
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el equipo, máquina o herramienta porque ya existe una con ese mismo nombre");
        // Actualizar el registro si no existe duplicado
        const [rowsUpdated] = await Assets.update(body, {
            where: { id: idAssets, userId: userId }
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        // Recuperar y devolver el registro actualizado
        const updatedAsset = await Assets.findByPk(idAssets);
        if (!updatedAsset) throw new ServiceError(404, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        return updatedAsset;
    } catch (error) {
        throw error;
    }
};



//ACTUALIZAR DE FORMA MASIVA VARIOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putUpdateManyAssetData = async (body: IAssets, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        // Verificar si el activo ya existe en la sede proporcionado
        const existingBranchWithSameName = await Assets.findOne({
            where: {
                nameItem: body.nameItem,
                branchId: body.branchId,
                id: { [Op.not]: body.id }
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el equipo, máquina o herramienta porque ya existe una con ese mismo nombre");
        // Actualizar el activo
        const [rowsUpdated] = await Assets.update(body, { where: { userId: body.id } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        const updatedAsset = await Assets.findByPk(body.id);
        if (!updatedAsset) throw new ServiceError(404, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        return updatedAsset;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DAR DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchAssetData = async (idAssets: string, body: Partial<IAssets>): Promise<IAssets | null> => {
    const t = await sequelize.transaction();
    try {
        let whereClause: Record<string, any> = { userId: idAssets };
        const existingRegister = await Assets.findOne({
            where: whereClause,
            transaction: t,
        });

        if (!existingRegister) throw new ServiceError(404, "No se encontró el activo");
        if (body.inventory !== undefined && body.inventory > existingRegister.inventory) throw new ServiceError(400, "No hay suficientes activos disponibles para dar de baja");
    
        if (body.inventoryOff !== undefined && body.inventoryOff.length > 0) {
            const IInventoryOffItem = body.inventoryOff[0]; // Accede al primer elemento de inventoryOff
            const currentDate = new Date(); // Obtener la fecha actual

            // Actualizar el inventario y agregar un nuevo elemento a inventoryOff
            existingRegister.inventory -= IInventoryOffItem.quantity || 0; // Restar la cantidad de activos dañados del inventario actual

            existingRegister.inventoryOff = existingRegister.inventoryOff.concat({ 
                date: currentDate, 
                quantity: (IInventoryOffItem.quantity || 0),
                reason: IInventoryOffItem.reason || 'Baja de activo',
                description: IInventoryOffItem.description,
            });
        }

        const [rowsUpdated] = await Assets.update({
            inventory: existingRegister.inventory,
            inventoryOff: existingRegister.inventoryOff
        }, {
            where: whereClause,
            transaction: t,
        });

        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        const updatedAsset = await Assets.findByPk(idAssets, {
            transaction: t,
        });

        if (!updatedAsset) throw new ServiceError(404, "No se encontró ningún equipo, máquina o herramienta para actualizar");

        await t.commit();
        return updatedAsset;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//AUMENTA UNIDADES DEL INVENTARIO DE UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchAddInventoryAssetData = async (idAssets: string, body: Partial<IAssets>, userId: string): Promise<IAssets | null> => {
    try {
        let whereClause: Record<string, any> = { userId: idAssets };
        whereClause.userId = userId;
        const existingRegister = await Assets.findOne({
            where: whereClause,
        });
        if (!existingRegister) throw new ServiceError(404, "No se encontró el equipo, máquina o herramienta");
        const addInventory = existingRegister.inventory + (body?.inventory ?? 0);
        const [rowsUpdated] = await Assets.update({ inventory: addInventory }, {
            where: whereClause,
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        const updatedRawMaterial = await Assets.findByPk(idAssets);
        if (!updatedRawMaterial) throw new ServiceError(404, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        return updatedRawMaterial;
    } catch (error) {
        throw error;
    }
};



//ELIMINAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteAssetData = async (userId: string, idAssets: string): Promise<void> => {
    try {
        const productFound = await Assets.findOne({ where: { id: idAssets } });
        if (!productFound) throw new Error("Equipo, máquina o herramienta no encontrada");
        await Assets.destroy({ where: { userId: userId, id: idAssets } });
    } catch (error) {
        throw error;
    }
};