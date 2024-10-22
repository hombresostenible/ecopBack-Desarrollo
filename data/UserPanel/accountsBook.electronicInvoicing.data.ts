import { IElectronicInvoicing } from "../../types/UserPanel/electronicInvoicing.types";


export const electronicInvoicing = async (body: IElectronicInvoicing): Promise<any> => {
    try {
        /*
            MODIFICAR LOS MODELOS DE PRODUCTOS, SERVICIOS, MERCANCIAS Y ACTIVOS, PORQUE L CLIENTE PARA INCLUIR
        */
        if (body) {
            console.log(body)
        }
    } catch (error) {
        throw error;
    }
}