import { Op } from 'sequelize';
import sequelize from '../../db';
import Service from '../../schema/User/service.schema';
import { IService } from "../../types/User/services.types";
import { ServiceError } from '../../types/Responses/responses.types';
import { CapitalizeNameItems } from './../../helpers/CapitalizeNameItems/CapitalizeNameItems';

//DATA PARA CREAR UN SERVICIO POR SEDE PARA USER
export const postServicesData = async (body: IService, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        body.nameItem = CapitalizeNameItems(body.nameItem);
        const existingRegister = await Service.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            if (existingRegister.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "El servicio ya existe en esta sede");
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;            
        }
        if (typeRole === 'Administrador') {
            const newRegister = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el servicio: ${error}`);
    }
};



//DATA PARA CREAR MUCHOS SERVICIOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyServicesData = async (userId: string, typeRole: string, body: IService): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        body.nameItem = CapitalizeNameItems(body.nameItem);
        const existingRegister = await Service.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        if (typeRole === 'Superadmin') {
            const newRegister = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await Service.create({
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



//DATA PARA OBTENER TODOS LOS SERVICIOS DEL USER
export const getServicesByUserIdData = async (userId: string): Promise<any> => {
    try {
        const userServices = await Service.findAll({
            where: { userId: userId },
            order: [ ['nameItem', 'ASC'] ]
        });        
        return userServices;
    } catch (error) {
        throw error;
    }
};



//OBTENER TODOS LOS SERVICIOS PAGINADOS DE UN USER
export const getServicesPaginatedData = async (userId: string, page: number, limit: number): Promise<{ registers: IService[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = { userId: userId };
        const totalRegistersFound = await Service.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await Service.findAll({
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



//DATA PARA OBTENER TODOS LOS SERVICIOS POR SEDE PARA USER
export const getServiceBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const servicesFound = await Service.findAll({
            where: { branchId: idBranch },
            order: [ ['nameItem', 'ASC'] ]
        });

        return servicesFound;
    } catch (error) {
        throw error;
    }
};




//DATA PARA OBTENER UN SERVICIO POR ID PERTENECIENTE AL USER
export const getServiceByIdData = async (idService: string): Promise<any> => {
    try {
        const servicesFound = await Service.findOne({ where: { userId: idService } });
        return servicesFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN SERVICIO DEL USER
export const putServiceData = async (userId: string, idService: string, body: IService): Promise<IService | null> => {
    //ACTUALIZAR LAS CANTIDADES DE PRODUTOS, MATERIAS PRIMAS, ETC
    try {
        // Verificar si ya existe otro registro con el mismo nombre (ignorar el que se está actualizando)
        const existingBranchWithSameName = await Service.findOne({
            where: {
                userId: userId,
                nameItem: body.nameItem,
                id: { [Op.not]: idService } // Verificar duplicados ignorando el registro actual
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el equipo, máquina o herramienta porque ya existe una con ese mismo nombre");
        // Actualizar el registro si no existe duplicado
        const [rowsUpdated] = await Service.update(body, {
            where: { id: idService, userId: userId }
        });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        // Recuperar y devolver el registro actualizado
        const updatedAsset = await Service.findByPk(idService);
        if (!updatedAsset) throw new ServiceError(404, "No se encontró ningún equipo, máquina o herramienta para actualizar");
        return updatedAsset;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR DE FORMA MASIVA VARIO SERVICIOS
export const putUpdateManyServiceData = async (body: IService, userId: string): Promise<any> => {
    const t = await sequelize.transaction();

    try {
        const existingBranchWithSameName = await Service.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId, id: { [Op.not]: body.id } },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar el servicio porque ya existe una con ese mismo nombre");
        const [rowsUpdated] = await Service.update(body, { where: { userId: body.id } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún servicio para actualizar");
        const updatedService = await Service.findByPk(body.id);
        if (!updatedService) throw new ServiceError(404, "No se encontró ningún servicio para actualizar");
        return updatedService;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA ELIMINAR UN SERVICIO DEL USER
export const deleteServiceData = async (userId: string, idService: string): Promise<void> => {
    // ELIMINAR LOS EQUIPOS, PRODUCTOS, MATERIAS PRIMAS
    try {
        const productFound = await Service.findOne({ where: { id: idService } });
        if (!productFound) throw new Error("Servicio no encontrada");
        await Service.destroy({ where: { userId: userId, id: idService } });
    } catch (error) {
        throw error;
        throw error;
    }
};
