import ElectronicInvoicing from '../../../schema/UserPanel/electronicInvoicing.schema';
import { IElectronicInvoicing } from "../../../types/UserPanel/05ElectronicInvoicing/electronicInvoicing.types";

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
export const postElectronicInvoicingData = async (body: IElectronicInvoicing, userId: string): Promise<IElectronicInvoicing> => {
    try {
        const newElectronicInvoicing = new ElectronicInvoicing({
            ...body,
            userId: userId,
        });
        await newElectronicInvoicing.save();
        return newElectronicInvoicing;
    } catch (error) {
        throw error;
    };
};



//CONTROLLER OBTENER TODAS LAS FACTURAS ELECTRÓNICAS
export const getElectronicInvoicingData = async (): Promise<any> => {
    try {
        const ElectronicInvoicings = await ElectronicInvoicing.findAll();
        return ElectronicInvoicings;
    } catch (error) {
        throw error;
    }
};



//CONTROLLER PARA OBTENER UNA FACTURA ELECTRONICA POR ID
export const getElectronicInvoicingByIdData = async (userId: string, idElectronicInvoicing: string): Promise<any> => {
    try {
        const electronicInvoicingFound = await ElectronicInvoicing.findOne({ where: { userId: userId, id: idElectronicInvoicing } });
        return electronicInvoicingFound;
    } catch (error) {
        throw error;
    }
};