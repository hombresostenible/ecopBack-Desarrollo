import SalesFunnelCustomerAcq from '../../../schema/User//salesFunnelCustomerAcq.schema';
import SalesFunnelCustomerRet from '../../../schema/User//salesFunnelCustomerRet.schema';
import SalesFunnelSalesDigital from '../../../schema/User//salesFunnelCustomerDigital.schema';
import { ISalesFunnelCustomerAcq, ISalesFunnelCustomerRet, ISalesFunnelSalesDigital } from "../../../types/User/salesFunnel.types";

//^ SALESFUNNELCUSTOMERACQUISITION
//DATA PARA CREAR UN CUSTOMERACQUISITION EN LA SEDE DE USER O COMPANY
export const postSalesFunnelCustomerAcqData = async (body: ISalesFunnelCustomerAcq, userId: string, userType: string): Promise<any> => {
    try {
        const newSalesFunnelCustomerAcq = new SalesFunnelCustomerAcq({
            ...body,
            userId: userType === 'User' ? userId : null,
            companyId: userType === 'Company' ? userId : null,
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



//DATA PARA OBTENER TODOS LOS CUSTOMERACQUISITION DE UNA COMPANY
export const getSalesFunnelCustomerAcqCompanyIdData = async (companyId: string): Promise<any> => {
    try {
        const userSalesFunnelCustomerAcqs = await SalesFunnelCustomerAcq.findAll({
            where: { companyId: companyId },
        });        
        return userSalesFunnelCustomerAcqs;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERACQUISITION DE UN USER O COMPANY
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




//DATA PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER O COMPANY
export const getCustomerAcqByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const customerAcquisitionFound = await SalesFunnelCustomerAcq.findOne({ where: { id: idAccountsBook } });
        return customerAcquisitionFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN CUSTOMERACQUISITION PERTENECIENTE AL USER O COMPANY
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



//CONTROLLER PARA ELIMINAR UN REGISTRO DEL CUSTOMERACQUISITION PERTENECIENTE AL USER O COMPANY
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
//DATA PARA CREAR UN CUSTOMERRETENTION EN LA SEDE DE USER O COMPANY
export const postSalesFunnelCustomerRetData = async (body: ISalesFunnelCustomerRet, userId: string, userType: string): Promise<any> => {
    try {
        const newSalesFunnelCustomerRet = new SalesFunnelCustomerRet({
            ...body,
            userId: userType === 'User' ? userId : null,
            companyId: userType === 'Company' ? userId : null,
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



//DATA PARA OBTENER TODOS LOS CUSTOMERRETENTION DE UNA COMPANY
export const getSalesFunnelCustomerRetCompanyIdData = async (companyId: string): Promise<any> => {
    try {
        const usernewSalesFunnelCustomerRets = await SalesFunnelCustomerRet.findAll({
            where: { companyId: companyId },
        });        
        return usernewSalesFunnelCustomerRets;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERRETENTION DE UN USER O COMPANY
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



//DATA PARA OBTENER UN CUSTOMERRETENTION POR ID PERTENECIENTE AL USER O COMPANY
export const getCustomerRetByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const customerRetentionFound = await SalesFunnelCustomerRet.findOne({ where: { id: idAccountsBook } });
        return customerRetentionFound;
    } catch (error) {
        throw error;
    }
};



//SERVICE PARA ACTUALIZAR UN CUSTOMERRETENTION PERTENECIENTE AL USER O COMPANY
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



//DATA PARA ELIMINAR UN REGISTRO DEL CUSTOMERRETENTION PERTENECIENTE AL USER O COMPANY
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
//DATA PARA CREAR UN CUSTOMERDIGITAL EN LA SEDE DE USER O COMPANY
export const postSalesFunnelSalesDigitalData = async (body: ISalesFunnelSalesDigital, userId: string, userType: string): Promise<any> => {
    try {
        const newSalesFunnelSalesDigital = new SalesFunnelSalesDigital({
            ...body,
            userId: userType === 'User' ? userId : null,
            companyId: userType === 'Company' ? userId : null,
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



//DATA PARA OBTENER TODOS LOS CUSTOMERDIGITAL DE UNA COMPANY
export const getSalesFunnelSalesDigitalCompanyIdData = async (companyId: string): Promise<any> => {
    try {
        const userNewSalesFunnelCustomerDigitals = await SalesFunnelSalesDigital.findAll({
            where: { companyId: companyId },
        });        
        return userNewSalesFunnelCustomerDigitals;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERDIGITAL DE UN USER O COMPANY
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



//DATA PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER O COMPANY
export const getCustomerDigitalByIdData = async (idAccountsBook: string): Promise<any> => {
    try {
        const customerDigitalFound = await SalesFunnelSalesDigital.findOne({ where: { id: idAccountsBook } });
        return customerDigitalFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN CUSTOMERDIGITAL PERTENECIENTE AL USER O COMPANY
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



//DATA PARA ELIMINAR UN REGISTRO DEL CUSTOMERDIGITAL PERTENECIENTE AL USER O COMPANY
export const deleteSalesFunnelSalesDigitalData = async (idCustomerDigital: string): Promise<void> => {
    try {
        const salesFunnelSalesDigitalFound = await SalesFunnelSalesDigital.findOne({ where: { id: idCustomerDigital } });
        if (!salesFunnelSalesDigitalFound) throw new Error('CUSTOMERDIGITAL no encontrada');
        await SalesFunnelSalesDigital.destroy({ where: { id: idCustomerDigital } });
    } catch (error) {
        throw error;
    }
};



// import {
//     //Data para CUSTOMERACQUISITION
//     postSalesFunnelCustomerAcqData,
//     getSalesFunnelCustomerAcqUserIdData,
//     getSalesFunnelCustomerAcqCompanyIdData,
//     getCustomerAcqBranchByIdData,
//     getCustomerAcqByIdData,
//     putSalesFunnelCustomerAcqData,
//     deleteSalesFunnelCustomerAcqData,


//     //Data para CUSTOMERRETENTION
//     postSalesFunnelCustomerRetData,
//     getSalesFunnelCustomerRetUserIdData,
//     getSalesFunnelCustomerRetCompanyIdData,
//     getCustomerRetBranchByIdData,
//     getCustomerRetByIdData,
//     putSalesFunnelCustomerRetData,
//     deleteSalesFunnelCustomerRetData,


//     //Data para CUSTOMERDIGITAL
//     postSalesFunnelSalesDigitalData,
//     getSalesFunnelSalesDigitalUserIdData,
//     getSalesFunnelSalesDigitalCompanyIdData,
//     getCustomerDigitalBranchByIdData,
//     getCustomerDigitalByIdData,
//     putSalesFunnelSalesDigitalData,
//     deleteSalesFunnelSalesDigitalData
// } from "../../data/salesFunnel.data";
// import { isBranchAssociatedWithUserRole, isBranchAssociatedWithCompanyRole } from '../../middlewares/Branch.middleware';
// import { ISalesFunnelCustomerAcq, ISalesFunnelCustomerRet, ISalesFunnelSalesDigital } from "../../types/salesFunnel.types";
// import { ServiceError, ServiceLayerResponseSalesFunnelCustomerAcq, ServiceLayerResponseSalesFunnelCustomerRet, ServiceLayerResponseSalesFunnelCustomerDigital } from '../../types/responses.types';



// //^ SALESFUNNELCUSTOMERACQUISITION
// //SERVICE PARA CREAR UN CUSTOMERACQUISITION EN LA SEDE DE USER O COMPANY
// export const postSalesFunnelCustomerAcqService = async (body: ISalesFunnelCustomerAcq, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         if (userType === 'User') {
//             const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, body.branchId);
//             if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERACQUISITION de esta sede");
//         }
//         if (userType === 'Company') {
//             const isBranchAssociatedWithCompany: any = await isBranchAssociatedWithCompanyRole(userId, body.branchId);
//             if (!isBranchAssociatedWithCompany) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERACQUISITION de esta sede");
//         }
//         const dataLayerResponse = await postSalesFunnelCustomerAcqData(body, userId, userType);
//         if (!dataLayerResponse) throw new ServiceError(400, "CUSTOMERACQUISITION ya existe");
//         return { code: 201, result: dataLayerResponse };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER TODOS LOS CUSTOMERACQUISITION DE UN USER O COMPANY
// export const getSalesFunnelCustomerAcqUserService = async (userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         let dataLayerResponse;
//         if (userType === 'User') {
//             dataLayerResponse = await getSalesFunnelCustomerAcqUserIdData(userId);
//         } else if (userType === 'Company') {
//             dataLayerResponse = await getSalesFunnelCustomerAcqCompanyIdData(userId);
//         }
//         return { code: 200, result: dataLayerResponse };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERACQUISITION DE UN USER O COMPANY
// export const getCustomerAcqBranchService = async (idBranch: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         const hasPermission = await checkPermissionForBranchCustomerAcq(idBranch, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los CUSTOMERACQUISITION de esta sede");
//         const customerAcquisitionFound = await getCustomerAcqBranchByIdData(idBranch);
//         if (!customerAcquisitionFound) return { code: 404, message: "CUSTOMERACQUISITION no encontrado en esta sede" };
//         return { code: 200, result: customerAcquisitionFound };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };

// //Chequea si las sedes pertenecen a User o Company, por eso usamos el "for", para iterar cada sede y obtener los CustomerAcquisition de cada una
// const checkPermissionForBranchCustomerAcq = async (idBranch: string, userId: string, userType: string): Promise<boolean> => {
//     try {
//         const customerAcquisitions = await getCustomerAcqBranchByIdData(idBranch);
//         if (!customerAcquisitions) return false;
//         for (const customerAcquisition of customerAcquisitions) {
//             if ((userType === 'User' && customerAcquisition.userId !== userId) ||
//                 (userType === 'Company' && customerAcquisition.companyId !== userId)) {
//                 return false;
//             }
//         }
//         return true;
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER O COMPANY
// export const getCustomerAcqService = async (idCustomerAcquisition: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerAcq(idCustomerAcquisition, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este CUSTOMERACQUISITION");
//         const customerAcqFound = await getCustomerAcqByIdData(idCustomerAcquisition);
//         if (!customerAcqFound) return { code: 404, message: "CUSTOMERACQUISITION no encontrado" };
//         return { code: 200, result: customerAcqFound };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA ACTUALIZAR UN CUSTOMERACQUISITION PERTENECIENTE AL USER O COMPANY
// export const putSalesFunnelCustomerAcqService = async (idCustomerAcquisition: string, body: ISalesFunnelCustomerAcq, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerAcq(idCustomerAcquisition, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este CUSTOMERACQUISITION");
//         const updateSalesFunnelCustomerAcq = await putSalesFunnelCustomerAcqData(idCustomerAcquisition, body);
//         if (!updateSalesFunnelCustomerAcq) throw new ServiceError(404, 'CUSTOMERACQUISITION no encontrado');
//         return { code: 200, message: 'CUSTOMERACQUISITION Actualizado exitosamente', result: updateSalesFunnelCustomerAcq };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };

// //Chequea si el CUSTOMERACQUISITION pertenece al User o Company
// const checkPermissionForCustomerAcq = async (idCustomerAcquisition: string, userId: string, userType: string): Promise<boolean> => {
//     try {
//         const customerAcq = await getCustomerAcqByIdData(idCustomerAcquisition);
//         if (!customerAcq) return false;
//         if (userType === 'User' && customerAcq.userId !== userId) return false; 
//         if (userType === 'Company' && customerAcq.companyId !== userId) return false;
//         return true;
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA ELIMINAR UN REGISTRO DEL CUSTOMERACQUISITION PERTENECIENTE AL USER O COMPANY
// export const deleteSalesFunnelCustomerAcqService = async (idCustomerAcquisition: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerAcq(idCustomerAcquisition, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro del CUSTOMERACQUISITION");
//         await deleteSalesFunnelCustomerAcqData(idCustomerAcquisition);
//         return { code: 200, message: 'Registro del CUSTOMERACQUISITION eliminado exitosamente' };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };










// //^ SALESFUNNELCUSTOMERRETENTION
// //SERVICE PARA CREAR UN CUSTOMERRETENTION EN LA SEDE DE USER O COMPANY
// export const postSalesFunnelCustomerRetService = async (body: ISalesFunnelCustomerRet, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerRet> => {
//     try {
//         if (userType === 'User') {
//             const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, body.branchId);
//             if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERRETENTION de esta sede");
//         }
//         if (userType === 'Company') {
//             const isBranchAssociatedWithCompany: any = await isBranchAssociatedWithCompanyRole(userId, body.branchId);
//             if (!isBranchAssociatedWithCompany) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERRETENTION de esta sede");
//         }
//         const dataLayerResponse = await postSalesFunnelCustomerRetData(body, userId, userType);
//         if (!dataLayerResponse) throw new ServiceError(400, "CUSTOMERRETENTION ya existe");
//         return { code: 201, result: dataLayerResponse };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER TODOS LOS CUSTOMERRETENTION DE UN USER O COMPANY
// export const getSalesFunnelCustomerRetUserService = async (userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerRet> => {
//     try {
//         let dataLayerResponse;
//         if (userType === 'User') {
//             dataLayerResponse = await getSalesFunnelCustomerRetUserIdData(userId);
//         } else if (userType === 'Company') {
//             dataLayerResponse = await getSalesFunnelCustomerRetCompanyIdData(userId);
//         }
//         return { code: 200, result: dataLayerResponse };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERRETENTION DE UN USER O COMPANY
// export const getCustomerRetBranchService = async (idBranch: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerAcq> => {
//     try {
//         const hasPermission = await checkPermissionForBranchCustomerRet(idBranch, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los CUSTOMERRETENTION de esta sede");
//         const customerRetentiontionFound = await getCustomerRetBranchByIdData(idBranch);
//         if (!customerRetentiontionFound) return { code: 404, message: "CUSTOMERRETENTION no encontrado en esta sede" };
//         return { code: 200, result: customerRetentiontionFound };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };

// //Chequea si las sedes pertenecen a User o Company, por eso usamos el "for", para iterar cada sede y obtener los CUSTOMERRETENTION de cada una
// const checkPermissionForBranchCustomerRet = async (idBranch: string, userId: string, userType: string): Promise<boolean> => {
//     try {
//         const customerRetentions = await getCustomerRetBranchByIdData(idBranch);
//         if (!customerRetentions) return false;
//         for (const customerRetention of customerRetentions) {
//             if ((userType === 'User' && customerRetention.userId !== userId) ||
//                 (userType === 'Company' && customerRetention.companyId !== userId)) {
//                 return false;
//             }
//         }
//         return true;
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER UN CUSTOMERRETENTION POR ID PERTENECIENTE AL USER O COMPANY
// export const getCustomerRetService = async (idCustomerRetention: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerRet> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerRet(idCustomerRetention, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este CUSTOMERRETENTION");
//         const customerRetFound = await getCustomerRetByIdData(idCustomerRetention);
//         if (!customerRetFound) return { code: 404, message: "CUSTOMERRETENTION no encontrado" };
//         return { code: 200, result: customerRetFound };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA ACTUALIZAR UN CUSTOMERRETENTION PERTENECIENTE AL USER O COMPANY
// export const putSalesFunnelCustomerRetService = async (idCustomerRetention: string, body: ISalesFunnelCustomerRet, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerRet> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerRet(idCustomerRetention, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este CUSTOMERRETENTION");
//         const updateSalesFunnelCustomerRet = await putSalesFunnelCustomerRetData(idCustomerRetention, body);
//         if (!updateSalesFunnelCustomerRet) throw new ServiceError(404, 'CUSTOMERRETENTION no encontrado');
//         return { code: 200, message: 'CUSTOMERRETENTION Actualizado exitosamente', result: updateSalesFunnelCustomerRet };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };





// //Chequea si el CUSTOMERRETENTION pertenece al User o Company
// const checkPermissionForCustomerRet = async (idCustomerAcquisition: string, userId: string, userType: string): Promise<boolean> => {
//     try {
//         const rawMaterial = await getCustomerRetByIdData(idCustomerAcquisition);
//         if (!rawMaterial) return false;
//         if (userType === 'User' && rawMaterial.userId !== userId) return false; 
//         if (userType === 'Company' && rawMaterial.companyId !== userId) return false;
//         return true;
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICIO PARA ELIMINAR UN REGISTRO DEL CUSTOMERRETENTION PERTENECIENTE AL USER O COMPANY
// export const deleteSalesFunnelCustomerRetService = async (idCustomerRetention: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerRet> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerRet(idCustomerRetention, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro del CUSTOMERRETENTION");
//         await deleteSalesFunnelCustomerRetData(idCustomerRetention);
//         return { code: 200, message: 'Registro del CUSTOMERRETENTION eliminado exitosamente' };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };










// //^ SALESFUNNELCUSTOMERDIGITAL
// //SERVICE PARA CREAR UN CUSTOMERDIGITAL EN LA SEDE DE USER O COMPANY
// export const postSalesFunnelCustomerDigitalService = async (body: ISalesFunnelSalesDigital, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerDigital> => {
//     try {
//         if (userType === 'User') {
//             const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(userId, body.branchId);
//             if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERDIGITAL de esta sede");
//         }
//         if (userType === 'Company') {
//             const isBranchAssociatedWithCompany: any = await isBranchAssociatedWithCompanyRole(userId, body.branchId);
//             if (!isBranchAssociatedWithCompany) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERDIGITAL de esta sede");
//         }
//         const dataLayerResponse = await postSalesFunnelSalesDigitalData(body, userId, userType);
//         if (!dataLayerResponse) throw new ServiceError(400, "CUSTOMERDIGITAL ya existe");
//         return { code: 201, result: dataLayerResponse };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER TODOS LOS CUSTOMERDIGITAL DE UN USER O COMPANY
// export const getSalesFunnelCustomerDigitalUserService = async (userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerDigital> => {
//     try {
//         let dataLayerResponse;
//         if (userType === 'User') {
//             dataLayerResponse = await getSalesFunnelSalesDigitalUserIdData(userId);
//         } else if (userType === 'Company') {
//             dataLayerResponse = await getSalesFunnelSalesDigitalCompanyIdData(userId);
//         }
//         return { code: 200, result: dataLayerResponse };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERDIGITAL DE UN USER O COMPANY
// export const getCustomerDigitalBranchService = async (idBranch: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerDigital> => {
//     try {
//         const hasPermission = await checkPermissionForBranchCustomerDigital(idBranch, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los CUSTOMERDIGITAL de esta sede");
//         const customerDigitalFound = await getCustomerDigitalBranchByIdData(idBranch);
//         if (!customerDigitalFound) return { code: 404, message: "CUSTOMERDIGITAL no encontrado en esta sede" };
//         return { code: 200, result: customerDigitalFound };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };

// //Chequea si las sedes pertenecen a User o Company, por eso usamos el "for", para iterar cada sede y obtener los CUSTOMERDIGITAL de cada una
// const checkPermissionForBranchCustomerDigital = async (idBranch: string, userId: string, userType: string): Promise<boolean> => {
//     try {
//         const customerDigitals = await getCustomerDigitalBranchByIdData(idBranch);
//         if (!customerDigitals) return false;
//         for (const customerDigital of customerDigitals) {
//             if ((userType === 'User' && customerDigital.userId !== userId) ||
//                 (userType === 'Company' && customerDigital.companyId !== userId)) {
//                 return false;
//             }
//         }
//         return true;
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA OBTENER UN CUSTOMERDIGITAL POR ID PERTENECIENTE AL USER O COMPANY
// export const getCustomerDigitalService = async (idCustomerDigital: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerDigital> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerDigital(idCustomerDigital, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este CUSTOMERDIGITAL");
//         const customerDigitalFound = await getCustomerDigitalByIdData(idCustomerDigital);
//         if (!customerDigitalFound) return { code: 404, message: "CUSTOMERDIGITAL no encontrado" };
//         return { code: 200, result: customerDigitalFound };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA ACTUALIZAR UN CUSTOMERDIGITAL PERTENECIENTE AL USER O COMPANY
// export const putSalesFunnelCustomerDigitalService = async (idCustomerDigital: string, body: ISalesFunnelSalesDigital, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerDigital> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerDigital(idCustomerDigital, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este CUSTOMERDIGITAL");
//         const updateSalesFunnelCustomerDigital = await putSalesFunnelSalesDigitalData(idCustomerDigital, body);
//         if (!updateSalesFunnelCustomerDigital) throw new ServiceError(404, 'CUSTOMERDIGITAL no encontrado');
//         return { code: 200, message: 'CUSTOMERDIGITAL Actualizado exitosamente', result: updateSalesFunnelCustomerDigital };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //Chequea si el CUSTOMERDIGITAL pertenece al User o Company
// const checkPermissionForCustomerDigital = async (idCustomerDigital: string, userId: string, userType: string): Promise<boolean> => {
//     try {
//         const customerDigital = await getCustomerDigitalByIdData(idCustomerDigital);
//         if (!customerDigital) return false;
//         if (userType === 'User' && customerDigital.userId !== userId) return false; 
//         if (userType === 'Company' && customerDigital.companyId !== userId) return false;
//         return true;
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };



// //SERVICE PARA ELIMINAR UN REGISTRO DEL CUSTOMERDIGITAL PERTENECIENTE AL USER O COMPANY
// export const deleteSalesFunnelCustomerDigitalService = async (idCustomerDigital: string, userId: string, userType: string): Promise<ServiceLayerResponseSalesFunnelCustomerDigital> => {
//     try {
//         const hasPermission = await checkPermissionForCustomerDigital(idCustomerDigital, userId, userType);
//         if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro del CUSTOMERDIGITAL");
//         await deleteSalesFunnelSalesDigitalData(idCustomerDigital);
//         return { code: 200, message: 'Registro del CUSTOMERDIGITAL eliminado exitosamente' };
//     } catch (error) {
//         if (error instanceof Error) {
//             const customErrorMessage = error.message;
//             throw new ServiceError(500, customErrorMessage, error);
//         } else {
//             throw error;
//         }
//     }
// };