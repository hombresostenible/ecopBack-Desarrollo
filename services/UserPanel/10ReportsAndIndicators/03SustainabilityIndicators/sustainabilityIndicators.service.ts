import {
    postSustainabilityData,
    getSustainabilitiesByUserIdData,
    getSustainabilityBranchByIdData,
    getEnergyConsumptionData,
    getSustainabilityByIdData,
    getEnergyConsumptionBranchData,
    getWaterConsumptionData,
    getWaterConsumptionBranchData,    
    putSustainabilityData,
    deleteSustainabilityData,
} from "../../../../data/UserPanel/10ReportsAndIndicators/03SustainabilityIndicators/sustainabilityIndicators.data";
import { isBranchAssociatedWithUserRole } from '../../../../helpers/Branch.helper';
import { ISustainability } from '../../../../types/UserPanel/09Sustainability/sustainability.types';
import { ServiceError, IServiceLayerResponseSustainabilityIndicators, IServiceLayerResponseSustainability, IServiceLayerResponseVerifySustainabilityIndicators } from '../../../../types/Responses/responses.types';

//SERVICE PARA CREAR REGISTROS DE SOSTENIBILIDAD
export const postSustainabilityService = async (body: ISustainability, userId: string, typeRole: string): Promise<IServiceLayerResponseSustainability> => {
    try {
        const isBranchAssociatedWithUser: any = await isBranchAssociatedWithUserRole(body.branchId, userId, typeRole);
        if (!isBranchAssociatedWithUser) throw new ServiceError(403, "El usuario no tiene permiso para registrar en esta sede");
        const dataLayerResponse = await postSustainabilityData(body, userId);
        if (!dataLayerResponse) throw new ServiceError(400, "No se puede registrar");
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



//SERVICE PARA OBTENER TODOS LOS REGISTROS DE SOSTENIBILIDAD DE UN USER
export const getSustainabilityUserService = async (userId: string): Promise<IServiceLayerResponseSustainability> => {
    try {
        const dataLayerResponse = await getSustainabilitiesByUserIdData(userId);
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



//SERVICE PARA OBTENER TODOS LOS REGISTROS DE SOSTENIBILIDAD POR SEDE DE UN USER
export const getSustainabilityBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseSustainability> => {
    try {
        const sustainabilitysFound = await getSustainabilityBranchByIdData(idBranch);
        if (!sustainabilitysFound) return { code: 404, message: "Registros de sostenibilidad no encontrados en esta sede" };
        return { code: 200, result: sustainabilitysFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getEnergyConsumptionService = async (userId: string): Promise<IServiceLayerResponseSustainabilityIndicators> => {
    try {
        const energyConsumptionFound = await getEnergyConsumptionData(userId);
        if (!energyConsumptionFound) throw new ServiceError(403, "No hay servicios de energía del usuario");
        return { code: 200, result: energyConsumptionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//
export const getSustainabilityByIdService = async (idSustainability: string, userId: string): Promise<IServiceLayerResponseVerifySustainabilityIndicators> => {
    try {
        const dataLayerResponse = await getSustainabilityByIdData(idSustainability, userId);
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



//SERVICE PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA POR SEDE DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getEnergyConsumptionBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseSustainabilityIndicators> => {
    try {
        const energyConsumptionFound = await getEnergyConsumptionBranchData(idBranch, userId);
        if (!energyConsumptionFound) throw new ServiceError(403, "No hay servicios de energía por sede del usuario");
        return { code: 200, result: energyConsumptionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS SERVICIOS DE AGUA DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getWaterConsumptionService = async (userId: string): Promise<IServiceLayerResponseSustainabilityIndicators> => {
    try {
        const waterConsumptionFound = await getWaterConsumptionData(userId);
        if (!waterConsumptionFound) throw new ServiceError(403, "No hay servicios de agua del usuario");
        return { code: 200, result: waterConsumptionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA OBTENER TODOS LOS SERVICIOS DE AGUA POR SEDE DEL USER DE LA TABLA ACCOUNTSBOOK SCHEMA
export const getWaterConsumptionBranchService = async (idBranch: string, userId: string): Promise<IServiceLayerResponseSustainabilityIndicators> => {
    try {
        const energyConsumptionFound = await getWaterConsumptionBranchData(idBranch, userId);
        if (!energyConsumptionFound) throw new ServiceError(403, "No hay servicios de agua por sede del usuario");
        return { code: 200, result: energyConsumptionFound };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ACTUALIZAR UN REGISTRO DE SOSTENIBILIDAD DEL USER
export const putSustainabilityService = async (body: ISustainability, userId: string, idSustainability: string): Promise<IServiceLayerResponseSustainability> => {
    try {
        const updateSustainability = await putSustainabilityData(body, userId, idSustainability);
        if (!updateSustainability) throw new ServiceError(404, "Registro de sostenibilidad no encontrado");
        return { code: 200, message: "Registro de sostenibilidad actualizado exitosamente", result: updateSustainability };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};



//SERVICE PARA ELIMINAR UN REGISTRO DE SOSTENIBILIDAD PERTENECIENTE AL USER
export const deleteSustainabilityService = async (userId: string, idSustainability: string): Promise<IServiceLayerResponseSustainability> => {
    try {
        await deleteSustainabilityData(userId, idSustainability);
        return { code: 200, message: "Registro de sostenibilidad eliminado exitosamente" };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else {
            throw error;
        }
    }
};