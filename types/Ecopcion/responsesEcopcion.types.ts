import { IAppointment } from "./appointment.types";
import { IContactUs } from "./contactUs.types";
import { INewsletter } from "./newsletter.types";

//INTERFACE DE RESPUESTA GENERICA PARA APPOINTMEN
export interface IServiceLayerResponseAppointment {
    code: number,
    result?: IAppointment | IAppointment[],
    message?: string;
    errorMessage?: unknown,
};
//INTERFACE DE RESPUESTA GENERICA PARA CONTACTUS
export interface IServiceLayerResponseContactUs {
    code: number,
    result?: IContactUs | IContactUs[],
    message?: string;
    errorMessage?: unknown,
};
//INTERFACE DE RESPUESTA GENERICA PARA NEWSLETTER
export interface IServiceLayerResponseNewsletter {
    code: number,
    result?: INewsletter | INewsletter[],
    message?: string;
    errorMessage?: unknown,
};