
import Notification, { Frequency, NotificationType, Priority } from '../../../schema/User/notifications/notification.schema';
import User from '../../../schema/User/user.schema';
import {generateTaxBimestralNotification} from "../../../helpers/notifications/generateNotifications";
import { Op } from 'sequelize';


export const cronNotifcationDailyService = async (isTemporary: boolean,executionDate: Date) => {
  
    try {
       return await Notification.findAll({
        where: {
            frequency: 'daily',
            executionDate: { [Op.lte]: executionDate },
            endDate: { [Op.gt]: new Date() },
            isRead: false,
            isTemporary,
            isDelete: false,
            isPending: false
        },
    });
    } catch (error) {
        throw error;
    };
};

export const cronNotifcationWeeklyService = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await Notification.findAll({
            where: {
                frequency: 'weekly',
                executionDate: { [Op.lte]: executionDate },
                endDate: { [Op.gt]: new Date() },
                isRead: false,
                isTemporary,
                isDelete: false,
                isPending: false
            },
        });
    } catch (error) {
        throw error;
    };
};
export const cronNotifcationMonthlyService = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await Notification.findAll({
            where: {
                frequency: 'monthly',
                executionDate: { [Op.lte]: executionDate },
                endDate: { [Op.gt]: new Date() },
                isRead: false,
                isTemporary,
                isDelete: false,
                isPending: false
            },
        });
    } catch (error) {
        throw error;
    };
};



//----------------------- GENERACION DE NOTIFICACIONES ESTRATEGICAS------------------------

// 01: Notificar calendarios de presentación y pago de IVA BIMESTRAL 
export const getIVATaxUsersService = async () => {
    return await User.findAll({
        where: {
            typeDocumentId: 'NIT', 
        },
    });
};
export const createTaxBimestralNotificationService = async (user:any) => {
    const idDescription = 1
    const isExistingNotification = await Notification.findOne({
        where: {
            userId: user.id,
            idDescription,
            type: NotificationType.TRIBUTARIAS,
            endDate: {
                [Op.gt]: new Date() 
            },
        },
    });
    if (isExistingNotification) {
        return;
    }else{
        
        const notificationData = generateTaxBimestralNotification(user,NotificationType.TRIBUTARIAS);

        if (!notificationData) {
            return;
        }
    
        await Notification.create({
            userId: user.id,
            title: notificationData.title,
            message: notificationData.message,
            actionCall: notificationData.actionCall,
            frequency: Frequency.BIMONTHLY, 
            executionDate: notificationData.executionDate,
            isRead: false,
            isTemporary: false,
            isDelete: false,  
            isPending: true, 
            priority: Priority.NORMAL, 
            type: NotificationType.TRIBUTARIAS,
            idDescription,
            endDate: notificationData.endDate,
        });
    }


   
};