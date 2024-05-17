import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_token_secret';

//Aquí se setean las propiedades que lleva el token
interface Payload {
    id: string;                 //ID DEL USUARIO
    typeRole: string;           //TIPO DE ROL
}

export function createAccessToken(payload: Payload): Promise<string> {
    const options: SignOptions = {
        expiresIn: '1d',
    };

    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            options,
            (err: Error | null, token?: string) => {
                if (err) {
                    reject(err);
                } else if (token) {
                    resolve(token);
                } else {
                    reject(new Error('Token generation failed'));
                };
            }
        );
    });
};