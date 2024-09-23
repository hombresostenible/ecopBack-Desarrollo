import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    searchUserByEmail,
    verifyUserTokenData,
    getProfileUserData,
} from '../../data/Auth/auth.data';
import {
    transporterZoho,
    mailAccountUserBlocked,
} from '../../libs/nodemailer';
import { createAccessToken } from '../../libs/jwt';
import { generateCodes } from '../../helpers/GenerateCodes.helper';
import {
    ServiceError,
    ILoginServiceLayerResponse,
    IUserServiceLayerResponse,
} from '../../types/Responses/responses.types';
import { IUser } from "../../types/User/users.types";
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_token_secret';

//LOGIN DE USUARIOS
export const loginService = async (email: string, password: string): Promise<ILoginServiceLayerResponse | null> => {
    try {
        const userFound = await searchUserByEmail(email);   //BUSCA EL CORREO REGISTRADO EN LA BASE DE DATOS
        if (!userFound) return null;
        if (userFound?.isBlocked) return { code: 401, message: "Usuario bloqueado" };

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (isMatch === true) {
            userFound.loginAttempts = 0;
            await userFound.save();

            // Condicional para identificar si es Usuario o Usuario de Plataforma
            let token;
            if ('userId' in userFound && 'branchId' in userFound) {
                // Usuario de Plataforma
                token = await createAccessToken({
                    userId: userFound.id,
                    typeRole: userFound.typeRole,
                    employerId: userFound.userId,     // Solo para Usuario de Plataforma
                    userBranchId: userFound.branchId  // Solo para Usuario de Plataforma
                });
            } else {
                // Usuario titular
                token = await createAccessToken({
                    userId: userFound.id,
                    typeRole: userFound.typeRole
                });
            }

            return { code: 200, result: { serResult: userFound, token } };
        } else {
            userFound.loginAttempts += 1;
            if (userFound.loginAttempts === 3) {
                userFound.isBlocked = true;
                userFound.unlockCode = generateCodes();
                await userFound.save();
                
                // Extraer el nombre solo si está disponible
                const userName = 'name' in userFound ? userFound.name : '';

                const link = `${process.env.CORS_ALLOWED_ORIGIN}/unblocking-account/complete/${userFound.id}`;
                const mailOptions = mailAccountUserBlocked(email, userName, userFound.unlockCode, link);
                transporterZoho.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        throw new ServiceError(500, "No se pudo enviar el correo de confirmación");
                    } else console.log(`Correo electrónico enviado: ${info.response}`);
                });
                return { code: 401, message: "Has bloqueado tu cuenta" };
            }
            if (userFound.loginAttempts > 3) return { code: 401, message: "Usuario bloqueado" };
            await userFound.save();
            return { code: 401, message: "Correo o contraseña incorrecta" };
        }
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//VERIFICA EL TOKEN PARA PERMITIR LA NAVEGACION EN RUTAS PROTEGIDAS
export const verifyUserTokenService = async (token: string) => {
    try {
        const user: IUser | undefined = await new Promise((resolve, reject) => {
            jwt.verify(token, TOKEN_SECRET, async (err, decodedToken) => {
                if (err) return resolve(undefined);
                if (typeof decodedToken !== 'undefined' && typeof decodedToken !== 'string') {
                    const userFound = await verifyUserTokenData(decodedToken.userId);
                    if (userFound) {
                        const newClient: IUser = {
                            id: userFound.id,
                            name: userFound.name,
                            lastName: userFound.lastName,
                            corporateName: userFound.corporateName,
                            typeDocumentId: userFound.typeDocumentId,
                            documentId: userFound.documentId,
                            verificationDigit: userFound.verificationDigit,
                            commercialName: userFound.commercialName,
                            logo: userFound.logo,
                            typeRole: userFound.typeRole,
                            economicSector: userFound.economicSector,
                            codeCiiu: userFound.codeCiiu,
                            department: userFound.department,
                            city: userFound.city,
                            codeDane: userFound.codeDane,
                            subregionCodeDane: userFound.subregionCodeDane,
                            address: userFound.address,
                            postalCode: userFound.postalCode,
                            phone: userFound.phone,
                            email: userFound.email,
                            password: userFound.password,
                            isAceptedConditions: userFound.isAceptedConditions,
                        };
                        return resolve(newClient);
                    } else return resolve(undefined);
                };
                resolve(undefined);
            });
        });
        if (user) {
            return { code: 200, result: { serResult: user } };
        } else return { code: 401, message: 'Unauthorized' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//INFORMACION DE PERFIL DEL USER
export const getProfileUserService = async (userId: string): Promise<IUserServiceLayerResponse | null> => {
    try {
        const profileFound = await getProfileUserData(userId);
        if (!profileFound) return null;
        return { code: 200, result: profileFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};