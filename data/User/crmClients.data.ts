import { Op } from 'sequelize';
import CrmClients from '../../schema/User/crmClients.schema';
import { ICrmClients } from '../../types/User/crmClients.types';
import { ServiceError } from '../../types/Responses/responses.types';


//DATA PARA CREAR UN CLIENTE DEL USER
export const postRegisterCRMClientsData = async (body: ICrmClients, userId: string, userType: string): Promise<any> => {
    try {
        if (userType === 'User') {
            const existingCRMClient = await CrmClients.findOne({
                where: { documentId: body.documentId, entityUserId: userId },
            });
            if (existingCRMClient) {
                if (existingCRMClient.userId === userId && userType === 'User') return null;
                throw new ServiceError(400, "Ya existe un client con el mismo documento de identidad");
            }
        }
        const newCRMClient = new CrmClients({
            ...body,
            userId: userType === 'User' ? userId : null,
        });
        await newCRMClient.save();
        return newCRMClient;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CLIENTES DE UN USER
export const getCRMClientsData = async (userId: string, userType: string): Promise<any> => {
    try {
        if (userType === 'User') {
            const userCRMClients = await CrmClients.findAll({
                where: { entityUserId: userId },
            });        
            return userCRMClients;            
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CLIENTES POR SEDE DE UN USER
export const getCRMClientsBranchData = async (idBranch: string, userId: string, userType: string): Promise<any> => {
    try {
        if (userType === 'User') {
            const CRMClientsFound = await CrmClients.findAll({
                where: { branchId: idBranch, entityUserId: userId }
            });
            return CRMClientsFound;
            
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN CLIENTE POR ID PERTENECIENTE AL USER
export const getCRMClientByIdData = async (idCRMClient: string, userId: string, userType: string): Promise<any> => {
    try {
        if (userType === 'User') {
            const CRMClientFound = await CrmClients.findOne({
                where: { id: idCRMClient, entityUserId: userId }
            });
            return CRMClientFound;
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN CLIENTE PERTENECIENTE AL USER
export const putCRMClientData = async (idCRMClient: string, body: ICrmClients, userId: string, userType: string): Promise<ICrmClients | null> => {
    try {
        if (userType === 'User') {
            const existingWithSameId = await CrmClients.findOne({
                where: { entityUserId: userId, id: { [Op.not]: idCRMClient } },
            });
            if (existingWithSameId) throw new ServiceError(403, "No es posible actualizar el cliente porque ya existe uno con ese mismo número de identidad");
            if (userType === 'User' && body.entityUserId !== userId) throw new ServiceError(403, "No tienes permiso para actualizar el cliente");
        }
        const [rowsUpdated] = await CrmClients.update(body, { where: { id: idCRMClient } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún cliente para actualizar");
        const updatedCRMClient = await CrmClients.findByPk(idCRMClient);
        if (!updatedCRMClient) throw new ServiceError(404, "No se encontró ningún cliente para actualizar");
        return updatedCRMClient as unknown as ICrmClients;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
export const deleteCRMClientData = async (idCRMClient: string, userId: string, userType: string): Promise<void> => {
    try {
        if (userType === 'User') {
            const cRMClientFound = await CrmClients.findOne({
                where: { id: idCRMClient, entityUserId: userId }
            });
            if (!cRMClientFound) throw new Error("Cliente no encontrado");
        }
        await CrmClients.destroy({ where: { id: idCRMClient } });
    } catch (error) {
        throw error;
    }
};