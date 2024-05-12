import express, { Request, Response } from "express";
import {
    postAssetService,
    postManyAssetService,
    getAssetsUserService,
    getAssetBranchService,
    getAssetService,
    putAssetService,
    putUpdateManyAssetService,
    patchAssetService,
    deleteAssetService,
} from '../../services/User/assets.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { assetsSchemaZod, manyAssetsSchemaZod } from '../../validations/User/assets.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER O COMPANY
router.post("/userAssets", authRequired, checkRole, validateSchema(assetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await postAssetService(body, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/assets/userAssets con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Bicicleta", "barCode": null, "inventory": 1, "brandAssets": "Specialized", "referenceAssets": "Modelo 2010", "conditionAssets": "Nuevo", "stateAssets": "Funciona correctamente", "assetStatus": "Activo en uso" }



//CONTROLLER PARA CREAR DE FORMA MASIVA UN EQUIPO, HERRAMIENTA O MAQUINA EN LA SEDE DE UN USER O COMPANY DESDE EL EXCEL
router.post("/userAssets/createMany", authRequired, checkRoleArray, validateSchema(manyAssetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        // Llamar a la capa de servicio para manejar la creación de múltiples activos
        const serviceLayerResponse = await postManyAssetService(bodyArray, id, userType, employerId, typeRole, userBranchId);
        // Enviar una respuesta al cliente
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/assets/userAssets/createMany con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 515518787878ooioio","barCode":null,"inventory":1,"brandAssets":"Specialized","referenceAssets":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 989898opopopo9","barCode":null,"inventory":1,"brandAssets":"Specialized","referenceAssets":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"}]



//CONTROLLER PARA OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DE UN USER O COMPANY
router.get("/userAssets", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType } = req.user;
        const serviceLayerResponse = await getAssetsUserService(id, userType);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener las maquinas, equipos y herramientas del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/assets/userAssets



//CONTROLLER PARA OBTENER TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS POR SEDE PARA USER O COMPANY
router.get("/userAssetsBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getAssetBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener las maquinas, equipos y herramientas del usuario por sede" });
    } catch (error) {
        const rawMaterialError = error as ServiceError;
        res.status(rawMaterialError.code).json(rawMaterialError.message);
    }
}); //GET - http://localhost:3000/api/assets/userAssetsBranch/:idBranch



//CONTROLLER PARA OBTENER UN EQUIPO, HERRAMIENTA O MAQUINA POR ID PERTENECIENTE AL USER O COMPANY
router.get("/userAssets/:idAssets", authRequired, async (req: Request, res: Response) => {
    try {
        const { idAssets } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getAssetService(idAssets, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/assets/userAssets/:idAssets



//CONTROLLER PARA ACTUALIZAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER O COMPANY
router.put("/userAssets/:idAssets", authRequired, checkRole, validateSchema(assetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idAssets } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await putAssetService(idAssets, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/assets/userAssets/:idAssets con { "branchId": "13c403d6-23c0-42bf-a815-0949e43c3540", "nameAssets": "Tractor", "brandAssets": "John Dere", "referenceAssets": "Modelo 2010", "conditionAssets": "Usada/De segunda", "stateAssets": "Funciona correctamente" }



//CONTROLLER PARA ACTUALIZAR DE FORMA MASIVA VARIOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER O COMPANY
router.put("/userAssetsMany/update", authRequired, checkRoleArray, validateSchema(manyAssetsSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        // Llamar a la capa de servicio para manejar la creación de múltiples activos
        const serviceLayerResponse = await putUpdateManyAssetService(bodyArray, id, userType, employerId, typeRole, userBranchId);
        // Enviar una respuesta al cliente
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/assets/userAssetsMany/update con [{"id":"6fd572e5-683f-4c6d-a421-dbb86f64d48a","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 515518787878ooioio ACTUALIZADA","barCode":null,"inventory":1,"brandAssets":"Specialized","referenceAssets":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"},{"id":"88667153-4fec-40d5-9ff9-e04cb0f1fee7","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Bici 989898opopopo9 ACTUALIZADA","barCode":null,"inventory":1,"brandAssets":"Specialized","referenceAssets":"Modelo 2010","conditionAssets":"Nuevo","stateAssets":"Funciona correctamente","assetStatus":"Activo en uso"}]



//CONTROLLER PARA DAR DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER O COMPANY
router.patch("/userAssets/:idAssets", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idAssets } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await patchAssetService(idAssets, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PATCH - http://localhost:3000/api/assets/userAssets/:idAssets con { "branchId": "82fc85e2-2672-4968-b07d-b7da442618f8", "assetStatus": "" }



//CONTROLLER PARA ELIMINAR UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER O COMPANY
router.delete('/userAssets/:idAssets', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idAssets } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await deleteAssetService(idAssets, id, userType); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/assets/userAssets/:idAssets



export default router;