import { cronNotifcationDailyService,cronNotifcationMonthlyService,cronNotifcationWeeklyService } from "../../../services/User/notifications/notifications.service";


//CONTROLLER PARA CREAR UNA SEDE PARA USER
export const cronNotifcationDailyController = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await cronNotifcationDailyService(isTemporary, executionDate);
    } catch (error) {
        console.error('Error enviando notificación específica:', error);
    }
};


export const cronNotifcationWeeklyController = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await cronNotifcationWeeklyService(isTemporary, executionDate);
    } catch (error) {
        console.error('Error enviando notificación específica:', error);
    }
};


export const cronNotifcationMonthlyController = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await cronNotifcationMonthlyService(isTemporary, executionDate);
    } catch (error) {
        console.error('Error enviando notificación específica:', error);
    }
};

