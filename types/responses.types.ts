import { IUser } from "./users.types";

// INTERFACE DE RESPUESTA PARA ERRORES
export class ServiceError extends Error {
    constructor(code: number, message: string, errorMessage?: unknown) {
        super(message);
        this.code = code;
        this.errorMessage = errorMessage;
    };
    code: number;
    errorMessage?: unknown;
};


//INTERFACE DE USUARIOS PARA RESPONDER CON TOKEN
export interface IUserServiceLayerResponse {
    code: number;
    result?: {
        serResult: IUser;
        token: string;
    };
    message?: string;
    errorMessage?: string;
}



// INTERFACE DE RESPUESTA PARA REGISTRO DE CLIENTS PARA CUANDO SE ENVIEN COOKIES
export interface ILoginServiceLayerResponse {
    code: number;
    result?: {
        serResult: IUser;
        token: string;
    };
    message?: string;
    errorMessage?: string;
}