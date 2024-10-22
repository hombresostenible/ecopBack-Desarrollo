import express, { Request, Response } from "express";
import { postNewsletterService } from "../../services/Ecopcion/newsletter.service";
import { validateSchema } from "../../middlewares/Schema/Schema.middleware";
import { newsletterSchema } from '../../validations/Ecopcion/newsletter.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR LA SUSCRIPCION A NEWSLETTERS
router.post("/", validateSchema(newsletterSchema), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postNewsletterService(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/newsletter con { "email": "cmario.reyesp@gmail.com" }


export default router;