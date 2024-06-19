import {
    postRegisterUserData,
    getSearchEmailUserPasswordChangeData,
    findUserData,
    findUserBlockedData,
} from "../../data/User/user.data";
import bcrypt from 'bcrypt';
import User from '../../schema/User/user.schema';
import { createAccessToken } from '../../libs/jwt';
import {
    ServiceError,
    IUserServiceLayerResponse,
    IServiceLayerResponseUser,
} from '../../types/Responses/responses.types';
import {
    transporterZoho,

    //USER
    mailResetPasswordUserBlocked,
    mailResetUserPassword,
    mailConfirmResetUserPassword,
} from '../../libs/nodemailer';
import { IUser } from '../../types/User/users.types';
import { IResetPassword } from "../../types/User/resetPassword.types";
import { IResetPasswordBlocked } from "../../types/User/resetPasswordBlocked.types";

//REGISTRO DE UN USUARIO
export const postRegisterUserService = async (body: IUser): Promise<IUserServiceLayerResponse> => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        const serResult = await postRegisterUserData(body);
        if (serResult) {
            const token = await createAccessToken({ id: serResult.id, typeRole: serResult.typeRole });
            return { code: 201, result: { serResult, token } };
        } else return { code: 400, message: 'El email ya se encuentra registrado' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//RECIBE EL CORREO DE SOLICITUD POR CAMBIO DE CONTRASEÑA DE USER O USUARIO DE PLATAFORMA
export const getSearchEmailUserPasswordChangeService = async (email: string): Promise<{ code: number; result: any }> => {
    try {
        function generatePasswordResetCode() {
            const randomNumber = Math.random();
            const random16Digits = Math.floor(randomNumber * 1e16);
            return random16Digits.toString();
        };
        const token = generatePasswordResetCode();
        const dateNow = new Date();
        const dataLayerResponse = await getSearchEmailUserPasswordChangeData(email, token, dateNow);
        if (dataLayerResponse) {
            const link = `http://localhost:5173/reset-password-user/complete/${dataLayerResponse.id}/${token}`;
            const mailOptions = mailResetUserPassword(email, dataLayerResponse.name, link);
            transporterZoho.sendMail(mailOptions, (error, info) => {
                if (error) {
                    throw new ServiceError(500, "No se pudo enviar el correo de solicitud de cambio de contraseña");
                } else console.log(`Correo electrónico enviado: ${info.response}`);
            });
        }
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//CAMBIO DE CONTRASEÑA USER O USUARIO DE PLATAFORMA
export const putResetPasswordUserService = async (idUser: string, passwordResetCode: string, body: IResetPassword ): Promise<IServiceLayerResponseUser> => {
    try {
        const user = await findUserData(idUser);
        if (user?.isBlocked) return { code: 401, message: "Tu cuenta se encuentra bloqueada, por favor realiza el proceso de desbloqueo" };
        if (!user) throw new ServiceError(404, "Usuario no encontrado");
        const currentDate = new Date();
        const codeDate = new Date(user.passwordResetCodeDate);
        // Calcula la diferencia en milisegundos
        const timeDifference = currentDate.getTime() - codeDate.getTime();
        const minutesDifference = timeDifference / (1000 * 60);
        if (passwordResetCode === user.passwordResetCode && minutesDifference <= 30) {
            user.loginAttempts = 0;
            const password = await bcrypt.hash(body.password, 10);
            const [rowsUpdated] = await User.update({ password, loginAttempts: 0 }, { where: { id: user.id } });
            if (rowsUpdated === 0) throw new ServiceError(500, "No se pudo actualizar la contraseña");
            const mailOptions = mailConfirmResetUserPassword(user.email, user.name);
            transporterZoho.sendMail(mailOptions, (error, info) => {
                if (error) {
                    throw new ServiceError(500, "No se pudo enviar el correo de confirmación");
                } else console.log(`Correo electrónico enviado: ${info.response}`);
            });
            return { code: 200, message: "Contraseña actualizada exitosamente", result: user };
        }
        // En caso de que el código no coincida o haya pasado más de 30 minutos
        throw new ServiceError(401, "Código de restablecimiento de contraseña no válido");
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//DESBLOQUEO DE CUENTA Y CAMBIO DE CONTRASEÑA USER
export const putResetPasswordUserIsBlockedService = async (idUser: string, body: IResetPasswordBlocked): Promise<IServiceLayerResponseUser> => {
    try {
        const user = await findUserBlockedData(idUser);
        if (!user) throw new ServiceError(404, "Usuario no encontrado");

        if (body?.unlockCode === user.unlockCode) {
            user.loginAttempts = 0;
            user.isBlocked = false;
            const password = await bcrypt.hash(body.resetPassword, 10);
            const [rowsUpdated] = await User.update(
                { password, loginAttempts: 0, isBlocked: false },
                { where: { id: idUser } }
            );
            if (rowsUpdated === 0) throw new ServiceError(500, "No se logró desbloquear tu cuenta ni actualizar la contraseña");
            const mailOptions = mailResetPasswordUserBlocked(user.email, user.name);
            transporterZoho.sendMail(mailOptions, (error, info) => {
                if (error) {
                    throw new ServiceError(500, "No se pudo enviar el correo de confirmación");
                } else console.log(`Correo electrónico enviado: ${info.response}`);
            });
            return { code: 200, message: "Usuario desbloqueado y contraseña actualizada exitosamente", result: user };
        } else throw new ServiceError(401, "Código de desbloqueo incorrecto");
    } catch (error) {
        if (error instanceof ServiceError) {
            throw error;
        } else if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};