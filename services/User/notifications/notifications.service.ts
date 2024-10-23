
import Notification from '../../../schema/User/notifications/notification.schema';
import { Op } from 'sequelize';
import { ServiceError } from '../../../types/Responses/responses.types';


export const cronNotifcationDailyService = async (isTemporary: boolean,executionDate: Date) => {
  
    try {
       return await Notification.findAll({
        where: {
            frequency: 'daily',
            executionDate: { [Op.lte]: executionDate },
            isRead: false,
            isTemporary,
            isDelete: false,
            isPending: false
        },
    });
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};

export const cronNotifcationWeeklyService = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await Notification.findAll({
            where: {
                frequency: 'weekly',
                executionDate: { [Op.lte]: executionDate },
                isRead: false,
                isTemporary,
                isDelete: false,
                isPending: false
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};
export const cronNotifcationMonthlyService = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await Notification.findAll({
            where: {
                frequency: 'monthly',
                executionDate: { [Op.lte]: executionDate },
                isRead: false,
                isTemporary,
                isDelete: false,
                isPending: false
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};