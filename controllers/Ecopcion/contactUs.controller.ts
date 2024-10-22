import express, { Request, Response } from "express";
import { postContactUsService } from "../../services/Ecopcion/contactUs.service";
import { validateSchema } from "../../middlewares/Schema/Schema.middleware";
import { contactUsSchema } from '../../validations/Ecopcion/contactUs.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CREA REGISTRO DE CONTACTANOS
router.post("/", validateSchema(contactUsSchema), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postContactUsService(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST a http://localhost:3000/api/contact-us con { "email": "cmario.reyesp@gmail.com", "nameUser": "Carlos Reyes", "phone": "3128082002", "helpDescription": "Necesito ayuda para activar cuenta", "selectedTopic": "Indicadores", "isAceptedConditions": true }


export default router;