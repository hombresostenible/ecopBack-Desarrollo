import { Op } from 'sequelize';
import sequelize from '../../db';
import User from '../../schema/UserPanel/user.schema';
import {
    transporterZoho,
    mailUserWelcome,
    mailUpdateUserProfile,
} from '../../libs/nodemailer';
import { extractPublicIdFromUrlCloudinaryProfiles } from '../../helpers/Cloudinary/cloudinary.helper';
import cloudinary from '../../helpers/Cloudinary/cloudinary.helper';
import { IUser } from '../../types/UserPanel/users.types';
import { ServiceError } from "../../types/Responses/responses.types";
import { CapitalizeNameItems } from './../../helpers/CapitalizeNameItems/CapitalizeNameItems';

//REGISTRO DE UN USUARIO
export const postRegisterUserData = async (body: IUser): Promise<User | null> => {
    const t = await sequelize.transaction();
    try {
        if (body.name) body.name = CapitalizeNameItems(body.name);
        if (body.lastName) body.lastName = CapitalizeNameItems(body.lastName);
        if (body.corporateName) body.corporateName = CapitalizeNameItems(body.corporateName);
        if (body.commercialName) body.commercialName = CapitalizeNameItems(body.commercialName);
        if (body.email) body.email = CapitalizeNameItems(body.email);
        body.city = CapitalizeNameItems(body.city);
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: body.email },
                    { documentId: body.documentId }
                ]
            },
            transaction: t,
        });
        if (existingUser) {
            if (existingUser.email === body.email && existingUser.documentId === body.documentId) {
                throw new ServiceError(400, 'El correo y el documento de identificación ya están registrados');
            } else if (existingUser.email === body.email) {
                await t.rollback();
                throw new ServiceError(400, 'El correo ya está registrado');
            } else if (existingUser.documentId === body.documentId) {
                await t.rollback();
                throw new ServiceError(400, 'El documento de identificación ya está registrado');
            }
            return null;
        }
        const newUser = new User({
            name: body.name,
            lastName: body.lastName,
            corporateName: body.corporateName,
            typeDocumentId: body.typeDocumentId,
            documentId: body.documentId,
            commercialName: body.commercialName,
            logo: body.logo,
            typeRole: body.typeRole,
            economicSector: body.economicSector,
            codeCiiu: body.codeCiiu,
            department: body.department,
            city: body.city,
            codeDane: body.codeDane,
            subregionCodeDane: body.subregionCodeDane,
            address: body.address,
            postalCode: body.postalCode,
            phone: body.phone,
            email: body.email,
            password: body.password,
            isAceptedConditions: body.isAceptedConditions,
        });
        const nameToUse = body.name ?? body.corporateName;
        try {
            const mailOptions = mailUserWelcome(body.email, nameToUse || '');
            await newUser.save({ transaction: t });
            await transporterZoho.sendMail(mailOptions);
            await t.commit();
            return newUser;
        } catch (emailError) {
            await t.rollback();
            throw new ServiceError(500, 'Error al enviar el correo electrónico de bienvenida');
        }
    } catch (error) {
        await t.rollback();
        throw new ServiceError(500, `${error}`);
    }
};



//RECIBE EL CORREO DE SOLICITUD POR CAMBIO DE CONTRASEÑA DE USER O USUARIO DE PLATAFORMA
export const getSearchEmailUserPasswordChangeData = async (email: string, token: string, dateNow: Date): Promise<any> => {
    try {
        const user = await User.findOne({ where: { email: email } });        
        if (!user) throw new Error("Correo electrónico no registrado");
        user.passwordResetCode = token;
        user.passwordResetCodeDate = dateNow;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};



//CAMBIO DE CONTRASEÑA USER O USUARIO DE PLATAFORMA
export const putResetPasswordData = async (idUser: string): Promise<User | null> => {
    try {
        const userFound = await User.findOne({ where: { id: idUser } });
        if (!userFound) throw new Error("usuario no encontrado");
        return userFound;
    } catch (error) {
        throw error;
    }
};



//ACTUALIZAR EL PERFIL DEL USER
export const putProfileUserData = async (userId: string, body: IUser): Promise<IUser | null> => {
    const t = await sequelize.transaction();
    try {
        const [rowsUpdated] = await User.update(body, { where: { id: userId }, transaction: t });
        if (rowsUpdated === 0) {
            await t.rollback();
            throw new ServiceError(403, "No se encontró ningún usuario para actualizar");
        }
        const updatedUser = await User.findByPk(userId, { transaction: t });
        if (!updatedUser) {
            await t.rollback();
            throw new ServiceError(404, "No se encontró ningún usuario para actualizar");
        }
        const mailOptions = mailUpdateUserProfile(updatedUser.email, updatedUser.name);
        try {
            await transporterZoho.sendMail(mailOptions);
            await t.commit();
            return updatedUser;
        } catch (emailError) {
            await t.rollback();
            throw new ServiceError(500, 'Error al enviar el correo electrónico de actualización de perfil');
        }
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//SUBIR LA IMAGEN DE PERFIL DEL USER
export const patchLogoUserData = async (idUser: string, body: Partial<IUser>): Promise<IUser | null> => {
    try {
        const existingUser = await User.findOne({
            where: { id: idUser },
        });
        if (!existingUser) throw new ServiceError(404, "No se encontró el usuario");
        if (existingUser && body.logo) {
            existingUser.logo = body.logo;
            await existingUser.save();
        }
        return existingUser;
    } catch (error) {
        throw error;
    }
};



//ELIMINAR LA IMAGEN DE PERFIL DEL USER
export const patchDeleteLogoUserData = async (userId: string) => {
    try {
        const updateClient = await User.findByPk(userId);
        if (!updateClient) throw new Error("No se encontró el usuario para actualizar su logo");
        const logoUrl = updateClient.logo;
        updateClient.logo = '';
        await updateClient.save();
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        if (logoUrl) {
            const publicId = extractPublicIdFromUrlCloudinaryProfiles(logoUrl);
            await cloudinary.uploader.destroy(publicId);
        }
        const existingUser = await User.findOne({
            where: { id: userId }
        });
        if (!existingUser) throw new ServiceError(404, "No se encontró el usuario");
        return existingUser;
    } catch (error) {
        throw error;
    }
};




//DESBLOQUEO DE CUENTA Y CAMBIO DE CONTRASEÑA USER
export const findUserBlockedData = async (idUser: string): Promise<User | null> => {
    try {
        const userFound = await User.findOne({ where: { id: idUser } });
        if (!userFound) throw new Error("usuario no encontrado");
        return userFound;
    } catch (error) {
        throw error;
    }
};



//ACTUALIZAR CONTRASEÑA DE APLICACIONES
export const patchApplicationPasswordData = async (idUser: string, body: Partial<IUser>): Promise<IUser | null> => {
    try {
        const existingUser = await User.findOne({
            where: { id: idUser },
        });
        if (!existingUser) throw new ServiceError(404, "No se encontró el usuario");
        if (body.emailProvider) existingUser.emailProvider = body.emailProvider;
        if (body.applicationPassword) existingUser.applicationPassword = body.applicationPassword;
        await existingUser.save();
        return existingUser;
    } catch (error) {
        throw error;
    }
};