import SalesFunnelCustomerAcq from '../../../schema/User//salesFunnelCustomerAcq.schema';
import SalesFunnelCustomerRet from '../../../schema/User//salesFunnelCustomerRet.schema';
import SalesFunnelSalesDigital from '../../../schema/User//salesFunnelCustomerDigital.schema';
import { ISalesFunnelCustomerAcq, ISalesFunnelCustomerRet, ISalesFunnelSalesDigital } from "../../../types/User/salesFunnel.types";

//^ SALESFUNNELCUSTOMERACQUISITION
//DATA PARA CREAR UN CUSTOMERACQUISITION EN LA SEDE DE USER
export const postSalesFunnelCustomerAcqData = async (body: ISalesFunnelCustomerAcq, userId: string): Promise<any> => {
    try {
        const newSalesFunnelCustomerAcq = new SalesFunnelCustomerAcq({
            ...body,
            userId: userId,
        });
        await newSalesFunnelCustomerAcq.save();
        return newSalesFunnelCustomerAcq;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CUSTOMERACQUISITION DE UN USER
export const getSalesFunnelCustomerAcqUserIdData = async (userId: string): Promise<any> => {
    try {
        const userSalesFunnelCustomerAcqs = await SalesFunnelCustomerAcq.findAll({
            where: { userId: userId },
        });        
        return userSalesFunnelCustomerAcqs;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERACQUISITION DE UN USER
export const getCustomerAcqBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const customerAcquisitionFound = await SalesFunnelCustomerAcq.findAll({
            where: { branchId: idBranch }
        });
        return customerAcquisitionFound;
    } catch (error) {
        throw error;
    }
};




//DATA PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER
export const getCustomerAcqByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const customerAcquisitionFound = await SalesFunnelCustomerAcq.findOne({ where: { id: idAccountsBook } });
        return customerAcquisitionFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN CUSTOMERACQUISITION PERTENECIENTE AL USER
export const putSalesFunnelCustomerAcqData = async (id: string, body: ISalesFunnelCustomerAcq): Promise<ISalesFunnelCustomerAcq | null> => {
    try {
        const [rowsUpdated] = await SalesFunnelCustomerAcq.update(body, { where: { id } });
        if (rowsUpdated === 0) return null;
        const updatedSalesFunnelCustomerAcq = await SalesFunnelCustomerAcq.findByPk(id);
        if (!updatedSalesFunnelCustomerAcq) return null;
        return updatedSalesFunnelCustomerAcq;
    } catch (error) {
        throw error;
    }
};



//CONTROLLER PARA ELIMINAR UN REGISTRO DEL CUSTOMERACQUISITION PERTENECIENTE AL USER
export const deleteSalesFunnelCustomerAcqData = async (idCustomerAcquisition: string): Promise<void> => {
    try {
        const salesFunnelCustomerAcqFound = await SalesFunnelCustomerAcq.findOne({ where: { id: idCustomerAcquisition } });
        if (!salesFunnelCustomerAcqFound) throw new Error('CUSTOMERACQUISITION no encontrado');
        await SalesFunnelCustomerAcq.destroy({ where: { id: idCustomerAcquisition } });
    } catch (error) {
        throw error;
    }
};










//^ SALESFUNNELCUSTOMERRETENTION
//DATA PARA CREAR UN CUSTOMERRETENTION EN LA SEDE DE USER
export const postSalesFunnelCustomerRetData = async (body: ISalesFunnelCustomerRet, userId: string): Promise<any> => {
    try {
        const newSalesFunnelCustomerRet = new SalesFunnelCustomerRet({
            ...body,
            userId: userId,
        });
        await newSalesFunnelCustomerRet.save();
        return newSalesFunnelCustomerRet;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CUSTOMERRETENTION DE UN USER
export const getSalesFunnelCustomerRetUserIdData = async (userId: string): Promise<any> => {
    try {
        const usernewSalesFunnelCustomerRets = await SalesFunnelCustomerRet.findAll({
            where: { userId: userId },
        });        
        return usernewSalesFunnelCustomerRets;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERRETENTION DE UN USER
export const getCustomerRetBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const customerRetentionFound = await SalesFunnelCustomerRet.findAll({
            where: { branchId: idBranch }
        });
        return customerRetentionFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN CUSTOMERRETENTION POR ID PERTENECIENTE AL USER
export const getCustomerRetByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const customerRetentionFound = await SalesFunnelCustomerRet.findOne({ where: { id: idAccountsBook } });
        return customerRetentionFound;
    } catch (error) {
        throw error;
    }
};



//SERVICE PARA ACTUALIZAR UN CUSTOMERRETENTION PERTENECIENTE AL USER
export const putSalesFunnelCustomerRetData = async (idCustomerRetention: string, body: ISalesFunnelCustomerRet): Promise<ISalesFunnelCustomerRet | null> => {
    try {
        const [rowsUpdated] = await SalesFunnelCustomerRet.update(body, { where: { id: idCustomerRetention } });
        if (rowsUpdated === 0) return null;
        const updatedSalesFunnelCustomerRet = await SalesFunnelCustomerRet.findByPk(idCustomerRetention);
        if (!updatedSalesFunnelCustomerRet) return null;
        return updatedSalesFunnelCustomerRet;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN REGISTRO DEL CUSTOMERRETENTION PERTENECIENTE AL USER
export const deleteSalesFunnelCustomerRetData = async (idCustomerRetention: string): Promise<void> => {
    try {
        const salesFunnelCustomerRetFound = await SalesFunnelCustomerRet.findOne({ where: { id: idCustomerRetention } });
        if (!salesFunnelCustomerRetFound) throw new Error('CUSTOMERRETENTION no encontrada');
        await SalesFunnelCustomerRet.destroy({ where: { id: idCustomerRetention } });
    } catch (error) {
        throw error;
    }
};










//^ SALESFUNNELCUSTOMERDIGITAL
//DATA PARA CREAR UN CUSTOMERDIGITAL EN LA SEDE DE USER
export const postSalesFunnelSalesDigitalData = async (body: ISalesFunnelSalesDigital, userId: string): Promise<any> => {
    try {
        const newSalesFunnelSalesDigital = new SalesFunnelSalesDigital({
            ...body,
            userId: userId,
        });
        await newSalesFunnelSalesDigital.save();
        return newSalesFunnelSalesDigital;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS CUSTOMERDIGITAL DE UN USER
export const getSalesFunnelSalesDigitalUserIdData = async (userId: string): Promise<any> => {
    try {
        const userNewSalesFunnelCustomerDigitals = await SalesFunnelSalesDigital.findAll({
            where: { userId: userId },
        });        
        return userNewSalesFunnelCustomerDigitals;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERDIGITAL DE UN USER
export const getCustomerDigitalBranchByIdData = async (idBranch: string): Promise<any> => {
    try {
        const customerDigitalFound = await SalesFunnelSalesDigital.findAll({
            where: { branchId: idBranch }
        });
        return customerDigitalFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER
export const getCustomerDigitalByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const customerDigitalFound = await SalesFunnelSalesDigital.findOne({ where: { id: idAccountsBook } });
        return customerDigitalFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN CUSTOMERDIGITAL PERTENECIENTE AL USER
export const putSalesFunnelSalesDigitalData = async (idCustomerDigital: string, body: ISalesFunnelSalesDigital): Promise<ISalesFunnelSalesDigital | null> => {
    try {
        const [rowsUpdated] = await SalesFunnelSalesDigital.update(body, { where: { id: idCustomerDigital } });
        if (rowsUpdated === 0) return null;
        const updatedSalesFunnelSalesDigital = await SalesFunnelSalesDigital.findByPk(idCustomerDigital);
        if (!updatedSalesFunnelSalesDigital) return null;
        return updatedSalesFunnelSalesDigital;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ELIMINAR UN REGISTRO DEL CUSTOMERDIGITAL PERTENECIENTE AL USER
export const deleteSalesFunnelSalesDigitalData = async (idCustomerDigital: string): Promise<void> => {
    try {
        const salesFunnelSalesDigitalFound = await SalesFunnelSalesDigital.findOne({ where: { id: idCustomerDigital } });
        if (!salesFunnelSalesDigitalFound) throw new Error('CUSTOMERDIGITAL no encontrada');
        await SalesFunnelSalesDigital.destroy({ where: { id: idCustomerDigital } });
    } catch (error) {
        throw error;
    }
};