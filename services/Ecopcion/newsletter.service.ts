import {  postNewsletterData } from "../../data/Ecopcion/newsletter.data";
import { INewsletter } from "../../types/Ecopcion/newsletter.types";
import { IServiceLayerResponseContactUs } from '../../types/Ecopcion/responsesEcopcion.types';
import { ServiceError } from '../../types/Responses/responses.types';

//SERVICE PARA CREAR LA SUSCRIPCION A NEWSLETTERS
export const postNewsletterService = async (body: INewsletter): Promise<IServiceLayerResponseContactUs> => {
    try {
        const dataLayerResponse = await postNewsletterData(body);
        return { code: 201, result: dataLayerResponse };
    } catch (error) {
        if (error instanceof Error) {
            const customErrorMessage = error.message;
            throw new ServiceError(500, customErrorMessage, error);
        } else throw error;
    }
};