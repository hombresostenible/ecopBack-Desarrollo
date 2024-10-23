import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { WebSocket } from 'ws';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_token_secret';

/**
 * Middleware de autenticación para WebSocket.
 * @param ws WebSocket cliente.
 * @param req Request de Express (donde puedes acceder a la query string).
 * @param next Callback para continuar si la autenticación es correcta.
 */
export const wsAuthMiddleware = (ws: WebSocket, req: Request, next: Function) => {
    // Obtener el token desde la query string
    const token = req.query.token as string;

    if (!token) {
        ws.close(1008, 'No token, authorization denied'); // Código 1008 = Política violada
        return;
    }

    // Verificar el token JWT
    jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            ws.close(1008, 'Invalid token, authorization denied');
            return;
        }

        // Guardar el usuario en la conexión WebSocket
        
        (ws as any).identifier = user.userId; // Por ejemplo, user.id como identificador
        next(); // Continuar si la autenticación es correcta
    });
};
