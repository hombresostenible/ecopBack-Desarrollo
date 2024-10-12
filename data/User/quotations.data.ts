// src/data/Quotation/quotation.data.ts
import Quotation from '../../schema/User/quotations.schema';
import { IQuotation } from '../../types/User/quotations.types';

export const createQuotationData = async (body: IQuotation): Promise<Quotation> => {
    try {
        const quotation = await Quotation.create(body);
        return quotation;
    } catch (error) {
        throw error;
    }
};

export const getQuotationByIdData = async (id: string): Promise<Quotation | null> => {
    try {
        const quotation = await Quotation.findByPk(id);
        return quotation;
    } catch (error) {
        throw error;
    }
};

export const updateQuotationData = async (id: string, body: Partial<IQuotation>): Promise<Quotation | null> => {
    try {
        const quotation = await Quotation.findByPk(id);
        if (!quotation) {
            return null;
        }
        await quotation.update(body);
        return quotation;
    } catch (error) {
        throw error;
    }
};

export const deleteQuotationData = async (id: string): Promise<boolean> => {
    try {
        const deletedRows = await Quotation.destroy({ where: { id } });
        return deletedRows > 0;
    } catch (error) {
        throw error;
    }
};

export const getAllQuotationsData = async (): Promise<Quotation[]> => {
    try {
        const quotations = await Quotation.findAll();
        return quotations;
    } catch (error) {
        throw error;
    }
};
