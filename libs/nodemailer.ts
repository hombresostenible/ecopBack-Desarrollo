import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL || 'default_email_address';
const NODEMON = process.env.NODEMON || 'default_nodemon_password';

// Configuración de "Transporter" para Gmail
export const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: NODEMON,
    },
});

// Configuración de "Transporter" para Zojo Mail
export const transporterZoho = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    auth: {
        user: EMAIL,
        pass: NODEMON,
    },
});


//EMAIL DE BIENVENIDA AL USER POR CREAR CUENTA
export const mailUserWelcome = (email: string, name: string) => {
    return {
        from: `Ecopción <${EMAIL}>`,
        to: email,
        subject: `¡Hola ${name}! Bienvenido a Ecopción App`,
        html: `
            <div style="background: #e9ecef; width: 100%; min-height: 900px;">
                <div style="background: #ffffff; margin: auto; width: 700px; height: 100%">
                    <div style="width: 100%; min-height: 670px;">
                        <div style="background: #718bd8; padding: 20px;">
                            <img style="width: 300px; margin: 0 auto; display: block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1698187390/images/uysjyavwsqtbvl0dpunj.png" />
                        </div>
                        <p style="margin: 20px 40px; font-size: 16px;">¡Hola ${name},</p>
                        <p style="margin: 20px 40px; font-size: 16px;">Te damos la bienvenida a Ecopcion App!</p>
                        <br/>
                        <p style="margin: 20px 40px; font-size: 16px;"><b>Nos encontramos muy felices de que desees hacer parte de nosotros.</b></p>
                        <p style="margin: 20px 40px; font-size: 16px; text-align: justify">Contamos con una amplia experiencia para el análisis de tu negocio donde aplicamos más de 40 indicadores para mejorar tu productividad y visualizar el impacto que genera tu actividad en el medio ambiente</p>
                        <div style="width: 450px; margin: auto; display: flex; align-items: center; justify-content: center;">
                            <img style="width: 450px; height: 252px; border-radius: 10px" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1703137838/images/qcrdb6apyg9pry62iwut.png" alt="Indicadores" />
                        </div>
                    </div>
                    
                    <div style="width: 100%; height: 80px; ">
                        <p style="margin: 30px 0 10px 0; font-size: 16px; color: #ffb703; font-weight: 600; text-align: center;">¡Entérate de todo!</p>
                        <div style="margin: auto; width: 200px; display: flex; align-items: center; justify-content: center;">
                            <a href="https://www.linkedin.com/company/ecopcion" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; " src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/hiytaro1ubfiitblrrgt.png" alt="Linkedin" />
                            </a>
                            <a href="https://instagram.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/wdfrfzxibpqslzmqmgas.png" alt="Instagram" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/npptyynt0ctschep9tfq.png" alt="Facebook" />
                            </a>
                            <a href="https://twitter.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/i8qu6plo4g3vptevasdj.png" alt="Twitter" />
                            </a>
                            <a href="https://web.whatsapp.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/lvfqkvqlyzedr0wozxxp.png" alt="Whatsapp" />
                            </a>
                        </div>
                    </div>
                    
                    <div style="width: 100%; height: 150px; ">
                        <p style="margin: 30px 0 0 0; font-size: 16px; font-weight: 600; text-align: center; color: #ffb703;">¿Necesitas ayuda?</p>
                        <div style="width: 700px; height: 90px; display: flex; align-items: center; justify-content: center;">                        
                            <div style="width: 350px; height: 90px; padding: 0 40px;">                            
                                <h3 style="text-align: center;">Email</h3>
                                <p style="text-align: center; text-decoration: none">fhernandez@ecopcion.com</p>
                            </div>
                            <div style="width: 350px; height: 90px; padding: 0 40px;">                            
                                <h3 style="text-align: center;">WhatsApp</h3>
                                <p style="text-align: center;">321 327 0365</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
    };
};



//EMAIL DE BLOQUEO DE CUENTA POR EXCESO DE ERRORES DE CONTRASEÑA DEL USER
export const mailAccountUserBlocked = (email: string, name: string, unlockCode: string, link: string) => {
    return {
        from: `Ecopción <${EMAIL}>`,
        to: email,
        subject: `Tu cuenta ha sido bloqueada`,
        html: `
            <div style="background: #e9ecef; width: 100%; min-height: 900px;">
                <div style="background: #ffffff; margin: auto; width: 700px; height: 100%">
                    <div style="width: 100%; min-height: 670px;">
                        <div style="background: #718bd8; padding: 20px;">
                            <img style="width: 300px; margin: 0 auto; display: block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1698187390/images/uysjyavwsqtbvl0dpunj.png" />
                        </div>
                        <p style="margin: 20px 40px; font-size: 16px;">¡Hola ${name},</p>
                        <p style="margin: 20px 40px; font-size: 16px;">Has bloqueado tu cuenta por exceso de ingresasos fallidos.</p>
                        <br/>
                        <p style="margin: 20px 40px; font-size: 16px;">Para desbloquear tu cuenta, ingresa al siguiente enlace y el pega el código de verificiación <span style="color: #718bd8;">${unlockCode}</span> para validar.</p>
                        <br/>
                        <a href=${link} style="margin: 20px 40px; font-size: 16px;"><b>LINK</b></a>
                    </div>                  

                    <div style="width: 100%; height: 80px; ">
                        <p style="margin: 30px 0 10px 0; font-size: 16px; color: #ffb703; font-weight: 600; text-align: center;">¡Entérate de todo!</p>
                        <div style="margin: auto; width: 200px; display: flex; align-items: center; justify-content: center;">
                            <a href="https://www.linkedin.com/company/ecopcion" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; " src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/hiytaro1ubfiitblrrgt.png" alt="Linkedin" />
                            </a>
                            <a href="https://instagram.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/wdfrfzxibpqslzmqmgas.png" alt="Instagram" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/npptyynt0ctschep9tfq.png" alt="Facebook" />
                            </a>
                            <a href="https://twitter.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/i8qu6plo4g3vptevasdj.png" alt="Twitter" />
                            </a>
                            <a href="https://web.whatsapp.com/" target="_blank" style="margin: 5px; height: 30px">
                                <img style="width: 30px; height: 30px; margin: 0 auto;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1704560207/images/lvfqkvqlyzedr0wozxxp.png" alt="Whatsapp" />
                            </a>
                        </div>
                    </div>

                    <div style="width: 100%; height: 150px; ">
                        <p style="margin: 30px 0 0 0; font-size: 16px; font-weight: 600; text-align: center; color: #ffb703;">¿Necesitas ayuda?</p>
                        <div style="width: 700px; height: 90px; display: flex; align-items: center; justify-content: center;">                        
                            <div style="width: 350px; height: 90px; padding: 0 40px;">                            
                                <h3 style="text-align: center;">Email</h3>
                                <p style="text-align: center; text-decoration: none">fhernandez@ecopcion.com</p>
                            </div>
                            <div style="width: 350px; height: 90px; padding: 0 40px;">                            
                                <h3 style="text-align: center;">WhatsApp</h3>
                                <p style="text-align: center;">321 327 0365</p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        `,
    };
};