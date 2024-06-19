import express, { Request, Response } from "express";
import {
    getItemBarCodeService,
    getNameItemService,
} from '../../services/User/itemByBarCodeOrName.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//BUSCAR UN ITEM DE ASSETS, MERCHANDISE, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
router.get("/bar-code/:barCode", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { barCode } = req.params;
        const serviceLayerResponse = await getItemBarCodeService(id, barCode);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/item-by-barCode-or-name/bar-code/7702552000097



//BUSCA UN ARTICULO POR NOMBRE EN TODAS LAS TABLAS
router.get("/name-item/query?", authRequired, async (req: Request, res: Response) => {
    try {
        const nameItem = req.query.nameItem as string | undefined;
        if (!nameItem) {
            return res.status(400).json({ error: 'El parámetro nameItem es requerido.' });
        }
        const { id } = req.user;
        const serviceLayerResponse = await getNameItemService(nameItem, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/item-by-barCode-or-name/name-item/query?nameItem=Cabello de ángel



export default router;