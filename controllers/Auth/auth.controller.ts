import express, { Request, Response } from 'express';
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
  }
); //POST - http://localhost:3000/api/auth/login con { "email": "mario@gmail.com", "password": "password" }



//VERIFICA EL TOKEN PARA PERMITIR LA NAVEGACION EN RUTAS PROTEGIDAS
router.get("/verifyToken", async (req: Request, res: Response): Promise<void> => {
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
}); // GET - http://localhost:3000/api/auth/verifyToken



//INFORMACION DE PERFIL DEL USER
router.get("/profile", authRequired, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getProfileUserService(id);
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