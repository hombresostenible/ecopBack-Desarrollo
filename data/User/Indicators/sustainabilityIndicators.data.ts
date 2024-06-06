import sequelize from '../../../db';
import Sustainability from '../../../schema/User/sustainability.schema';
import { ISustainability } from "../../../types/User/sustainability.types";
import { ServiceError } from '../../../types/Responses/responses.types';

//DATA PARA CREAR REGISTROS DE SOSTENIBILIDAD
export const postSustainabilityData = async (body: ISustainability, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const newSustainability = await Sustainability.create({
            ...body,
            userId: userId,
        }, { transaction: t });
        await t.commit();
        return newSustainability;
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `Error al crear el registro de sustentabilidad: ${error}`);
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE SOSTENIBILIDAD DE UN USER
export const getSustainabilitiesByUserIdData = async (userId: string): Promise<any> => {
    try {
        const userSustainabilities = await Sustainability.findAll({
            where: { userId: userId },
        });        
        return userSustainabilities;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTROS DE SOSTENIBILIDAD POR SEDE DE UN USER
export const getSustainabilityBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const sustainabilityFound = await Sustainability.findAll({
            where: { branchId: idBranch }
        });
        return sustainabilityFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getEnergyConsumptionData = async (userId: string): Promise<any> => {
    try {
        const energyConsumption = await Sustainability.findAll({ 
            where: { userId: userId, expenseCategory: 'Electricity' }
        });
        return energyConsumption;
    } catch (error) {
        throw error;
    }
};



//
export const getSustainabilityByIdData = async (idSustainability: string, userId: string): Promise<any> => {
    try {
        const existingRecord = await Sustainability.findOne({
            where: { id: idSustainability, userId: userId }
        });
        return existingRecord || null;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA POR SEDE DEL USER
export const getEnergyConsumptionBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const energyConsumption = await Sustainability.findAll({ 
            where: { branchId: idBranch, userId: userId, expenseCategory: 'Electricity' },
        });
        return energyConsumption;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS SERVICIOS DE AGUA DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getWaterConsumptionData = async (userId: string): Promise<any> => {
    try {
        const energyConsumption = await Sustainability.findAll({ 
            where: { userId: userId, expenseCategory: 'Water' }
        });
        return energyConsumption;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA POR SEDE DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getWaterConsumptionBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const energyConsumption = await Sustainability.findAll({ 
            where: { branchId: idBranch, userId: userId, expenseCategory: 'Water', },
        });
        return energyConsumption;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN REGISTRO DE SOSTENIBILIDAD DEL USER
export const putSustainabilityData = async (idSustainability: string, body: ISustainability, userId: string): Promise<ISustainability | null> => {
    try {
        const existingSustainability = await Sustainability.findOne({
            where: { userId: userId, id: idSustainability },
        });
        if (!existingSustainability) throw new ServiceError(403, "No se encontró el registro");
        const [rowsUpdated] = await Sustainability.update(body, { where: { id: idSustainability } });
        if (rowsUpdated === 0) throw new ServiceError(403, "No se encontró ningún registro para actualizar");
        const updatedProduct = await Sustainability.findByPk(idSustainability);
        if (!updatedProduct) throw new ServiceError(404, "No se encontró ningún registro para actualizar");
        return updatedProduct as unknown as ISustainability;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN REGISTRO DE SOSTENIBILIDAD PERTENECIENTE AL USER
export const deleteSustainabilityData = async (idSustainability: string, userId: string): Promise<void> => {
    try {
        const sustainabilityFound = await Sustainability.findOne({
            where: { id: idSustainability, userId: userId }
        });
        if (!sustainabilityFound) throw new Error("Registro no encontrado");
        await Sustainability.destroy({ where: { id: idSustainability } });
    } catch (error) {
        throw error;
    }
};