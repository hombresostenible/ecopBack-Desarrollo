import {  
    postElectronicInvoicingData,
    getElectronicInvoicingData,
    getElectronicInvoicingByIdData,
} from "../../data/UserPanel/electronicInvoicing.data";
import { IElectronicInvoicing } from "../../types/UserPanel/electronicInvoicing.types";
import { ServiceError, IServiceLayerResponseElectronicInvoicing } from '../../types/Responses/responses.types';

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
export const postElectronicInvoicingService = async (body: IElectronicInvoicing, userId: string): Promise<IServiceLayerResponseElectronicInvoicing> => {
    try {
        const dataLayerResponse = await postElectronicInvoicingData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar en el libro diario");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    };
};



//CONTROLLER OBTENER TODAS LAS FACTURAS ELECTRÓNICAS
export const getElectronicInvoicingService = async (): Promise<IServiceLayerResponseElectronicInvoicing> => {
    try {
        const dataLayerResponse = await getElectronicInvoicingData();
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};



//CONTROLLER PARA OBTENER UNA FACTURA ELECTRONICA POR ID
export const getElectronicInvoicingByIdService = async (idElectronicInvoicing: string, userId: string): Promise<IServiceLayerResponseElectronicInvoicing> => {
    try {
        const electronicInvoicingFound = await getElectronicInvoicingByIdData(idElectronicInvoicing, userId);
        if (!electronicInvoicingFound) return { code: 404, message: "Factura electrónica no encontrada" };
        return { code: 200, result: electronicInvoicingFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};