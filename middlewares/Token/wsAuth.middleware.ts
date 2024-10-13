import { WebSocket } from 'ws';
import { Request } from 'express';
import url from 'url';

const WS_SECRET_KEY = process.env.WS_SECRET_KEY || 'default_ws_secret';

export function wsAuthMiddleware(ws: WebSocket, req: Request, next: Function) {
    const parsedUrl = url.parse(req.url || '', true);
    const userId = parsedUrl.query.userId as string;
    const secretKey = parsedUrl.query.wsSecretKey as string;

    // Verificar la clave secreta
    if (secretKey !== WS_SECRET_KEY) {
        ws.close(1008, 'Clave secreta inválida');
        return;
    }

    if (userId) {
        const isValidUser = validateUserId(userId);
        if (!isValidUser) {
            ws.close(1008, 'ID de usuario inválido');
            return;
        }
        (ws as any).identifier = userId;
        next();
    } else {
        ws.close(1008, 'No se proporcionaron datos de autenticación');
        return;
    }
}

function validateUserId(userId: string): boolean {
    // Implementa tu lógica para validar el userId
    return true; // Por ahora, asumimos que todos los userId son válidos
}
