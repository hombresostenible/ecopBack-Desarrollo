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
export async function sendEmailFiles (emailProvider: string, from: string, applicationPassword: string, to: string, subject: string, text: string, attachments: UploadedFile | UploadedFile[]) {
    const transporterAOL: Transporter<any> = nodemailer.createTransport({
        host: 'smtp.aol.com',
        port: 587,
        secure: false,
        auth: {
            user: from,
            pass: applicationPassword,
        },
    });

    const transporterGmail: Transporter<any> = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: applicationPassword,
        }
    });

    const transporterOffice: Transporter<any> = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: from,
            pass: applicationPassword,
        },
    });
    
    const transporterYahoo: Transporter<any> = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false,
        auth: {
            user: from,
            pass: applicationPassword,
        },
    });

    const transporterZoho: Transporter<any> = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        auth: {
            user: from,
            pass: applicationPassword,
        },
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
        if (emailProvider === 'aol') {
            const info: SentMessageInfo = await transporterAOL.sendMail(mailOptions);
        }
        if (emailProvider === 'gmail') {
            const info: SentMessageInfo = await transporterGmail.sendMail(mailOptions);
        }
        if (emailProvider === 'hotmail' || emailProvider === 'outlook') {
            const info: SentMessageInfo = await transporterOffice.sendMail(mailOptions);
        }
        if (emailProvider === 'yahoo') {
            const info: SentMessageInfo = await transporterYahoo.sendMail(mailOptions);
        }
        if (emailProvider === 'zoho') {
            const info: SentMessageInfo = await transporterZoho.sendMail(mailOptions);
        }
        return true;
    } catch (error) {
        return false;
    }
};