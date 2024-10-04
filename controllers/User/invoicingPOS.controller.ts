import express, { Request, Response } from "express";
import {
    postElectronicInvoicingService,
    getElectronicInvoicingService,
    getElectronicInvoicingByIdService,
} from "../../services/User/electronicInvoicing.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//CONTROLLER PARA CREAR LA FACTURA ELECTRÓNICA
router.post("/", authRequired, async (req: Request, res: Response) => {
    try {
        // const { userId } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postElectronicInvoicingService(body);
        // const serviceLayerResponse = await postElectronicInvoicingService(body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/electronicInvoicing con 



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