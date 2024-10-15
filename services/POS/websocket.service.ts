
import WebSocket from 'ws';

interface Client extends WebSocket {
    identifier?: string;
}

const clientsById: Map<string, Set<Client>> = new Map();

export function handleClientRegistration(ws: Client, identifier: string) {
    ws.identifier = identifier;

    if (!clientsById.has(identifier)) {
        clientsById.set(identifier, new Set());
    }
    clientsById.get(identifier)!.add(ws);
}

export function handleClientDisconnection(ws: Client) {
    const identifier = ws.identifier;
    if (identifier && clientsById.has(identifier)) {
        clientsById.get(identifier)!.delete(ws);
        if (clientsById.get(identifier)!.size === 0) {
            clientsById.delete(identifier);
        }
    }
}

export function sendDataToClients(identifier: string, data: any) {
    const clients = clientsById.get(identifier);
    
    if (clients) {
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'deviceData', data }));
            }
        });
    }
}