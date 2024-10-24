import express, { Request, Response } from "express";
import {
    postElectronicInvoicingService,
    getElectronicInvoicingService,
    getElectronicInvoicingByIdService,
} from "../../../services/UserPanel/05ElectronicInvoicing/electronicInvoicing.service";
import { authRequired } from "../../../middlewares/Token/Token.middleware";
import { ServiceError } from "../../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
router.post("/", authRequired, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { userId } = req.user;
        const serviceLayerResponse = await postElectronicInvoicingService(body, userId);

        // Asegúrate de que siempre haya un código de estado
        const statusCode = serviceLayerResponse.code || 500; // Por si alguna vez falla
        res.status(statusCode).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        const errorCode = errorController.code || 500; // Código de estado por defecto
        res.status(errorCode).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/electronic-invoicing con 



//CONTROLLER OBTENER TODAS LAS FACTURAS ELECTRÓNICAS
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const serviceLayerResponse = await getElectronicInvoicingService();
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
});



//CONTROLLER PARA OBTENER UNA FACTURA ELECTRONICA POR ID
router.get("/:idElectronicInvoicing", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idElectronicInvoicing } = req.params;
        const serviceLayerResponse = await getElectronicInvoicingByIdService(idElectronicInvoicing, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
});

export default router;