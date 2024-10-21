import {
    //Data para CUSTOMERACQUISITION
    postSalesFunnelCustomerAcqData,
    getSalesFunnelCustomerAcqUserIdData,
    getCustomerAcqBranchByIdData,
    getCustomerAcqByIdData,
    putSalesFunnelCustomerAcqData,
    deleteSalesFunnelCustomerAcqData,


    //Data para CUSTOMERRETENTION
    postSalesFunnelCustomerRetData,
    getSalesFunnelCustomerRetUserIdData,
    getCustomerRetBranchByIdData,
    getCustomerRetByIdData,
    putSalesFunnelCustomerRetData,
    deleteSalesFunnelCustomerRetData,


    //Data para CUSTOMERDIGITAL
    postSalesFunnelSalesDigitalData,
    getSalesFunnelSalesDigitalUserIdData,
    getCustomerDigitalBranchByIdData,
    getCustomerDigitalByIdData,
    putSalesFunnelSalesDigitalData,
    deleteSalesFunnelSalesDigitalData
} from '../../../data/User/Indicators/marketingIndicators.data';
import { isBranchAssociatedWithUserRole } from '../../../helpers/Branch.helper';
import { ISalesFunnelCustomerAcq, ISalesFunnelCustomerRet, ISalesFunnelSalesDigital } from '../../../types/User/salesFunnel.types';
import { ServiceError, IServiceLayerResponseSalesFunnelCustomerAcq, IServiceLayerResponseSalesFunnelCustomerRet, IServiceLayerResponseSalesFunnelCustomerDigital } from '../../../types/Responses/responses.types';

//^ SALESFUNNELCUSTOMERACQUISITION
//SERVICE PARA CREAR UN CUSTOMERACQUISITION EN LA SEDE DE USER
export const postSalesFunnelCustomerAcqService = async (body: ISalesFunnelCustomerAcq, userId: string, typeRole: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERACQUISITION de esta sede");
        const dataLayerResponse = await postSalesFunnelCustomerAcqData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "CUSTOMERACQUISITION ya existe");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS CUSTOMERACQUISITION DE UN USER
export const getSalesFunnelCustomerAcqUserService = async (userId: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const dataLayerResponse = await getSalesFunnelCustomerAcqUserIdData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERACQUISITION DE UN USER
export const getCustomerAcqBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const hasPermission = await checkPermissionForBranchCustomerAcq(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los CUSTOMERACQUISITION de esta sede");
        const customerAcquisitionFound = await getCustomerAcqBranchByIdData(idBranch);
        if (!customerAcquisitionFound) return { code: 404, message: "CUSTOMERACQUISITION no encontrado en esta sede" };
        return { code: 200, result: customerAcquisitionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};

//Chequea si las sedes pertenecen a User, por eso usamos el "for", para iterar cada sede y obtener los CustomerAcquisition de cada una
const checkPermissionForBranchCustomerAcq = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const customerAcquisitions = await getCustomerAcqBranchByIdData(idBranch);
        if (!customerAcquisitions) return false;
        for (const customerAcquisition of customerAcquisitions) {
            if (customerAcquisition.userId !== userId) return false;
        }
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER
export const getCustomerAcqService = async (userId: string, idCustomerAcquisition: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const hasPermission = await checkPermissionForCustomerAcq(userId, idCustomerAcquisition);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este CUSTOMERACQUISITION");
        const customerAcqFound = await getCustomerAcqByIdData(idCustomerAcquisition);
        if (!customerAcqFound) return { code: 404, message: "CUSTOMERACQUISITION no encontrado" };
        return { code: 200, result: customerAcqFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ACTUALIZAR UN CUSTOMERACQUISITION PERTENECIENTE AL USER
export const putSalesFunnelCustomerAcqService = async (body: ISalesFunnelCustomerAcq, userId: string, idCustomerAcquisition: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const hasPermission = await checkPermissionForCustomerAcq(userId, idCustomerAcquisition);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este CUSTOMERACQUISITION");
        const updateSalesFunnelCustomerAcq = await putSalesFunnelCustomerAcqData(idCustomerAcquisition, body);
        if (!updateSalesFunnelCustomerAcq) throw new ServiceError(404, 'CUSTOMERACQUISITION no encontrado');
        return { code: 200, message: 'CUSTOMERACQUISITION Actualizado exitosamente', result: updateSalesFunnelCustomerAcq };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};

//Chequea si el CUSTOMERACQUISITION pertenece al User
const checkPermissionForCustomerAcq = async (userId: string, idCustomerAcquisition: string): Promise<boolean> => {
    try {
        const customerAcq = await getCustomerAcqByIdData(idCustomerAcquisition);
        if (!customerAcq) return false;
        if (customerAcq.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ELIMINAR UN REGISTRO DEL CUSTOMERACQUISITION PERTENECIENTE AL USER
export const deleteSalesFunnelCustomerAcqService = async (userId: string, idCustomerAcquisition: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const hasPermission = await checkPermissionForCustomerAcq(userId, idCustomerAcquisition);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro del CUSTOMERACQUISITION");
        await deleteSalesFunnelCustomerAcqData(idCustomerAcquisition);
        return { code: 200, message: 'Registro del CUSTOMERACQUISITION eliminado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};










//^ SALESFUNNELCUSTOMERRETENTION
//SERVICE PARA CREAR UN CUSTOMERRETENTION EN LA SEDE DE USER
export const postSalesFunnelCustomerRetService = async (body: ISalesFunnelCustomerRet, userId: string, typeRole: string): Promise<IServiceLayerResponseSalesFunnelCustomerRet> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERRETENTION de esta sede");
        const dataLayerResponse = await postSalesFunnelCustomerRetData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "CUSTOMERRETENTION ya existe");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS CUSTOMERRETENTION DE UN USER
export const getSalesFunnelCustomerRetUserService = async (userId: string): Promise<IServiceLayerResponseSalesFunnelCustomerRet> => {
    try {
        const dataLayerResponse = await getSalesFunnelCustomerRetUserIdData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERRETENTION DE UN USER
export const getCustomerRetBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseSalesFunnelCustomerAcq> => {
    try {
        const hasPermission = await checkPermissionForBranchCustomerRet(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los CUSTOMERRETENTION de esta sede");
        const customerRetentiontionFound = await getCustomerRetBranchByIdData(idBranch);
        if (!customerRetentiontionFound) return { code: 404, message: "CUSTOMERRETENTION no encontrado en esta sede" };
        return { code: 200, result: customerRetentiontionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};

//Chequea si las sedes pertenecen a User, por eso usamos el "for", para iterar cada sede y obtener los CUSTOMERRETENTION de cada una
const checkPermissionForBranchCustomerRet = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const customerRetentions = await getCustomerRetBranchByIdData(idBranch);
        if (!customerRetentions) return false;
        for (const customerRetention of customerRetentions) {
            if (customerRetention.userId !== userId) return false;
        }
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER UN CUSTOMERRETENTION POR ID PERTENECIENTE AL USER
export const getCustomerRetService = async (userId: string, idCustomerRetention: string): Promise<IServiceLayerResponseSalesFunnelCustomerRet> => {
    try {
        const hasPermission = await checkPermissionForCustomerRet(userId, idCustomerRetention);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este CUSTOMERRETENTION");
        const customerRetFound = await getCustomerRetByIdData(idCustomerRetention);
        if (!customerRetFound) return { code: 404, message: "CUSTOMERRETENTION no encontrado" };
        return { code: 200, result: customerRetFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ACTUALIZAR UN CUSTOMERRETENTION PERTENECIENTE AL USER
export const putSalesFunnelCustomerRetService = async (body: ISalesFunnelCustomerRet, userId: string, idCustomerRetention: string): Promise<IServiceLayerResponseSalesFunnelCustomerRet> => {
    try {
        const hasPermission = await checkPermissionForCustomerRet(userId, idCustomerRetention);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este CUSTOMERRETENTION");
        const updateSalesFunnelCustomerRet = await putSalesFunnelCustomerRetData(idCustomerRetention, body);
        if (!updateSalesFunnelCustomerRet) throw new ServiceError(404, 'CUSTOMERRETENTION no encontrado');
        return { code: 200, message: 'CUSTOMERRETENTION Actualizado exitosamente', result: updateSalesFunnelCustomerRet };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};





//Chequea si el CUSTOMERRETENTION pertenece al User
const checkPermissionForCustomerRet = async (userId: string, idCustomerAcquisition: string): Promise<boolean> => {
    try {
        const rawMaterial = await getCustomerRetByIdData(idCustomerAcquisition);
        if (!rawMaterial) return false;
        if (rawMaterial.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICIO PARA ELIMINAR UN REGISTRO DEL CUSTOMERRETENTION PERTENECIENTE AL USER
export const deleteSalesFunnelCustomerRetService = async (userId: string, idCustomerRetention: string): Promise<IServiceLayerResponseSalesFunnelCustomerRet> => {
    try {
        const hasPermission = await checkPermissionForCustomerRet(userId, idCustomerRetention);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro del CUSTOMERRETENTION");
        await deleteSalesFunnelCustomerRetData(idCustomerRetention);
        return { code: 200, message: 'Registro del CUSTOMERRETENTION eliminado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};










//^ SALESFUNNELCUSTOMERDIGITAL
//SERVICE PARA CREAR UN CUSTOMERDIGITAL EN LA SEDE DE USER
export const postSalesFunnelCustomerDigitalService = async (body: ISalesFunnelSalesDigital, userId: string, typeRole: string): Promise<IServiceLayerResponseSalesFunnelCustomerDigital> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en CUSTOMERDIGITAL de esta sede");
        const dataLayerResponse = await postSalesFunnelSalesDigitalData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "CUSTOMERDIGITAL ya existe");
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS CUSTOMERDIGITAL DE UN USER
export const getSalesFunnelCustomerDigitalUserService = async (userId: string): Promise<IServiceLayerResponseSalesFunnelCustomerDigital> => {
    try {
        const dataLayerResponse = await getSalesFunnelSalesDigitalUserIdData(userId);
        return { code: 200, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERDIGITAL DE UN USER
export const getCustomerDigitalBranchService = async (userId: string, idBranch: string): Promise<IServiceLayerResponseSalesFunnelCustomerDigital> => {
    try {
        const hasPermission = await checkPermissionForBranchCustomerDigital(userId, idBranch);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a los CUSTOMERDIGITAL de esta sede");
        const customerDigitalFound = await getCustomerDigitalBranchByIdData(idBranch);
        if (!customerDigitalFound) return { code: 404, message: "CUSTOMERDIGITAL no encontrado en esta sede" };
        return { code: 200, result: customerDigitalFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};

//Chequea si las sedes pertenecen a User, por eso usamos el "for", para iterar cada sede y obtener los CUSTOMERDIGITAL de cada una
const checkPermissionForBranchCustomerDigital = async (userId: string, idBranch: string): Promise<boolean> => {
    try {
        const customerDigitals = await getCustomerDigitalBranchByIdData(idBranch);
        if (!customerDigitals) return false;
        for (const customerDigital of customerDigitals) {
            if (customerDigital.userId !== userId) return false;
        }
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER UN CUSTOMERDIGITAL POR ID PERTENECIENTE AL USER
export const getCustomerDigitalService = async (userId: string, idCustomerDigital: string): Promise<IServiceLayerResponseSalesFunnelCustomerDigital> => {
    try {
        const hasPermission = await checkPermissionForCustomerDigital(userId, idCustomerDigital);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para acceder a este CUSTOMERDIGITAL");
        const customerDigitalFound = await getCustomerDigitalByIdData(idCustomerDigital);
        if (!customerDigitalFound) return { code: 404, message: "CUSTOMERDIGITAL no encontrado" };
        return { code: 200, result: customerDigitalFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ACTUALIZAR UN CUSTOMERDIGITAL PERTENECIENTE AL USER
export const putSalesFunnelCustomerDigitalService = async (body: ISalesFunnelSalesDigital, userId: string, idCustomerDigital: string): Promise<IServiceLayerResponseSalesFunnelCustomerDigital> => {
    try {
        const hasPermission = await checkPermissionForCustomerDigital(userId, idCustomerDigital);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para actualizar este CUSTOMERDIGITAL");
        const updateSalesFunnelCustomerDigital = await putSalesFunnelSalesDigitalData(idCustomerDigital, body);
        if (!updateSalesFunnelCustomerDigital) throw new ServiceError(404, 'CUSTOMERDIGITAL no encontrado');
        return { code: 200, message: 'CUSTOMERDIGITAL Actualizado exitosamente', result: updateSalesFunnelCustomerDigital };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//Chequea si el CUSTOMERDIGITAL pertenece al User
const checkPermissionForCustomerDigital = async (userId: string, idCustomerDigital: string): Promise<boolean> => {
    try {
        const customerDigital = await getCustomerDigitalByIdData(idCustomerDigital);
        if (!customerDigital) return false;
        if (customerDigital.userId !== userId) return false;
        return true;
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ELIMINAR UN REGISTRO DEL CUSTOMERDIGITAL PERTENECIENTE AL USER
export const deleteSalesFunnelCustomerDigitalService = async (userId: string, idCustomerDigital: string): Promise<IServiceLayerResponseSalesFunnelCustomerDigital> => {
    try {
        const hasPermission = await checkPermissionForCustomerDigital(idCustomerDigital, userId);
        if (!hasPermission) throw new ServiceError(403, "No tienes permiso para eliminar este registro del CUSTOMERDIGITAL");
        await deleteSalesFunnelSalesDigitalData(idCustomerDigital);
        return { code: 200, message: 'Registro del CUSTOMERDIGITAL eliminado exitosamente' };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};