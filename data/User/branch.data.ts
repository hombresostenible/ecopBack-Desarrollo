import { Op } from 'sequelize';
import sequelize from '../../db';
import Branch from '../../schema/User/branch.schema';
import User from '../../schema/User/user.schema';
import { IBranch } from "../../types/User/branch.types";
import { ServiceError } from "../../types/Responses/responses.types";

//DATA PARA CREAR UNA SEDE PARA USER
export const postBranchesData = async (body: IBranch, userId: string): Promise<IBranch> => {
    try {
        const existingBranchWithSameNameAndCode = await Branch.findOne({
            where: { userId: userId, nameBranch: body.nameBranch },
        });
        const existingBranchWithSameName = await Branch.findOne({
            where: { userId: userId, nameBranch: body.nameBranch },
        });
        if (existingBranchWithSameNameAndCode) throw new ServiceError(403, "Ya existe una sede con ese mismo nombre y código");
        if (existingBranchWithSameName) throw new ServiceError(403, "Ya existe una sede con el mismo nombre");
        const newBranch = new Branch({
            ...body,
            userId: userId,
        });
        await newBranch.save();
        return newBranch;
    } catch (error) {
        throw error;
    };
};



//DATA PARA CREAR MASIVAMENTE SEDES PARA USER DESDE EL EXCEL
export const postManyBranchesData = async (body: IBranch, userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingBranch = await Branch.findOne({
            where: { nameBranch: body.nameBranch },
            transaction: t,
        });
        if (existingBranch) {
            await t.rollback();
            return null;
        }
        const newBranch = await Branch.create({
            ...body,
            userId: userId,
        }, { transaction: t });

        await t.commit();
        return newBranch;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA OBTENER TODAS LAS SEDES DE UN USER
export const getBranchesData = async (userId: string): Promise<any> => {
    try {
        const userBranches = await Branch.findAll({
            where: { userId: userId },
        });
        return userBranches;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODAS LAS SEDES PAGINADAS DE UN USER
export const getBranchesPaginatedData = async ( userId: string, page: number, limit: number ): Promise<{ registers: IBranch[], totalRegisters: number, totalPages: number, currentPage: number }> => {
    try {
        const offset = (page - 1) * limit;
        const searchCriteria = { userId: userId };
        const totalRegistersFound = await Branch.count({ where: searchCriteria });
        const totalPages = Math.ceil(totalRegistersFound / limit);
        const registersPaginated = await Branch.findAll({
            where: searchCriteria,
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']] // Ordenar por una columna, puedes cambiar según tus necesidades
        });
        const formattedRegisters = registersPaginated.map(branch => branch.toJSON());
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



//DATA PARA OBTENER UNA SEDE POR ID PERTENECIENTE AL USER
export const getBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const branch = await Branch.findByPk(idBranch, {
            include: [
                {
                    model: User,
                    as: 'user', // Asociación con el alias definido en el modelo Branch
                },
            ],
        });
        return branch;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UNA SEDE PERTENECIENTE AL USER
export const putBranchData = async (userId: string, idBranch: string, body: IBranch): Promise<IBranch> => {
    try {
        // Verificar si ya existe otro registro con el mismo nombre (ignorar el que se está actualizando)
        const existingBranchWithSameName = await Branch.findOne({
            where: { 
                userId: userId, 
                nameBranch: body.nameBranch, 
                id: { [Op.not]: idBranch } // Verificar duplicados ignorando el registro actual
            },
        });
        if (existingBranchWithSameName) throw new ServiceError(403, "No es posible actualizar la sede porque ya existe una sede con el mismo nombre");
        // Actualizar el registro si no existe duplicado
        const [rowsUpdated] = await Branch.update(body, { 
            where: { id: idBranch, userId: userId }
        });
        if (rowsUpdated === 0) throw new ServiceError(404, "No se encontró ninguna sede para actualizar");
        // Recuperar y devolver el registro actualizado
        const updatedBranch = await Branch.findByPk(idBranch);
        if (!updatedBranch) throw new ServiceError(404, "No se encontró ninguna sede actualizada");
        return updatedBranch;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UNA SEDE PERTENECIENTE AL USER
export const deleteBranchData = async (userId: string, idBranch: string): Promise<void> => {
    try {
        const branchFound = await Branch.findOne({ where: { id: idBranch } });
        if (!branchFound) throw new Error('Sede no encontrada');
        await Branch.destroy({ where: { userId: userId, id: idBranch } });
    } catch (error) {
        throw error;
    }
};
