import { Op, Sequelize } from 'sequelize';
import sequelize from '../../db';
import RawMaterial from '../../schema/User/rawMaterial.schema';
import { IRawMaterial } from "../../types/User/rawMaterial.types";
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA CREAR MATERIA PRIMA POR SEDE PARA USER
export const postRawMaterialData = async (userId: string, typeRole: string, body: IRawMaterial): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingRegister = await RawMaterial.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            if (existingRegister.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "La materia prima ya existe en esta sede");
        }
        const currentDate = new Date().toISOString();
        const initialInventory = body.inventory || 0;

        if (typeRole === 'Superadmin') {
            const newRegister = await RawMaterial.create({
                ...body,
                userId: userId,
                inventoryChanges: [{ date: currentDate, quantity: initialInventory, type: 'Ingreso' }],
            }, { transaction: t });
            await t.commit();
            return newRegister;            
        }
        if (typeRole === 'Administrador') {
            const newRegister = await RawMaterial.create({
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



//DATA PARA CREAR MUCHAS MATERIAS POR SEDE PARA USER DESDE EL EXCEL
export const postManyRawMaterialData = async (userId: string, typeRole: string, body: IRawMaterial): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingRegister = await RawMaterial.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await RawMaterial.create({
                ...body,
                userId: userId,
            }, { transaction: t });        
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await RawMaterial.create({
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



//DATA PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UN USER
export const getRawMaterialsData = async (userId: string): Promise<any> => {
    try {
        const userProducts = await RawMaterial.findAll({
            where: { userId: userId },
            order: [ ['nameItem', 'ASC'] ]
        });        
        return userProducts;
    } catch (error) {
        throw error;
    }
};


//DATA PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UNA SEDE DE UN USER
export const getRawMaterialByBranchData = async (idBranch: string): Promise<any> => {
    try {
        const customerAcquisitionFound = await RawMaterial.findAll({
            where: { branchId: idBranch },
            order: [ ['nameItem', 'ASC'] ]
        });
        return customerAcquisitionFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UNA MATERIA PRIMA POR ID PERTENECIENTE AL USER
export const getRawMaterialByIdData = async (idRawMaterial: string): Promise<any> => {
    try {
        const rawMaterialFound = await RawMaterial.findOne({ where: { userId: idRawMaterial } });
        return rawMaterialFound;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODAS LAS MATERIAS PRIMAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getRawMaterialsOffData = async (userId: string): Promise<any> => {
    try {
        const rawMaterialsWithInventoryOff = await RawMaterial.findAll({
            where: {
                userId: userId,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return rawMaterialsWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODAS LAS MATERIAS PRIMAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
export const getRawMaterialsOffByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const rawMaterialsWithInventoryOff = await RawMaterial.findAll({
            where: {
                branchId: idBranch,
                userId: userId,
                [Op.and]: [ Sequelize.literal(`json_length(inventoryOff) > 0`) ]
            },
            order: [ ['nameItem', 'ASC'] ]
        });
        return rawMaterialsWithInventoryOff;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UNA MATERIA PRIMA PERTENECIENTE AL USER
export const putRawMaterialData = async (userId: string, idRawMaterial: string, body: IRawMaterial): Promise<IRawMaterial | null> => {
    try {
        const existingBranchWithSameName = await RawMaterial.findOne({
            where: {
                userId: userId,
                nameItem: body.nameItem,
                id: { [Op.not]: idRawMaterial }
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la materia prima porque ya existe una con ese mismo nombre");
        const [rowsUpdated] = await RawMaterial.update(body, {
            where: { id: idRawMaterial, userId: userId }
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna materia prima para actualizar");
        const updatedRawMaterial = await RawMaterial.findByPk(idRawMaterial);
        if (!updatedRawMaterial) throw new ServiceError(404, "No se encontró ningún producto para actualizar");
        return updatedRawMaterial as unknown as IRawMaterial;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR DE FORMA MASIVA VARIAS MATERIAS PRIMAS
export const putUpdateManyRawMaterialData = async (body: IRawMaterial, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingBranchWithSameName = await RawMaterial.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId, id: { [Op.not]: body.id } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la materia prima porque ya existe una con ese mismo nombre");
        const [rowsUpdated] = await RawMaterial.update(body, { where: { userId: body.id } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna materia prima para actualizar");
        const updatedRawMaterial = await RawMaterial.findByPk(body.id);
        if (!updatedRawMaterial) throw new ServiceError(404, "No se encontró ninguna materia prima para actualizar");
        return updatedRawMaterial;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA DAR DE BAJA UN PRODUCTO DEL USER
export const patchRawMaterialData = async (idRawMaterial: string, body: Partial<IRawMaterial>): Promise<IRawMaterial | null> => {
    const t = await sequelize.transaction();
    try {
        let whereClause: Record<string, any> = { userId: idRawMaterial };
        const existingRegister = await RawMaterial.findOne({
            where: whereClause,
            transaction: t,
        });
        if (!existingRegister) throw new ServiceError(404, "No se encontró el activo");
        if (body.inventory !== undefined && body.inventory > existingRegister.inventory) throw new ServiceError(400, "No hay suficiente cantidad de materia prima disponibles para dar de baja");
        
        if (body.inventoryOff !== undefined && body.inventoryOff.length > 0) {
            const IInventoryOffItem = body.inventoryOff[0];                      // Accede al primer elemento de inventoryOff
            const currentDate = new Date();                                     // Obtener la fecha actual
            
            // Actualizar el inventario y agregar un nuevo elemento a inventoryOff
            existingRegister.inventory -= IInventoryOffItem.quantity || 0;    // Restar la cantidad de materia prima dañadas del inventario actual

            existingRegister.inventoryOff = existingRegister.inventoryOff.concat({ 
                date: currentDate, 
                quantity: (IInventoryOffItem.quantity || 0),
                reason: IInventoryOffItem.reason || 'Baja de activo',
                description: IInventoryOffItem.description,
            });
        }

        const [rowsUpdated] = await RawMaterial.update({
            inventory: existingRegister.inventory,
            inventoryOff: existingRegister.inventoryOff
        }, {
            where: whereClause,
            transaction: t,
        });

        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna materia prima para actualizar");
        const updatedMerchandise = await RawMaterial.findByPk(idRawMaterial, {
            transaction: t,
        });

        if (!updatedMerchandise) throw new ServiceError(404, "No se encontró ninguna materia prima para actualizar");

        await t.commit();
        return updatedMerchandise;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};




//AUMENTA UNIDADES DEL INVENTARIO DE UNA MATERIA PRIMA DEL USER
export const patchAddInventoryRawMaterialData = async (idRawMaterial: string, body: Partial<IRawMaterial>, userId: string): Promise<IRawMaterial | null> => {
    try {
        let whereClause: Record<string, any> = { userId: idRawMaterial };
        whereClause.userId = userId;
        const existingRegister = await RawMaterial.findOne({
            where: whereClause,
        });
        if (!existingRegister) throw new ServiceError(404, "No se encontró la materia prima");
        const addInventory = existingRegister.inventory + (body?.inventory ?? 0);
        const [rowsUpdated] = await RawMaterial.update({ inventory: addInventory }, {
            where: whereClause,
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ninguna materia prima para actualizar");
        const updatedRawMaterial = await RawMaterial.findByPk(idRawMaterial);
        if (!updatedRawMaterial) throw new ServiceError(404, "No se encontró ninguna materia prima para actualizar");
        return updatedRawMaterial;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UNA MATERIA PRIMA PERTENECIENTE AL USER
export const deleteRawMaterialData = async (userId: string, idRawMaterial: string): Promise<void> => {
    try {
        const rawMaterialFound = await RawMaterial.findOne({ where: { id: idRawMaterial } });
        if (!rawMaterialFound) throw new Error('Materia prima no encontrada');
        await RawMaterial.destroy({ where: { userId: userId, id: idRawMaterial } });
    } catch (error) {
        throw error;
    }
};