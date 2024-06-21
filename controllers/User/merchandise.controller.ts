import express, { Request, Response } from "express";
import {
    postMerchandiseService,
    postManyMerchandiseService,
    getMerchandiseUserService,
    getMerchandiseBranchService,
    getMerchandiseService,
    putMerchandiseService,
    putUpdateManyMerchandiseService,
    patchMerchandiseService,
    patchAddInventoryMerchandiseService,
    deleteMerchandiseService,
} from "../../services/User/merchandise.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { merchandiseSchemaZod, manyMerchandiseSchemaZod } from '../../validations/User/merchandise.zod';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//CREAR UNA MERCANCIA POR SEDE PARA USER
router.post("/", authRequired, checkRole, validateSchema(merchandiseSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postMerchandiseService(body, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/merchandise con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Arroz Roa VENDEDOR", "barCode": null, "inventory": 5000, "unitMeasure": "Kilogramo", "inventoryIncrease": "Si", "periodicityAutomaticIncrease": "Diario", "automaticInventoryIncrease": 150, "purchasePriceBeforeTax": 1750, "IVA": 0, "sellingPrice": 2100, "packaged": "Si", "primaryPackageType": "Papel", "expirationDate": "2024-06-01T14:50:46.288Z" }



//CREAR MUCHAS MERCANCIAS POR SEDE PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyMerchandiseSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postManyMerchandiseService(bodyArray, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/merchandise/create-many con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Arroz Supremo","barCode":null,"inventory":5000,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":150,"purchasePriceBeforeTax":1750,"IVA":0,"sellingPrice":2100,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z"},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Arroz Roa","barCode":null,"inventory":5000,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":150,"purchasePriceBeforeTax":1750,"IVA":0,"sellingPrice":2100,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z"}]



//OBTENER TODA LA MERCANCIA DEL USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
      const { id } = req.user;
      const serviceLayerResponse = await getMerchandiseUserService(id);      
      if (Array.isArray(serviceLayerResponse.result)) {
        res.status(200).json(serviceLayerResponse.result);
      } else {
        res.status(500).json({ message: "Error al obtener las mercancía del usuario" });
      }
    } catch (error) {
      const errorController = error as ServiceError;
      res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/merchandise



//OBTENER UNA MERCANCIA POR ID PERTENECIENTE AL USER
router.get("/:idMerchandise", authRequired, async (req: Request, res: Response) => {
    try {
        const { idMerchandise } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getMerchandiseService(idMerchandise, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/merchandise/:idMerchandise



//OBTENER TODA LA MERCANCIA DE UNA SEDE PARA USER
router.get("/merchandises-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getMerchandiseBranchService(idBranch, id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener toda la mercancía del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/merchandise/merchandises-branch/:idBranch



//ACTUALIZAR UNA MERCANCIA PERTENECIENTE AL USER
router.put("/:idMerchandise", authRequired, checkRole, validateSchema(merchandiseSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idMerchandise } = req.params;
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await putMerchandiseService(idMerchandise, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/merchandise/:idMerchandise con { "branchId": "c1826ff6-b9aa-46c5-bce8-365157d64be1", "nameItem": "Arroz Roa", "packaged": "Si", // "salesCount": 10, "primaryPackageType": "Papel" }



//ACTUALIZAR DE FORMA MASIVA VARIAS MERCANCIAS
router.put("/updateMany", authRequired, checkRoleArray, validateSchema(manyMerchandiseSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await putUpdateManyMerchandiseService(bodyArray, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/merchandise/updateMany con [{"id":"58eb13ad-bc94-47bd-9f94-b368f0b4ce66","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Arroz Roa ACTUALIZADO","barCode":null,"inventory":5000,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":150,"purchasePriceBeforeTax":1750,"IVA":0,"sellingPrice":2100,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z"},{"id":"5d5e7171-b5ce-4246-b13d-916c04bf74e5","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Arroz Supremo ACTUALIZADO","barCode":null,"inventory":5000,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":150,"purchasePriceBeforeTax":1750,"IVA":0,"sellingPrice":2100,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z"}]



//DAR DE BAJA UNA MERCANCIA DEL USER
router.patch("/:idMerchandise", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idMerchandise } = req.params;
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await patchMerchandiseService(idMerchandise, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/merchandise/:idMerchandise con { "branchId": "82fc85e2-2672-4968-b07d-b7da442618f8", "assetStatus": "" }



//AUMENTA UNIDADES DEL INVENTARIO DE UNA MERCANCIA DEL USER
router.patch("/add-inventory/:idMerchandise", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idMerchandise } = req.params;
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await patchAddInventoryMerchandiseService(idMerchandise, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/merchandise/add-inventory/:idMerchandise con { "branchId": "82fc85e2-2672-4968-b07d-b7da442618f8", "inventory": 10 }



//ELIMINAR UNA MERCANCIA PERTENECIENTE AL USER
router.delete('/:idMerchandise', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idMerchandise } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await deleteMerchandiseService(idMerchandise, id); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/merchandise/:idMerchandise



export default router;