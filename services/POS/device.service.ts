import { sendDataToClients } from './websocket.service';

// Procesa los datos recibidos de los dispositivos
export function handleDeviceData(identifier: string, data: any) {
    sendDataToClients(identifier, data);
}
