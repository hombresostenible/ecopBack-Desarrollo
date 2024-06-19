import nodemailer, { Transporter } from 'nodemailer';
import { UploadedFile } from 'express-fileupload';
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport';

// Definir el tipo Attachment
interface Attachment {
    filename: string;
    content: Buffer;
    encoding?: string;
    contentType?: string;
    cid?: string;
}

// Función para enviar correo electrónico con archivos adjuntos
export async function sendEmailFiles (from: string, applicationPassword: string, to: string, subject: string, text: string, attachments: UploadedFile | UploadedFile[]) {
    const transporterZoho: Transporter<any> = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: applicationPassword,
        }
    });

    // Convertir los archivos adjuntos a un formato compatible con nodemailer
    const convertedAttachments: Attachment[] = Array.isArray(attachments) ? 
        attachments.map(file => ({ filename: file.name, content: file.data })) :
        [{ filename: attachments.name, content: attachments.data }];

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        attachments: convertedAttachments
    };

    try {
        const info: SentMessageInfo = await transporterZoho.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', info.response);
        return true;
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return false;
    }
};