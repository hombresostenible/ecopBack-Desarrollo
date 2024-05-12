import sequelize from '../../db';
import UserPlatform from '../../schema/User/userPlatform.schema';
import { IUserPlatform } from '../../types/User/userPlatform.types';
import { ServiceError } from '../../types/Responses/responses.types';

//DATA PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA DE UN USER
export const getUserPlatformData = async (userId: string, userType:string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        if (userType === 'User') {
            const usersPlatform = await UserPlatform.findAll({
                where: { employerId: userId },
                transaction: t,
            });
            return usersPlatform;
        };
    } catch (error) {
        throw error;
    };
};



//DATA PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA PERTENECIENTES A UNA SEDE DE UN USER
export const getUserPlatformBranchByIdData= async (idBranch: string): Promise<any> => {
    try {
        const usersPlatformFound = await UserPlatform.findAll({
            where: { branchId: idBranch } 
        });
        return usersPlatformFound;
    } catch (error) {
        throw error;
    };
};


//DATA PARA ACTUALIZAR EL PERFIL DE UN USUARIO DE PLATAFORMA
export const putProfileUserPlatformData = async (body: IUserPlatform, userId: string): Promise<IUserPlatform | null> => {
    const t = await sequelize.transaction();    
    try {
        if (!body || !body.id || !Object.keys(body).length) {
            await t.rollback();
            throw new ServiceError(400, "Datos del usuario incompletos o inválidos");
        }
        const [rowsUpdated] = await UserPlatform.update(body, { where: { id: body.id }, transaction: t });        
        if (rowsUpdated === 0) {
            await t.rollback();
            throw new ServiceError(403, "No se encontró ningún usuario para actualizar");
        }
        const updatedUser = await UserPlatform.findByPk(userId, { transaction: t });        
        if (!updatedUser) {
            await t.rollback();
            throw new ServiceError(404, "No se encontró ningún usuario para actualizar");
        }
        await t.commit();
        return updatedUser;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};


//DATA PARA OBTENER POR ID UN USUARIO DE PLATAFORMA PERTENECIENTE A UN USER
export const getUserPlatformByIdData = async (idUserPlatform: string, userId: string): Promise<any> => {
    try {
        const userPlatformFound = await UserPlatform.findOne({ where: { id: idUserPlatform, employerId: userId } });
        return userPlatformFound;
    } catch (error) {
        throw error;
    };
};



//DATA PARA ELIMINAR UN USUARIO DE PLATAFORMA PERTENECIENTE A UN USER
export const deleteUserPlatformData = async (idUserPlatform: string): Promise<void> => {
    try {
        const userPlatformFound = await UserPlatform.findOne({ where: { id: idUserPlatform } });
        if (!userPlatformFound) throw new Error("Usuario de platafora no encontrado");
        await UserPlatform.destroy({ where: { id: idUserPlatform } });
    } catch (error) {
        throw error;
    };
};