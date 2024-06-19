import ContactUs from '../../schema/Ecopcion/contactUs.schema';
import { IContactUs } from "../../types/Ecopcion/contactUs.types";

//DATA PARA CREAR LA SUSCRIPCION A NEWSLETTERS
export const postContactUsData = async (body: IContactUs): Promise<any> => {
    try {
        const newNewsletterSubscription = new ContactUs({
            ...body,
        });
        await newNewsletterSubscription.save();
        return newNewsletterSubscription;
    } catch (error) {
        throw error;
    }
};