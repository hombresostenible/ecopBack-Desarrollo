import { postContactUsData } from "../../data/Ecopcion/contactUs.data";
import { IContactUs } from "../../types/Ecopcion/contactUs.types";
import { IServiceLayerResponseContactUs } from '../../types/Ecopcion/responsesEcopcion.types';
import { ServiceError } from "../../types/Responses/responses.types";

//CREA REGISTRO DE CONTACTANOS
export const postContactUsService = async (body: IContactUs): Promise<IServiceLayerResponseContactUs> => {
    try {
        const dataLayerResponse = await postContactUsData(body);
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};