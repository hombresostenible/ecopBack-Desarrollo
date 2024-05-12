import ElectronicInvoicing from '../../schema/User/electronicInvoicing.schema';
import { IElectronicInvoicing } from "../../types/User/electronicInvoicing.types";

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
export const postElectronicInvoicingData = async (body: IElectronicInvoicing, userId: string, userType: string): Promise<IElectronicInvoicing> => {
    try {
        const newElectronicInvoicing = new ElectronicInvoicing({
            ...body,
            userId: userType === 'User' ? userId : null,
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
export const getElectronicInvoicingByIdData = async (idElectronicInvoicing: string, userId: string, userType: string): Promise<any> => {
    try {
        if (userType === 'User') {
            const electronicInvoicingFound = await ElectronicInvoicing.findOne({ where: { id: idElectronicInvoicing, userId: userId } });
            return electronicInvoicingFound;
        }
    } catch (error) {
        throw error;
    }
};