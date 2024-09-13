import express, { Request, Response } from "express";
import {
    getItemBarCodeService,
    getNameItemService,
    getAllItemsByBranchService,
} from '../../services/User/allItems.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//BUSCA TODOS LOS ARTICULOS DEL USUARIO EN TODAS LAS TABLAS
router.get("/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAllItemsByBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/all-items



//BUSCAR UN ITEM DE ASSETS, MERCHANDISE, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
router.get("/bar-code/:barCode", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { barCode } = req.params;
        const serviceLayerResponse = await getItemBarCodeService(userId, barCode);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/all-items/bar-code/7702552000097



//BUSCA UN ARTICULO POR NOMBRE EN TODAS LAS TABLAS
router.get("/name-item/query?", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const nameItem = req.query.nameItem as string;
        if (!nameItem) {
            return res.status(400).json({ error: 'El parámetro nameItem es requerido.' });
        }
        const serviceLayerResponse = await getNameItemService(nameItem, userId);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/all-items/name-item/query?nameItem=Cabello de ángel



export default router;