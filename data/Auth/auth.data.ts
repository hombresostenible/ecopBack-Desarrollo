import User from '../../schema/User/user.schema';
import UserPlatform from '../../schema/User/userPlatform.schema';
import { ServiceError } from '../../types/Responses/responses.types';

//BUSCA EL CORREO DEL USER QUE SE DESEA LOGEAR
export const searchUserByEmail = async (email: string) => {
    try {
        let userFound;
        userFound = await User.findOne({ where: { email } });
        if (userFound) {
            return userFound;
        }
        userFound = await UserPlatform.findOne({ where: { email } });
        if (userFound) {
            return userFound;
        }
        return null;
    } catch (error) {
        throw error;
    }
};



//VERIFICA EL TOKEN PARA PERMITIR LA NAVEGACION EN RUTAS PROTEGIDAS
export const verifyUserTokenData = async (id: string) => {
    try {  
        const user = await User.findOne({ where: { id } });  
        return user || null;
    } catch (error) {
        throw error;
    }
};



//INFORMACION DE PERFIL DEL USER
export const getProfileUserData = async (id: string): Promise<any | null> => {
    try {
        const dataLayerResponse = await User.findOne({ where: { id } });
        if (!dataLayerResponse) throw new ServiceError(400, "Usuario no encontrado");
        return dataLayerResponse || null;
    } catch (error) {
        throw error;
    }
};
