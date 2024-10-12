// src/services/Quotation/quotation.services.ts
import {
    createQuotationData,
    getQuotationByIdData,
    updateQuotationData,
    deleteQuotationData,
    getAllQuotationsData,
} from '../../data/User/quotations.data';

import { IQuotation } from '../../types/User/quotations.types';
import { ServiceError } from '../../types/Responses/responses.types';

export const createQuotationService = async (body: IQuotation): Promise<{ code: number; result: any }> => {
    try {
        const quotation = await createQuotationData(body);
        return { code: 201, result: quotation };
    } catch (error) {
        throw new ServiceError(500, `${error}`);
    }
};

export const getQuotationByIdService = async (id: string): Promise<{ code: number; result: any }> => {
    try {
        const quotation = await getQuotationByIdData(id);
        if (!quotation) {
            throw new ServiceError(404, 'Cotización no encontrada');
        }
        return { code: 200, result: quotation };
    } catch (error:any) {
        throw new ServiceError(error.code || 500, error.message);
    }
};

export const updateQuotationService = async (id: string, body: Partial<IQuotation>): Promise<{ code: number; result: any }> => {
    try {
        const quotation = await updateQuotationData(id, body);
        if (!quotation) {
            throw new ServiceError(404, 'Cotización no encontrada');
        }
        return { code: 200, result: quotation };
    } catch (error:any) {
        throw new ServiceError(error.code || 500, error.message);
    }
};

export const deleteQuotationService = async (id: string): Promise<{ code: number; message: string }> => {
    try {
        const deleted = await deleteQuotationData(id);
        if (!deleted) {
            throw new ServiceError(404, 'Cotización no encontrada');
        }
        return { code: 200, message: 'Cotización eliminada exitosamente' };
    } catch (error:any) {
        throw new ServiceError(error.code || 500, error.message);
    }
};

export const getAllQuotationsService = async (): Promise<{ code: number; result: any }> => {
    try {
        const quotations = await getAllQuotationsData();
        return { code: 200, result: quotations };
    } catch (error) {
        throw new ServiceError(500, `${error}`);
    }
};
