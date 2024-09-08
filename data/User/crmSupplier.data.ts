import { Op } from 'sequelize';
import sequelize from '../../db';
import CrmSupplier from '../../schema/User/crmSupplier.schema';
import { ICrmSuppliers } from '../../types/User/crmSupplier.types';
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA CREAR UN PROVEEDOR DEL USER
export const postRegisterCRMSupplierData = async (userId: string, body: ICrmSuppliers): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingCRMSupplier = await CrmSupplier.findOne({
            where: { documentId: body.documentId },
            transaction: t,
        });
        if (existingCRMSupplier) {
            await t.rollback();
            throw new ServiceError(400, "El proveedor ya existe");
        }

        const newCRMSupplier = await CrmSupplier.create({
            ...body,
            userId: userId,
        }, { transaction: t });
        await t.commit();
        return newCRMSupplier;
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el proveedor: ${error}`);
    }
};



//CREAR MUCHOS PROVEEDORES DESDE EL EXCEL
export const postManyCRMSuppliersData = async (userId: string, typeRole: string, body: ICrmSuppliers): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        // Verificar si el proveedor ya existe
        const existingCRMSupplier = await CrmSupplier.findOne({
            where: { documentId: body.documentId },
            transaction: t,
        });
        // Si el proveedor ya existe, devuelve null
        if (existingCRMSupplier) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newCRMSupplier = await CrmSupplier.create({
                ...body,
                entityUserId: userId,
            }, { transaction: t });
            await t.commit();
            return newCRMSupplier;
        }
        if (typeRole === 'Administrador') {
            const newCRMSupplier = await CrmSupplier.create({
                ...body,
                entityUserId: userId,
            }, { transaction: t });        
            await t.commit();
            return newCRMSupplier;            
        }
        // Si el proveedor no existe, crearlo en la base de datos
        const newCRMSupplier = await CrmSupplier.create({
            ...body,
            entityUserId: userId,
        }, { transaction: t });
        await t.commit();
        return newCRMSupplier;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS PROVEEDORES DE UN USER
export const getCRMSuppliersData = async (userId: string): Promise<any> => {
    try {
        const userCRMSupplier = await CrmSupplier.findAll({
            where: { entityUserId: userId },
        });        
        return userCRMSupplier;            
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS PROVEEDORES POR SEDE DE UN USER
export const getCRMSuppliersBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const cRMSuppliersFound = await CrmSupplier.findAll({
            where: { branchId: idBranch, entityUserId: userId }
        });
        return cRMSuppliersFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN PROVEEDOR POR ID PERTENECIENTE AL USER
export const getCRMSupplierByIdData = async (userId: string, idCrmSupplier: string): Promise<any> => {
    try {
        const cRMSupplierFound = await CrmSupplier.findOne({
            where: { id: idCrmSupplier, entityUserId: userId }
        });
        return cRMSupplierFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN PROVEEDORES PERTENECIENTE AL USER
export const putCRMSupplierData = async (userId: string, idCrmSupplier: string, body: ICrmSuppliers): Promise<ICrmSuppliers | null> => {
    try {
        const existingWithSameId = await CrmSupplier.findOne({
            where: {
                entityUserId: userId,
                id: { [Op.not]: idCrmSupplier },    // Excluir el cliente que estás actualizando
                documentId: body.documentId,        // Verificar que el documentId no esté duplicado
            },
        });
        if (existingWithSameId) throw new ServiceError(403, "No es posible actualizar el proveedor porque ya existe uno con ese mismo número de identidad");
        if (body.entityUserId !== userId) throw new ServiceError(403, "No tienes permiso para actualizar el proveedor");
        const [rowsUpdated] = await CrmSupplier.update(body, { where: { id: idCrmSupplier } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún proveedor para actualizar");
        const updatedCRMClient = await CrmSupplier.findByPk(idCrmSupplier);
        if (!updatedCRMClient) throw new ServiceError(404, "No se encontró ningún proveedor para actualizar");
        return updatedCRMClient as unknown as ICrmSuppliers;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN PROVEEDORES PERTENECIENTE AL USER
export const deleteCRMSupplierData = async (userId: string, idCrmSupplier: string): Promise<void> => {
    try {
        const cRMSupplierFound = await CrmSupplier.findOne({
            where: { entityUserId: userId, id: idCrmSupplier }
        });
        if (!cRMSupplierFound) throw new Error("Proveedor no encontrado");
        // Eliminar el proveedor usando la misma condición que en la búsqueda
        await CrmSupplier.destroy({
            where: { entityUserId: userId, id: idCrmSupplier }
        });
    } catch (error) {
        throw error;
    }
};