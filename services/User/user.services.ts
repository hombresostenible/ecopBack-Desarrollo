import {
    postRegisterUserData,
} from "../../data/User/user.data";
import bcrypt from 'bcrypt';
import { createAccessToken } from '../../libs/jwt';
import {
    ServiceError,
    IUserServiceLayerResponse,
} from '../../types/responses.types';
import { IUser } from '../../types/users.types';

//REGISTRO DE UN USUARIO
export const postRegisterUserService = async (body: IUser): Promise<IUserServiceLayerResponse> => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        const serResult = await postRegisterUserData(body);
        if (serResult) {
            const token = await createAccessToken({ id: serResult.id, userType: serResult.userType, typeRole: serResult.typeRole });
            return { code: 201, result: { serResult, token } };
        } else return { code: 400, message: 'El email ya se encuentra registrado' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};