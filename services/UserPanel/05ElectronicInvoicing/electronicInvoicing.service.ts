import {  
    // postElectronicInvoicingData,
    getElectronicInvoicingData,
    getElectronicInvoicingByIdData,
} from "../../../data/UserPanel/05ElectronicInvoicing/electronicInvoicing.data";
import axios from 'axios';
import { IElectronicInvoicing } from "../../../types/UserPanel/05ElectronicInvoicing/electronicInvoicing.types";
import { ServiceError, IServiceLayerResponseElectronicInvoicing } from '../../../types/Responses/responses.types';

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
export const postElectronicInvoicingService = async (body: IElectronicInvoicing): Promise<any> => {
    try {
        const simbaEndpoint = process.env.SIMBA_ENDPOINT;
        if (!simbaEndpoint) {
            throw new ServiceError(500, "El endpoint de Simba no está definido");
        }

        const dataLayerResponse = await axios.post(simbaEndpoint, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar en el libro diario");
        // return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
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
export const getElectronicInvoicingByIdService = async (userId: string, idElectronicInvoicing: string): Promise<IServiceLayerResponseElectronicInvoicing> => {
    try {
        const electronicInvoicingFound = await getElectronicInvoicingByIdData(userId, idElectronicInvoicing);
        if (!electronicInvoicingFound) return { code: 404, message: "Factura electrónica no encontrada" };
        return { code: 200, result: electronicInvoicingFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};