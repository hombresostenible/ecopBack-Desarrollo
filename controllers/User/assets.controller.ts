import express, { Request, Response } from "express";
import {
    postAssetService,
    postManyAssetService,
    getAssetsService,
    getAssetsOffService,
    getAssetsOffByBranchService,
    getAssetByIdService,
    getAssetBranchService,
    putAssetService,
    putUpdateManyAssetService,
    patchAssetService,
    patchAddInventoryAssetService,
    deleteAssetService,
} from '../../services/User/assets.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { assetsSchemaZod, manyAssetsSchemaZod } from '../../validations/User/assets.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CREAR UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER
router.post("/", authRequired, checkRole, validateSchema(assetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postAssetService(body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/asset con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Bicicleta", "barCode": null, "inventory": 1, "brandItem": "Specialized", "referenceItem": "Modelo 2010", "conditionAssets": "Nuevo", "stateAssets": "Funciona correctamente", "assetStatus": "Activo en uso" }



//CREAR DE FORMA MASIVA UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyAssetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await postManyAssetService(bodyArray, userId, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/asset/create-many con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 515518787878ooioio","barCode":null,"inventory":1,"brandItem":"Specialized","referenceItem":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 989898opopopo9","barCode":null,"inventory":1,"brandItem":"Specialized","referenceItem":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"}]



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAssetsService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener las maquinas, equipos y herramientas del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/asset



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
router.get("/assets-off", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAssetsOffService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener las maquinas, equipos y herramientas dadas de baja del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/asset/assets-off



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
router.get("/assets-off/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAssetsOffByBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener las maquinas, equipos y herramientas dadas de baja del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/asset/assets-off/:idBranch



//OBTENER UN EQUIPO, HERRAMIENTA O MAQUINA POR ID PERTENECIENTE AL USER
router.get("/:idAssets", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAssets } = req.params;
        const serviceLayerResponse = await getAssetByIdService(idAssets, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/asset/:idAssets



//OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE PARA USER
router.get("/assets-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAssetBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener las maquinas, equipos y herramientas del usuario por sede" });
    } catch (error) {
        const rawMaterialError = error as ServiceError;
        res.status(rawMaterialError.code).json(rawMaterialError.message);
    }
}); //GET - http://localhost:3000/api/asset/assets-branch/:idBranch



//ACTUALIZAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
router.put("/:idAssets", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAssets } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putAssetService(idAssets, body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/asset/:idAssets con { "branchId": "13c403d6-23c0-42bf-a815-0949e43c3540", "nameAssets": "Tractor", "brandItem": "John Dere", "referenceItem": "Modelo 2010", "conditionAssets": "Usada/De segunda", "stateAssets": "Funciona correctamente" }



//ACTUALIZAR DE FORMA MASIVA VARIOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
router.put("/updateMany", authRequired, checkRoleArray, validateSchema(manyAssetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        // Llamar a la capa de servicio para manejar la creación de múltiples activos
        const serviceLayerResponse = await putUpdateManyAssetService(bodyArray, userId, typeRole);
        // Enviar una respuesta al cliente
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/asset/updateMany con [{"id":"6fd572e5-683f-4c6d-a421-dbb86f64d48a","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 515518787878ooioio ACTUALIZADA","barCode":null,"inventory":1,"brandItem":"Specialized","referenceItem":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"},{"id":"88667153-4fec-40d5-9ff9-e04cb0f1fee7","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 989898opopopo9 ACTUALIZADA","barCode":null,"inventory":1,"brandItem":"Specialized","referenceItem":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"}]



//DAR DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
router.patch("/:idAssets", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAssets } = req.params;
        const body = req.body;
        const serviceLayerResponse = await patchAssetService(idAssets, body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PATCH - http://localhost:3000/api/asset/:idAssets con { "branchId": "85284ef9-ab01-42a0-be6b-9c66823cdf73", "inventoryOff": { "date": "2024-06-20T13:47:22.000Z", "reason": "Desechado", "quantity": 1, "description": "Se dañó porque la dejé caer" } }



//AUMENTA UNIDADES DEL INVENTARIO DE UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
router.patch("/add-inventory/:idAssets", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAssets } = req.params;
        const body = req.body;
        const serviceLayerResponse = await patchAddInventoryAssetService(idAssets, body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/asset/add-inventory/:idAssets con { "branchId": "82fc85e2-2672-4968-b07d-b7da442618f8", "inventory": 10 }



//ELIMINAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
router.delete('/:idAssets', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAssets } = req.params;
        const serviceLayerResponse = await deleteAssetService(idAssets, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/asset/:idAssets

export default router;