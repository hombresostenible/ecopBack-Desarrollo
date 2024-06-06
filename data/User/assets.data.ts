import { Op } from 'sequelize';
import sequelize from '../../db';
import Assets from '../../schema/User/assets.schema';
import { IAssets } from "../../types/User/assets.types";
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA CREAR UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER
export const postAssetData = async (body: IAssets, userId: string): Promise<any> => {
    try {
        const existingMachinery = await Assets.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
        });
        if (existingMachinery) {
            if (existingMachinery.userId === userId) return null;
            throw new ServiceError(400, "Ya existe una máquina, equipo o herramienta con el mismo nombre en esta sede, cámbialo");
        }
        // Si el activo no existe, crearlo en la base de datos
        const newAsset = await Assets.create({
            ...body,
            userId: userId,
        });
        return newAsset;
    } catch (error) {
        throw error;
    }
};



//DATA PARA CREAR DE FORMA MASIVA UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER DESDE EL EXCEL
export const postManyAssetData = async (body: IAssets, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        // Verificar si el activo ya existe en la sede proporcionada
        const existingAsset = await Assets.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        // Si el activo ya existe, devuelve null
        if (existingAsset) {
            await t.rollback();
            return null;
        }
        // Si el activo no existe, crearlo en la base de datos
        const newAsset = await Assets.create({
            ...body,
        }, { transaction: t });
        await t.commit();
        return newAsset;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DE UN USER
export const getAssetsData = async (userId: string): Promise<any> => {
    try {
        const userMachinery = await Assets.findAll({
            where: { userId: userId },
        });        
        return userMachinery;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN EQUIPO, HERRAMIENTA O MAQUINA POR ID PERTENECIENTE AL USER
export const getAssetByIdData = async (idAssets: string): Promise<any> => {
    try {
        const machineryFound = await Assets.findOne({ where: { id: idAssets } });
        return machineryFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE PARA USER
export const getAssetBranchData = async (idBranch: string): Promise<any> => {
    try {
        const customerMachineryFound = await Assets.findAll({
            where: { branchId: idBranch }
        });
        return customerMachineryFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putAssetData = async (idAssets: string, body: IAssets, userId: string): Promise<IAssets | null> => {
    try {
        const existingBranchWithSameName = await Assets.findOne({
            where: { userId: userId, nameItem: body.nameItem, id: { [Op.not]: idAssets } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la máquina, equipo o herramienta porque ya existe una con ese mismo nombre");
        const [rowsUpdated] = await Assets.update(body, { where: { id: idAssets } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna máquina, equipo o herramienta para actualizar");
        const updatedAsset = await Assets.findByPk(idAssets);
        if (!updatedAsset) throw new ServiceError(404, "No se encontró ninguna máquina, equipo o herramienta para actualizar");
        return updatedAsset;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR DE FORMA MASIVA VARIOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putUpdateManyAssetData = async (body: IAssets, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        // Verificar si el activo ya existe en la sede proporcionado
        const existingBranchWithSameName = await Assets.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId, id: { [Op.not]: body.id } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el equipo, máquina o herramienta porque ya existe una con ese mismo nombre");
        // Actualizar el activo
        const [rowsUpdated] = await Assets.update(body, { where: { id: body.id } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        const updatedAsset = await Assets.findByPk(body.id);
        if (!updatedAsset) throw new ServiceError(404, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        return updatedAsset;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA DAR DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchAssetData = async (idAssets: string, body: Partial<IAssets>): Promise<IAssets | null> => {
    const t = await sequelize.transaction();    
    try {
        let whereClause: Record<string, any> = { id: idAssets };        
     
        const existingAsset = await Assets.findOne({
            where: whereClause,
            transaction: t,
        });        
        if (!existingAsset) throw new ServiceError(404, "No se encontró el activo");        
        if (body.inventory !== undefined && body.inventory > existingAsset.inventory) throw new ServiceError(400, "No hay suficientes activos disponibles para dar de baja");        
        if (body.inventoryOff !== undefined && body.inventoryOff.length > 0) {
            const inventoryOffItem = body.inventoryOff[0]; // Accede al primer elemento de inventoryOff
            const currentDate = new Date(); // Obtener la fecha actual
            // Actualizar el inventario y agregar un nuevo elemento a inventoryOff
            existingAsset.inventory -= inventoryOffItem.quantity || 0; // Restar la cantidad de activos dañados del inventario actual
            existingAsset.inventoryOff = existingAsset.inventoryOff.concat({ 
                date: currentDate, 
                quantity: - (inventoryOffItem.quantity || 0),
                reason: inventoryOffItem.reason || 'Baja de activo',
                description: inventoryOffItem.description,
            });
        }
        const [rowsUpdated] = await Assets.update({
            inventory: existingAsset.inventory,
            inventoryOff: existingAsset.inventoryOff
        }, {
            where: whereClause,
            transaction: t,
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna máquina, equipo o herramienta para actualizar");
        const updatedAsset = await Assets.findByPk(idAssets, {
            transaction: t,
        });
        if (!updatedAsset) throw new ServiceError(404, "No se encontró ninguna máquina, equipo o herramienta para actualizar");
        await t.commit();
        return updatedAsset;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA ELIMINAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteAssetData = async (idAssets: string): Promise<void> => {
    try {
        const productFound = await Assets.findOne({ where: { id: idAssets } });
        if (!productFound) throw new Error("Máquina, equipo o herramienta no encontrada");
        await Assets.destroy({ where: { id: idAssets } });
    } catch (error) {
        throw error;
    }
};