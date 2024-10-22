import express, { Request, Response } from "express";
import {
    getMerchandisesService,
} from "../../services/User/merchandise.service";
import { authRequired } from "../../../../middlewares/Token/Token.middleware";
import { ServiceError } from "../../../../types/Responses/responses.types";
const router = express.Router();

//OBTENER TODA LA MERCANCIA DEL USER
router.get("/clients", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getMerchandisesService(userId);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener las mercancía del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/ecopcion/clients

export default router;