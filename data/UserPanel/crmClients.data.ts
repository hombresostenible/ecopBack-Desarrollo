import { Op } from 'sequelize';
import sequelize from '../../db';
import CrmClients from '../../schema/UserPanel/crmClients.schema';
import { ICrmClients } from '../../types/UserPanel/crmClients.types';
import { ServiceError } from "../../types/Responses/responses.types";
import { CapitalizeNameItems } from './../../helpers/CapitalizeNameItems/CapitalizeNameItems';

//DATA PARA CREAR UN CLIENTE DEL USER
export const postRegisterCRMClientsData = async (userId: string, body: ICrmClients): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        if (body.name) body.name = CapitalizeNameItems(body.name);
        if (body.lastName) body.lastName = CapitalizeNameItems(body.lastName);
        if (body.corporateName) body.corporateName = CapitalizeNameItems(body.corporateName);
        const existingRegister = await CrmClients.findOne({
            where: { documentId: body.documentId, entityUserId: userId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            throw new ServiceError(400, "Ya existe un cliente con el mismo documento de identidad");
        }
        const newRegister = await CrmClients.create({
            ...body,
            entityUserId: userId,
        }, { transaction: t });
        await t.commit();
        return newRegister;
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el cliente: ${error}`);
    }
};



//CREAR MUCHOS CLIENTES DESDE EL EXCEL
export const postManyCRMClientsData = async (userId: string, typeRole: string, body: ICrmClients): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        if (body.name) body.name = CapitalizeNameItems(body.name);
        if (body.lastName) body.lastName = CapitalizeNameItems(body.lastName);
        if (body.corporateName) body.corporateName = CapitalizeNameItems(body.corporateName);
        const existingRegister = await CrmClients.findOne({
            where: { documentId: body.documentId, entityUserId: userId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await CrmClients.create({
                ...body,
                entityUserId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await CrmClients.create({
                ...body,
                entityUserId: userId,
            }, { transaction: t });        
            await t.commit();
            return newRegister;            
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CLIENTES DE UN USER
export const getCRMClientsData = async (userId: string): Promise<any> => {
    try {
        const userCRMClients = await CrmClients.findAll({
            where: { entityUserId: userId },
        });
        return userCRMClients;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS CLIENTES PAGINADOS DE UN USER
export const getCRMClientsPaginatedData = async (userId: string, page: number, limit: number): Promise<{ registers: ICrmClients[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = { entityUserId: userId };
        const totalRegistersFound = await CrmClients.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await CrmClients.findAll({
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



//DATA PARA OBTENER TODOS LOS CLIENTES POR SEDE DE UN USER
export const getCRMClientsBranchData = async (userId: string, idBranch: string): Promise<any> => {
    try {
        const CRMClientsFound = await CrmClients.findAll({
            where: { branchId: idBranch, entityUserId: userId }
        });
        return CRMClientsFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN CLIENTE POR ID PERTENECIENTE AL USER
export const getCRMClientByIdData = async (userId: string, idCrmClient: string): Promise<any> => {
    try {
        const CRMClientFound = await CrmClients.findOne({
            where: { id: idCrmClient, entityUserId: userId }
        });
        return CRMClientFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN CLIENTE PERTENECIENTE AL USER
export const putCRMClientData = async (userId: string, idCrmClient: string, body: ICrmClients): Promise<ICrmClients | null> => {
    try {
        const existingWithSameId = await CrmClients.findOne({
            where: {
                entityUserId: userId,
                id: { [Op.not]: idCrmClient },      // Excluir el cliente que estás actualizando
                documentId: body.documentId,        // Verificar que el documentId no esté duplicado
            },
        });
        if (existingWithSameId) throw new ServiceError(403, "No es posible actualizar el cliente porque ya existe uno con ese mismo número de identidad");
        const [rowsUpdated] = await CrmClients.update(body, { where: { id: idCrmClient } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún cliente para actualizar");
        const updatedCRMClient = await CrmClients.findByPk(idCrmClient);
        if (!updatedCRMClient) throw new ServiceError(404, "No se encontró ningún cliente para actualizar");
        return updatedCRMClient as unknown as ICrmClients;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
export const deleteCRMClientData = async (userId: string, idCrmClient: string, ): Promise<void> => {
    try {
        const cRMClientFound = await CrmClients.findOne({
            where: { entityUserId: userId, id: idCrmClient}
        });
        if (!cRMClientFound) throw new Error("Cliente no encontrado");
        await CrmClients.destroy({ where: { entityUserId: userId, id: idCrmClient } });
    } catch (error) {
        throw error;
    }
};