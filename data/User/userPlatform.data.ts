import sequelize from '../../db';
import {
    transporterZoho,
    mailUserPlatformWelcome,
} from '../../libs/nodemailer';
import { generateCodes } from '../../helpers/GenerateCodes.helper';
import UserPlatform from '../../schema/User/userPlatform.schema';
import { IUserPlatform } from '../../types/User/userPlatform.types';
import { ServiceError } from '../../types/Responses/responses.types';

//CREAR UN USUARIO DE PLATAFORMA
export const postUserPlatformData = async (body: IUserPlatform, userId: string): Promise<IUserPlatform | null> => {
    const t = await sequelize.transaction();
    try {
        const existingUser = await UserPlatform.findOne({
            where: {
                branchId: body.branchId, documentId: body.documentId, userId: userId
            },
            transaction: t,
        });
        if (existingUser) {
            await t.rollback();
            throw new ServiceError(400, 'El usuario ya está creado');
        } else {
            const newUser = new UserPlatform({
                name: body.name,
                lastName: body.lastName,
                typeDocumentId: body.typeDocumentId,
                documentId: body.documentId,
                profilePicture: body.profilePicture,
                logo: body.logo,
                typeRole: body.typeRole,
                email: body.email,
                password: body.password,
                phone: body.phone,
                department: body.department,
                city: body.city,
                codeDane: body.codeDane,
                subregionCodeDane: body.subregionCodeDane,
                address: body.address,
                isBlocked: true,
                unlockCode: generateCodes(),
                isAceptedConditions: body.isAceptedConditions,
                branchId: body.branchId,
                userId: userId,
            });
            try {
                await newUser.save();
                await t.commit();
                const link = `${process.env.CORS_ALLOWED_ORIGIN}/unblocking-account/complete/${newUser.id}`;
                const mailOptions = mailUserPlatformWelcome(body.email, body.name, newUser.unlockCode, link);
                await transporterZoho.sendMail(mailOptions);
                console.log('Correo electrónico de bienvenida enviado con éxito.');
                return newUser;
            } catch (emailError) {
                console.error('Error al enviar el correo electrónico de bienvenida:', emailError);
                await t.rollback();
                throw new ServiceError(500, 'Error al enviar el correo electrónico de bienvenida');
            }
        }
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//CREA MASIVAMENTE USUARIOS DE PLATAFORMA
export const postManyUserPlatformData = async (userId: string, typeRole: string, body: IUserPlatform): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingRegister = await UserPlatform.findOne({
            where: { documentId: body.documentId, branchId: body.branchId },
            transaction: t,
        });
        if (existingRegister) {
            await t.rollback();
            return null;
        }
        // Si el registro no existe, crearlo en la base de datos
        if (typeRole === 'Superadmin') {
            const newRegister = await UserPlatform.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            try {
                const link = `${process.env.CORS_ALLOWED_ORIGIN}/unblocking-account/complete/${newRegister.id}`;
                const mailOptions = mailUserPlatformWelcome(body.email, body.name, newRegister.unlockCode, link);
                await transporterZoho.sendMail(mailOptions);
                console.log('Correo electrónico de bienvenida enviado con éxito.');
            } catch (emailError) {
                console.error('Error al enviar el correo electrónico de bienvenida:', emailError);
                await t.rollback();
                throw new ServiceError(500, 'Error al enviar el correo electrónico de bienvenida');
            }
            await t.commit();
            return newRegister;
        }
        if (typeRole === 'Administrador') {
            const newRegister = await UserPlatform.create({
                ...body,
                userId: userId,
            }, { transaction: t });
            try {
                const link = `${process.env.CORS_ALLOWED_ORIGIN}/unblocking-account/complete/${newRegister.id}`;
                const mailOptions = mailUserPlatformWelcome(body.email, body.name, newRegister.unlockCode, link);
                await transporterZoho.sendMail(mailOptions);
                console.log('Correo electrónico de bienvenida enviado con éxito.');
            } catch (emailError) {
                console.error('Error al enviar el correo electrónico de bienvenida:', emailError);
                await t.rollback();
                throw new ServiceError(500, 'Error al enviar el correo electrónico de bienvenida');
            }
            await t.commit();
            return newRegister;
        }
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA DE UN USER
export const getUsersPlatformData = async (userId: string): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const usersPlatform = await UserPlatform.findAll({
            where: { userId: userId },
            transaction: t,
        });
        return usersPlatform;
    } catch (error) {
        throw error;
    };
};



//OBTENER UN USUARIO DE PLATAFORMA POR ID PERTENECIENTE AL USER
export const getUserPlatformByIdData = async (userId: string, idUserPlatform: string): Promise<any> => {
    try {
        const usersPlatformFound = await UserPlatform.findOne({ where: { userId: userId, id: idUserPlatform } });
        return usersPlatformFound;
    } catch (error) {
        throw error;
    }
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
export const putProfileUserPlatformData = async (userId: string, body: IUserPlatform): Promise<IUserPlatform | null> => {
    const t = await sequelize.transaction();    
    try {
        if (!body || !body.id || !Object.keys(body).length) {
            await t.rollback();
            throw new ServiceError(400, "Datos del usuario incompletos o inválidos");
        }
        const [rowsUpdated] = await UserPlatform.update(body, { where: { id: body.id, userId: userId }, transaction: t });        
        if (rowsUpdated === 0) {
            await t.rollback();
            throw new ServiceError(403, "No se encontró ningún usuario para actualizar");
        }
        const updatedUser = await UserPlatform.findByPk(body.id,  { transaction: t });        
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