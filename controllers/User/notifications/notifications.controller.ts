import { createTaxBimestralNotificationService, cronNotifcationDailyService,cronNotifcationMonthlyService,cronNotifcationWeeklyService, getIVATaxUsersService } from "../../../services/User/notifications/notifications.service";


//CONTROLLER PARA CREAR UNA SEDE PARA USER
export const cronNotifcationDailyController = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await cronNotifcationDailyService(isTemporary, executionDate);
    } catch (error) {
        throw error;
    }
};


export const cronNotifcationWeeklyController = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await cronNotifcationWeeklyService(isTemporary, executionDate);
    } catch (error) {
        throw error;
    }
};


export const cronNotifcationMonthlyController = async (isTemporary: boolean,executionDate: Date) => {
    try {
        return await cronNotifcationMonthlyService(isTemporary, executionDate);
    } catch (error) {
        throw error;
    }
};


//----------------------- GENERACION DE NOTIFICACIONES ESTRATEGICAS------------------------

// 01: Notificar calendarios de presentación y pago de IVA BIMESTRAL 
export const getIVATaxUsersController = async () => {
    try {
        return await getIVATaxUsersService();
    } catch (error) {
        throw error;
    }
};
export const createTaxBimestralNotificationController = async (user: any) => {
    try {
        return await createTaxBimestralNotificationService(user);
    } catch (error) {
        throw error;
    }
};