import { Op } from 'sequelize';
import sequelize from '../../../db';
import CrmSupplier from '../../../schema/UserPanel/crmSupplier.schema';
import { ICrmSuppliers } from '../../../types/UserPanel/08CrmSuppliers/crmSupplier.types';
import { ServiceError } from "../../../types/Responses/responses.types";
import { CapitalizeNameItems } from './../../../helpers/CapitalizeNameItems/CapitalizeNameItems';

//DATA PARA CREAR UN PROVEEDOR DEL USER
export const postRegisterCRMSupplierData = async (userId: string, body: ICrmSuppliers): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        if (body.name) body.name = CapitalizeNameItems(body.name);
        if (body.lastName) body.lastName = CapitalizeNameItems(body.lastName);
        if (body.corporateName) body.corporateName = CapitalizeNameItems(body.corporateName);
        const existingRegister = await CrmSupplier.findOne({
            where: { documentId: body.documentId, entityUserId: userId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            throw new ServiceError(400, "Ya existe un proveedor con el mismo documento de identidad");
        }
        const newRegister = await CrmSupplier.create({
            ...body,
            entityUserId: userId,
        }, { transaction: t });
        await t.commit();
        return newRegister;
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el proveedor: ${error}`);
    }
};



//CREAR MUCHOS PROVEEDORES DESDE EL EXCEL
export const postManyCRMSuppliersData = async (userId: string, typeRole: string, body: ICrmSuppliers): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        if (body.name) body.name = CapitalizeNameItems(body.name);
        if (body.lastName) body.lastName = CapitalizeNameItems(body.lastName);
        if (body.corporateName) body.corporateName = CapitalizeNameItems(body.corporateName);
        const existingRegister = await CrmSupplier.findOne({
            where: { documentId: body.documentId,entityUserId: userId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await CrmSupplier.create({
                ...body,
                entityUserId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await CrmSupplier.create({
                ...body,
                entityUserId: userId,
            }, { transaction: t });        
            await t.commit();
            return newRegister;            
        }
        const newRegister = await CrmSupplier.create({
            ...body,
            entityUserId: userId,
        }, { transaction: t });
        await t.commit();
        return newRegister;
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



//OBTENER TODOS LOS PROVEEDORES PAGINADOS DE UN USER
export const getCRMSuppliersPaginatedData = async (userId: string, page: number, limit: number): Promise<{ registers: ICrmSuppliers[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = { entityUserId: userId };
        const totalRegistersFound = await CrmSupplier.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await CrmSupplier.findAll({
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