import express, { Request, Response } from 'express';
import axios from 'axios';
import {
    loginService,
    verifyUserTokenService,
    getProfileUserService,
} from '../../services/Auth/auth.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { loginSchema } from '../../validations/Auth/login.zod';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//LOGIN DE USUARIOS
router.post("/login", validateSchema(loginSchema), async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await loginService(email, password);
        if (!user) {
            res.status(400).json({ message: "Usuario no encontrado" });
            return;
        }
        if (user.result) {
            const { serResult, token } = user.result;
            res.cookie("token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                // maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            });
            res.json({ serResult, token });
        } else res.status(user.code).json({ message: user.message });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/auth/login con { "email": "mario@gmail.com", "password": "password" }



// VALIDA EL reCAPTCHA
router.post('/validate-recaptcha', async (req, res) => {
    const recaptchaToken = req.body.recaptchaToken;
    if (!recaptchaToken) return res.status(400).json({ success: false, message: 'Token de reCAPTCHA es requerido' });
    const secretKey = process.env.reCAPTCHA_KEY;
    const endpoint = process.env.reCAPTCHA_ENDPOINT_GOOGLE;
    const url = `${endpoint}?secret=${secretKey}&response=${recaptchaToken}`;
    try {
        const response = await axios.post(url);
        const data = response.data;
        if (data.success) {
            return res.status(200).json({ success: true, message: 'Validación exitosa' });
        } else return res.status(400).json({ success: false, message: 'Validación fallida, reCAPTCHA inválido' });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/auth/validate-recaptcha



//VERIFICA EL TOKEN PARA PERMITIR LA NAVEGACION EN RUTAS PROTEGIDAS
router.get("/verify-token", async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.cookies;
        const user = await verifyUserTokenService(token);  
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        };
        res.status(200).json(user);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/auth/verify-token



//INFORMACION DE PERFIL DEL USER
router.get("/profile", authRequired, async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getProfileUserService(userId);
        if (!serviceLayerResponse) {
            res.status(401).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/auth/profile


export default router;