import { DataTypes, Model } from 'sequelize';
import db from '../../../db';
import User from '../user.schema';

class Notification extends Model {
    public id!: string;
    public title!: string;
    public message!: string;
    public isTemporary!: boolean;
    public frequency!: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    public startDate!: Date | null;
    public endDate!: Date | null;
    public executionDate!: Date | null; // Fecha programada de ejecución
    public userId!: string; // Usuario que recibirá la notificación
    public isRead!: boolean; // Indicador de si fue leída
};

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isTemporary: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.ENUM('none', 'daily', 'weekly', 'monthly', 'yearly'),
            defaultValue: 'none',
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        executionDate: {
            type: DataTypes.DATE,
            allowNull: true, // Fecha en que se debe ejecutar la notificación
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false, // El usuario destinatario de la notificación
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Por defecto, no se ha leído
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Notification',
        tableName: 'Notification', // Define explícitamente el nombre de la tabla
    }
);

// Relación con el modelo User
Notification.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Notification;


// FRONT PARA QUE JUNTO CON EL CRON SE VERIFIQUE SI YA LEYO

// 1 ENTRA AL CRON
// 2 ONTIENE TODAS LAS QUE NO ESTAN LEIDAS
// 3 ENVIA AL FRONT POR WEBSOCKET LAS QUE NO ESTAN LEAIDAS
// 4 EL FRONT RECIBE LAS NOTIFICACIONES(SI EL USER ESTA CONECTADO) Y SE ENVIA AL BACK LA CONFIRMACION DE LEIDAS (HTTP POST)

//EJEMPLO DE FRONT

// En el cliente WebSocket, recibe la notificación en tiempo real
// socket.on('new_notification', (notification) => {
//     console.log('Nueva notificación:', notification);
    
//     // Mostrar la notificación al usuario (en un modal, banner, etc.)

//     // Llamada para marcar la notificación como leída
//     markAsRead(notification.id);
// });

// const markAsRead = (notificationId) => {
//     fetch(`/api/notifications/${notificationId}/read`, {
//         method: 'POST',
//     });
// };


// EJEMPLO DE BACK
// import cron from 'node-cron';
// import Notification from '../models/notification.schema';
// import { sendRealTimeNotification } from './websocket'; // Asume que tienes la función para WebSocket

// // Cron que verifica las notificaciones programadas cada día a las 9:00 AM
// cron.schedule('0 9 * * *', async () => {
//     const today = new Date();

//     // Encuentra todas las notificaciones programadas para hoy que no han sido leídas
//     const notificationsToSend = await Notification.findAll({
//         where: {
//             executionDate: { [Op.lte]: today }, // Notificaciones que deben enviarse hoy o antes
//             isRead: false,
//         },
//     });

//     // Enviar notificaciones a los usuarios
//     for (const notification of notificationsToSend) {
//         const userId = notification.userId;

//         // Intenta enviar la notificación en tiempo real usando WebSocket
//         sendRealTimeNotification(userId, notification);

//         // Si el usuario no está conectado, la notificación sigue pendiente (isRead = false)
//     }
// });
