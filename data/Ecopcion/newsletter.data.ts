import { Optional } from 'sequelize/types';
import Newsletter from '../../schema/Ecopcion/newsletter.schema';
import { INewsletter } from "../../types/Ecopcion/newsletter.types";
import { ServiceError } from '../../types/Responses/responses.types';
import {
    transporterZoho,
    mailSubscribeNewsletter,
} from '../../libs/nodemailer';

//DATA PARA CREAR LA SUSCRIPCION A NEWSLETTERS
export const postNewsletterData = async (body: INewsletter): Promise<any> => {
    try {
        const [newsletter, created] = await Newsletter.findOrCreate({
            where: { email: body.email }, // Busca un registro con la misma dirección de correo electrónico
            defaults: body as unknown as Optional<Record<string, unknown>, string> // Utiliza el tipo Optional para permitir propiedades opcionales en body
        });

        // Si el registro ya existía y se actualizó, puedes realizar alguna acción aquí si lo deseas
        const mailOptions = mailSubscribeNewsletter(body.email); // Ajusta tus opciones de correo electrónico según tus necesidades
        transporterZoho.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo de confirmación:', error);
                throw new ServiceError(500, "No se pudo enviar el correo de confirmación");
            } else {
                console.log(`Correo electrónico enviado: ${info.response}`);
            }
        });
        return newsletter;
    } catch (error) {
        throw error;
    }
};