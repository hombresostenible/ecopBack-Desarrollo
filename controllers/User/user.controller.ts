import express, { Request, Response } from "express";
import {
    postRegisterUserService,
} from "../../services/User/user.services";
import { validateSchema } from '../../middlewares/Schema.middleware.js';
import { registerUserSchema } from '../../validations/user.zod';
import { ServiceError } from '../../types/responses.types';
const router = express.Router();

//REGISTRO DE UN USUARIO
router.post("/register", validateSchema(registerUserSchema), async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const user = await postRegisterUserService(body);
        if (user.result) {
            const { serResult, token } = user.result;
            res.cookie("token", token);
            res.json({ serResult, token });
        } else {
            res.status(user.code).json({ message: user.message });
        }        
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/user/register



export default router;