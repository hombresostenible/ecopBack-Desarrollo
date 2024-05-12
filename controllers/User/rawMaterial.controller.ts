import express, { Request, Response } from "express";
import {
    postRawMaterialService,
    postManyRawMaterialService,
    getRawMaterialsService,
    getRawMaterialsUserService,
    getRawMaterialBranchService,
    getRawMaterialService,
    putRawMaterialService,
    putUpdateManyRawMaterialService,
    patchRawMaterialService,
    deleteRawMaterialService
} from "../../services/User/rawMaterial.services";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { rawMaterialSchema, manyRawMaterialSchema } from '../../validations/User/rawMaterial.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR MATERIA PRIMA POR SEDE PARA USER
router.post("/userRawMaterial", authRequired, checkRole, validateSchema(rawMaterialSchema), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await postRawMaterialService(body, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/rawMaterial/userRawMaterial con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Sal marina", "barCode": null, "inventory": 500, "unitMeasure": "Kilogramo", "inventoryIncrease": "Si", "periodicityAutomaticIncrease": "Diario", "automaticInventoryIncrease": 100, "purchasePriceBeforeTax": 1900, "IVA": 0, "packaged": "Si", "primaryPackageType": "Papel", "expirationDate": "2024-06-01T14:50:46.288Z", "returnablePackaging": "No", "quantityPerPackage": 50, "individualPackaging": "Si", "secondaryPackageType": "Papel", "inventoryChanges": null, "sellingPrice": null, "reasonManualDiscountingInventory": null, "quantityManualDiscountingInventory": null }



//CONTROLLER PARA CREAR MUCHAS MATERIAS PRIMAS POR SEDE PARA USER DESDE EL EXCEL
router.post("/userRawMaterial/createMany", authRequired, checkRoleArray, validateSchema(manyRawMaterialSchema), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await postManyRawMaterialService(bodyArray, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
});// POST - http://localhost:3000/api/rawMaterial/userRawMaterial/createMany con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Sal marina998uyuyu*9","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"purchasePriceBeforeTax":1900,"IVA":0,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","sellingPrice":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Sal marina 28yuyu88","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"purchasePriceBeforeTax":1900,"IVA":0,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","sellingPrice":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null}]



//CONTROLLER PARA OBTENER TODOS LAS MATERIAS PRIMASDE DE TODOS LOS USER - CEO PLATATORMA
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const serviceLayerResponse = await getRawMaterialsService();
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/rawMaterial



//CONTROLLER PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UN USER
router.get("/userRawMaterial", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType } = req.user;
        const serviceLayerResponse = await getRawMaterialsUserService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
          } else {
            res.status(500).json({ message: "Error al obtener las materias primas del usuario" });
          }
    } catch (error) {
        const productError = error as ServiceError;
        res.status(productError.code).json(productError.message);
    }
}); // GET - http://localhost:3000/api/rawMaterial/userRawMaterial



//CONTROLLER PARA OBTENER TODAS LAS MATERIAS PRIMAS DE UNA SEDE DE USER
router.get("/userRawMaterialBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getRawMaterialBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/rawMaterial/userRawMaterialBranch/:idBranch



//CONTROLLER PARA OBTENER UNA MATERIA PRIMA POR ID PERTENECIENTE AL USER
router.get("/userRawMaterial/:idRawMaterial", authRequired, async (req: Request, res: Response) => {
    try {
        const { idRawMaterial } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getRawMaterialService(idRawMaterial, id, userType);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/rawMaterial/userRawMaterial/:idRawMaterial



//CONTROLLER PARA ACTUALIZAR UNA MATERIA PRIMA PERTENECIENTE AL USER
router.put("/userRawMaterial/:idRawMaterial", authRequired, checkRole, validateSchema(rawMaterialSchema), async (req: Request, res: Response) => {
    try {
        const { idRawMaterial } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await putRawMaterialService(idRawMaterial, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/rawMaterial/userRawMaterial/:idRawMaterial



//CONTROLLER PARA ACTUALIZAR DE FORMA MASIVA VARIAS MATERIAS PRIMAS
router.put("/userRawMaterialsMany/update", authRequired, checkRoleArray, validateSchema(manyRawMaterialSchema), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await putUpdateManyRawMaterialService(bodyArray, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/rawMaterial/userRawMaterialsMany/update con [{"id":"9fba429f-0abd-459a-9755-22273a841a5f","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Sal marina 2 ACTUALIZADA","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"purchasePriceBeforeTax":1900,"IVA":0,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","sellingPrice":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null},{"id":"b49c0c99-4258-4872-a77a-0c7214698c7b","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Sal marina ACTUALIZADA","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"purchasePriceBeforeTax":1900,"IVA":0,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","sellingPrice":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null}]



//CONTROLLER PARA DAR DE BAJA UNA MATERIA PRIMAS DEL USER
router.patch("/userRawMaterial/:idRawMaterial", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idRawMaterial } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await patchRawMaterialService(idRawMaterial, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/rawMaterial/userRawMaterial/:idRawMaterial con { "branchId": "d0b3ff70-ac49-4c2c-bba3-5d67686607d3", "reasonManualDiscountingInventory": "Donado", "quantityManualDiscountingInventory": 20 }



//CONTROLLER PARA ELIMINAR UNA MATERIA PRIMA PERTENECIENTE AL USER
router.delete('/userRawMaterial/:idRawMaterial', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idRawMaterial } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await deleteRawMaterialService(idRawMaterial, id, userType);  
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/rawMaterial/:idRawMaterial


export default router;