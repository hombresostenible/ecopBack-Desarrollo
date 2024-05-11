import {
    postAppointmentData,
    getAppointmentData,
    getIdAppointmentData,
    putAppointmentData,
    deleteAppointmentData,
    getConsultAdAppointmentData,
} from "../../data/Ecopcion/appointment.data";
import { IAppointment } from "../../types/Ecopcion/appointment.types";
import { ServiceError } from '../../types/Responses/responses.types';
import { IServiceLayerResponseAppointment } from '../../types/Ecopcion/responsesEcopcion.types';

//SERVICE PARA CREAR UNA CITA PARA USER O COMPANY
export const postAppointmentService = async (body: IAppointment): Promise<IServiceLayerResponseAppointment> => {
    try {
        const dataLayerResponse = await postAppointmentData(body);
        if (!dataLayerResponse) throw new ServiceError(400, "Ya hay una cita para esa fecha y hora");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER TODOS LOS PRODUCTOS DE TODOS LOS USER Y COMPANY - CEO PLATATORMA
export const getAppointmentService = async (): Promise<IServiceLayerResponseAppointment> => {
    try {
        const dataLayerResponse = await getAppointmentData();
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//SERVICE PARA BUSCAR UNA CITA POR SU IDAPPOINTMENT
export const getConsultAdAppointmentService = async (appointmentId: string): Promise<IServiceLayerResponseAppointment> => {
    try {
        const dataLayerResponse = await getConsultAdAppointmentData(appointmentId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA OBTENER TODOS LOS PRODUCTOS DE TODOS LOS USER Y COMPANY - CEO PLATATORMA
export const getIdAppointmentService = async (appointmentId: string): Promise<IServiceLayerResponseAppointment> => {
    try {
        const dataLayerResponse = await getIdAppointmentData(appointmentId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER O COMPANY
export const putAppointmentService = async (appointmentId: string, body: IAppointment): Promise<IServiceLayerResponseAppointment> => {
    try {
        const updateAppointment = await putAppointmentData(appointmentId, body);
        if (!updateAppointment) throw new ServiceError(404, "Cita no encontrada");
        return { code: 200, message: "Cita actualizada exitosamente", result: updateAppointment };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//SERVICE PARA ELIMINAR UNA CITA PARA USER O COMPANY
export const deleteAppointmentService = async (appointmentId: string): Promise<IServiceLayerResponseAppointment> => {
    try {
        await deleteAppointmentData(appointmentId);
        return { code: 200, message: "Cita eliminada exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};