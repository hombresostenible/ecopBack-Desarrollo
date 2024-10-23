import { Application } from 'express-ws';
import { Request } from "express";
import { WebSocket } from 'ws';
import { handleClientRegistration, handleClientDisconnection, sendPendingNotifications, sendNotificationToClient } from '../../../services/User/notifications/websocketNotifications.service';
import { wsAuthMiddleware } from '../../../middlewares/Token/wsAuthNotifications.middleware';


// Controlador WebSocket para las notificaciones
export const websocketNotificationController = (app: Application) => {
    app.ws('/api/notifications/ws', (ws: WebSocket, req: Request) => {
        // Aplicar el middleware de autenticación por WebSocket
        wsAuthMiddleware(ws, req, () => {
            console.log('Cliente autenticado vía WebSocket');

            // Recuperar el identificador (userId) desde el WebSocket autenticado
            const identifier = (ws as any).identifier;
            if (identifier) {
                handleClientRegistration(ws, identifier);

                // Enviar notificaciones pendientes al usuario cuando se conecta
                sendPendingNotifications(identifier);
            }

            // Manejar mensajes desde el cliente WebSocket
            ws.on('message', (message: string) => {
                console.log('Mensaje recibido:', message);
            });

            // Manejar la desconexión del cliente
            ws.on('close', () => {
                handleClientDisconnection(ws);
            });

            // Manejar errores del WebSocket
            ws.on('error', (error) => {
                handleClientDisconnection(ws);
            });
        });
    });
}; 
// ws://localhost:3000/api/notifications/ws?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mjc3YzQzNy0wNjY3LTRjZGEtOTdjMy04YzNmMjBjNWZkOGIiLCJ0eXBlUm9sZSI6IlN1cGVyYWRtaW4iLCJpYXQiOjE3Mjk3MTE2NzQsImV4cCI6MTcyOTc5ODA3NH0.-nLs6mjP7oicxsKlLrCBioKU0C-eJdei-dhdNvuNh1M

// Controlador para enviar una notificación específica
export const sendNotificationToClientsController = async (userId: string, notification: any) => {

    try {
        // Enviar la notificación específica al usuario
        await sendNotificationToClient(userId, notification);
   
    } catch (error) {
        console.error('Error enviando notificación específica:', error);
       
    }
};
