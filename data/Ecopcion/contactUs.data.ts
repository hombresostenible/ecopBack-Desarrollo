import sequelize from '../../db';
import ContactUs from '../../schema/Ecopcion/contactUs.schema';
import {
    transporterZoho,
    mailEcopcionContactUsClient,
    mailEcopcionContactUs,
} from '../../libs/nodemailer';
import { IContactUs } from "../../types/Ecopcion/contactUs.types";
import { ServiceError } from '../../types/Responses/responses.types';

//CREA REGISTRO DE CONTACTANOS
export const postContactUsData = async (body: IContactUs): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const nameToUse = body.nameUser;
        const userMailOptions = mailEcopcionContactUsClient(body.email, nameToUse || '');
        const mailEcopcionOptions = mailEcopcionContactUs(body);

        const newContactUs = new ContactUs({
            ...body,
        });
        await newContactUs.save();

        await transporterZoho.sendMail(userMailOptions);  
        console.log('Correo de notificación de cliente enviada con éxito');
        await transporterZoho.sendMail(mailEcopcionOptions);
        console.log('Notificación para funcionario de Ecopción enviado con éxito.');
        await t.commit();
        return newContactUs;
    } catch (error) {
        if (error instanceof Error) {
            throw new ServiceError(500, 'Error al procesar la solicitud de contacto', error);
        } else {
            throw new ServiceError(500, 'Error desconocido', error);
        }
    }
};