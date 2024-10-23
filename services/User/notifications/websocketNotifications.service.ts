import WebSocket from 'ws';
import Notification from '../../../schema/User/notifications/notification.schema';

interface Client extends WebSocket {
    identifier?: string;
}

// Mapa para almacenar los clientes conectados por identificador de usuario (userId)
const clientsById: Map<string, Set<Client>> = new Map();

/**
 * Manejar la registración de un cliente conectado.
 * @param ws El WebSocket del cliente.
 * @param identifier El identificador del usuario (userId).
 */
export function handleClientRegistration(ws: Client, identifier: string) {
    ws.identifier = identifier;

    if (!clientsById.has(identifier)) {
        clientsById.set(identifier, new Set());
    }
    clientsById.get(identifier)!.add(ws);

    console.log(`Cliente registrado: ${identifier}`);

    // Enviar notificaciones pendientes al conectarse
    sendPendingNotifications(identifier);
}

/**
 * Manejar la desconexión del cliente.
 * @param ws El WebSocket del cliente.
 */
export function handleClientDisconnection(ws: Client) {
    const identifier = ws.identifier;
    if (identifier && clientsById.has(identifier)) {
        clientsById.get(identifier)!.delete(ws);
        if (clientsById.get(identifier)!.size === 0) {
            clientsById.delete(identifier);
        }
        console.log(`Cliente desconectado: ${identifier}`);
    }
}

/**
 * Enviar notificaciones en tiempo real a los clientes conectados.
 * Si no hay clientes conectados, la notificación queda pendiente en la base de datos.
 * @param identifier El identificador del usuario (userId).
 * @param notification La notificación que se enviará.
 */
export function sendNotificationToClients(identifier: string, notification: any) {
    const clients = clientsById.get(identifier);

    if (clients) {
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    event: 'new_notification',
                    data: notification,
                }));
                console.log(`Notificación enviada en tiempo real al usuario: ${identifier}`);
            }
        });
    } else {
        console.log(`Usuario ${identifier} no está conectado. Notificación pendiente.`);
        // Si no hay clientes conectados, se guarda la notificación como pendiente (no leída)
        notification.isRead = false;
        notification.save();
    }
}



// Función para enviar notificaciones pendientes a todos los clientes conectados
export async function sendPendingNotifications(identifier: string) {
    const pendingNotifications = await Notification.findAll({
        where: { userId: identifier,isPending:true },
    });

    const clients = clientsById.get(identifier);

    

    if (clients) {
      
        pendingNotifications.forEach(async (notification) => {
            console.log("adios",pendingNotifications.length);
            
            clients.forEach((client) => {
                console.log(client.readyState === WebSocket.OPEN);
                console.log(client);
                
                
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        event: 'new_notification',
                        data: notification,
                    }));
                    console.log(`Notificación pendiente enviada al usuario: ${identifier}`);
                }
            });

            // Marcar la notificación como leída después de enviarla
            notification.isPending = false;

            await notification.save();
        });
    } else {
        console.log(`Usuario ${identifier} no está conectado. No se enviaron notificaciones pendientes.`);
    }
}

// Función para enviar una notificación específica a los clientes conectados
export async function sendNotificationToClient(identifier: string, notification: any) {
   
    const clients = clientsById.get(identifier);

    if (clients) {
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    event: 'new_notification',
                    data: notification,
                }));
               
                console.log(`Notificación enviada al usuario: ${identifier}`);
                
            }
        });

  
    } else {
        notification.isPending = true;
        console.log(`Usuario ${identifier} no está conectado. La notificación quedará pendiente.`);
       
    }
}