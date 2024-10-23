import { Application } from 'express-ws';
import { Request } from 'express';
import { WebSocket } from 'ws';
import { handleClientRegistration, handleClientDisconnection } from '../../services/POS/websocket.service';
import { wsAuthMiddleware } from '../../middlewares/Token/wsAuth.middleware';

 function websocketController(app: Application) {
    app.ws('/api/ws', (ws: WebSocket, req: Request) => {
        wsAuthMiddleware(ws, req, () => {
       
            const identifier = (ws as any).identifier;
            if (identifier) {
                handleClientRegistration(ws, identifier);
            }

            ws.on('message', (message: string) => {
                //console.log('Mensaje recibido:', message);
            });

            ws.on('close', () => {
                handleClientDisconnection(ws);
            });

            ws.on('error', (error) => {
                handleClientDisconnection(ws);
            });
        });
    });
}

//ws://localhost:3000/api/ws?userId=921309c7-692b-4c3d-8273-85f2694a91b1&wsSecretKey=llave_conexion_pos CONEXION WS




export default websocketController