import {
    postRegisterUserData,
    getSearchEmailUserPasswordChangeData,
} from "../../data/User/user.data";
import bcrypt from 'bcrypt';
import { createAccessToken } from '../../libs/jwt';
import {
    ServiceError,
    IUserServiceLayerResponse,
} from '../../types/Responses/responses.types';
import {
    transporterZoho,

    //USER
    mailResetPasswordUserBlocked,
    mailResetUserPassword,
    mailConfirmResetUserPassword,
} from '../../libs/nodemailer';
import { IUser } from '../../types/User/users.types';

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