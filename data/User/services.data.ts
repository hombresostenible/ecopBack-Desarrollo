import { Op } from 'sequelize';
import sequelize from '../../db';
import Service from '../../schema/User/service.schema';
import { IService } from "../../types/User/services.types";
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA CREAR UN SERVICIO POR SEDE PARA USER
export const postServicesData = async (body: IService, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingServices = await Service.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        if (existingServices) {
            if (existingServices.getDataValue('userId') === userId) {
                await t.rollback();
                return null;
            }
            await t.rollback();
            throw new ServiceError(400, "El servicio ya existe en esta sede");
        }
        if (typeRole === 'Superadmin') {
            const newService = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newService;            
        }
        if (typeRole === 'Administrador') {
            const newService = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newService;
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el servicio: ${error}`);
    }
};



//DATA PARA CREAR MUCHOS SERVICIOS POR SEDE PARA USER DESDE EL EXCEL
export const postManyServicesData = async (body: IService, userId: string, typeRole: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingServices = await Service.findOne({
            where: { nameItem: body.nameItem, branchId: body.branchId },
            transaction: t,
        });
        // Si la mercancía ya existe, devuelve null
        if (existingServices) {
            await t.rollback();
            return null;
        }    
        if (typeRole === 'Superadmin') {
            const newService = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newService;
        }
        if (typeRole === 'Administrador') {
            const newService = await Service.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            await t.commit();
            return newService;
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el servicio: ${error}`);
    }
};



//DATA PARA OBTENER TODOS LOS SERVICIOS DEL USER
export const getServicesByUserIdData = async (userId: string): Promise<any> => {
    try {
        const userServices = await Service.findAll({
            where: { userId: userId },
        });        
        return userServices;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS SERVICIOS POR SEDE PARA USER
export const getServiceBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const servicesFound = await Service.findAll({
            where: { branchId: idBranch },
        });

        return servicesFound;
    } catch (error) {
        throw error;
    }
};




//DATA PARA OBTENER UN SERVICIO POR ID PERTENECIENTE AL USER
export const getServicesByIdData = async (idService: string): Promise<any> => {
    try {
        const servicesFound = await Service.findOne({ where: { id: idService } });
        return servicesFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN SERVICIO DEL USER
export const putServicesData = async (idService: string, body: IService, userId: string): Promise<IService | null> => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const serviceExists = await Service.findOne({
            where: { id: idService },
            transaction,
        });
        if (!serviceExists) throw new ServiceError(404, "No se encontró ningún servicio para actualizar");
        const existingServiceWithSameName = await Service.findOne({
            where: { userId, nameItem: body.nameItem, id: { [Op.not]: idService } },
            transaction,
        });
        if (existingServiceWithSameName) throw new ServiceError(403, "No es posible actualizar el servicio porque ya existe uno con ese mismo nombre");
        const [rowsUpdated] = await Service.update(body, { where: { id: idService }, transaction });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún servicio para actualizar");

        // Lógica para actualizar ServiceRawMaterial
        // if (body.serviceRawMaterials && body.serviceRawMaterials.length > 0) {
        //     await updateServiceRawMaterials(idService, body.serviceRawMaterials, transaction);
        // }

        await transaction.commit();
        const updatedService = await Service.findByPk(idService);
        if (!updatedService) throw new ServiceError(404, "No se encontró ningún servicio para actualizar");
        return updatedService as unknown as IService;
    } catch (error) {
        if (transaction) await transaction.rollback();
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
        const [rowsUpdated] = await Service.update(body, { where: { id: body.id } });
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
export const deleteServicesData = async (idService: string): Promise<void> => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        // // Eliminar registros en ServiceRawMaterial
        // await ServiceRawMaterial.destroy({
        //     where: { serviceId: idService },
        //     transaction,
        // });

        // // Eliminar registros en ServiceAssets
        // await ServiceAssets.destroy({
        //     where: { serviceId: idService },
        //     transaction,
        // });

        // // Eliminar registros en ServiceProduct
        // await ServiceProduct.destroy({
        //     where: { serviceId: idService },
        //     transaction,
        // });

        // Eliminar el servicio principal
        await Service.destroy({
            where: { id: idService },
            transaction,
        });
        await transaction.commit();
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
};
