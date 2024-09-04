import { Op } from 'sequelize';
import sequelize from '../../db';
import CrmClients from '../../schema/User/crmClients.schema';
import { ICrmClients } from '../../types/User/crmClients.types';
import { ServiceError } from '../../types/Responses/responses.types';


//DATA PARA CREAR UN CLIENTE DEL USER
export const postRegisterCRMClientsData = async (userId: string, body: ICrmClients): Promise<any> => {
    try {
        const existingCRMClient = await CrmClients.findOne({
            where: { documentId: body.documentId },
        });
        if (existingCRMClient) {
            if (existingCRMClient.userId === userId) return null;
            throw new ServiceError(400, "Ya existe un cliente con el mismo documento de identidad");
        }
        const newCRMClient = new CrmClients({
            ...body,
            userId: userId,
        });
        await newCRMClient.save();
        return newCRMClient;
    } catch (error) {
        throw error;
    }
};



//CREAR MUCHOS CLIENTES DESDE EL EXCEL
export const postManyCRMClientsData = async (body: ICrmClients, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        // Verificar si el cliente ya existe
        const existingCRMClient = await CrmClients.findOne({
            where: { documentId: body.documentId },
            transaction: t,
        });
        // Si el cliente ya existe, devuelve null
        if (existingCRMClient) {
            await t.rollback();
            return null;
        }
        // Si el cliente no existe, crearlo en la base de datos
        const newCRMClient = await CrmClients.create({
            ...body,
            entityUserId: userId,
        }, { transaction: t });
        await t.commit();
        return newCRMClient;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CLIENTES DE UN USER
export const getCRMClientsData = async (userId: string): Promise<any> => {
    try {
        const userCRMClients = await CrmClients.findAll({
            where: { userId: userId },
        });
        return userCRMClients;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CLIENTES POR SEDE DE UN USER
export const getCRMClientsBranchData = async (idBranch: string, userId: string): Promise<any> => {
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
export const getCRMClientByIdData = async (idCrmClient: string, userId: string): Promise<any> => {
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
export const putCRMClientData = async (idCrmClient: string, body: ICrmClients, userId: string): Promise<ICrmClients | null> => {
    try {
        const existingWithSameId = await CrmClients.findOne({
            where: { entityUserId: userId, id: { [Op.not]: idCrmClient } },
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
export const deleteCRMClientData = async (idCrmClient: string, userId: string): Promise<void> => {
    try {
        const cRMClientFound = await CrmClients.findOne({
            where: { id: idCrmClient, entityUserId: userId }
        });
        if (!cRMClientFound) throw new Error("Cliente no encontrado");
        await CrmClients.destroy({ where: { id: idCrmClient } });
    } catch (error) {
        throw error;
    }
};