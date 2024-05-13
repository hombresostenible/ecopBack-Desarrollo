import express, { Request, Response } from "express";
import {
    postProductService,
    postManyProductService,
    getProductsService,
    getProductsUserService,
    getProductBranchService,
    getProductByIdService,
    putProductService,
    putUpdateManyProductService,
    patchProductService,
    deleteProductService,
} from "../../services/User/product.services";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { productSchemaZod, manyProductSchemaZod } from '../../validations/User/product.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN PRODUCTO POR SEDE PARA USER
router.post("/userProduct", authRequired, checkRole, validateSchema(productSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await postProductService(body, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/product/userProduct con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Pan aliñado", "barCode": null, "inventory": 500, "unitMeasure": "Kilogramo", "inventoryIncrease": "Si", "periodicityAutomaticIncrease": "Diario", "automaticInventoryIncrease": 100, "IVA": 100, "sellingPrice": 1000, "packaged": "Si", "primaryPackageType": "Papel", "expirationDate": "2024-06-01T14:50:46.288Z", "returnablePackaging": "No", "quantityPerPackage": 50, "individualPackaging": "Si", "secondaryPackageType": "Papel", "productAccesory": "Si", "productAccesories": { "accesory": null, "productAccesoryPackageType": null }, "productAsset": "Si", "productAssets": { "nameAssets": "Horno de panadería", "assetId": "54041af0-b321-4624-b162-8086ee8e847c" }, "productRawMaterials": { "nameItem": "Harina de trigo", "rawMaterialId": "bae546b1-2069-410c-a6cd-966cc01cf743", "quantity": "12" }, "inventoryChanges": null, "productionPrice": null, "isDiscounted": null, "discountPercentage": null, "reasonManualDiscountingInventory": null, "quantityManualDiscountingInventory": null, "salesCount": null }



//CONTROLLER PARA CREAR MUCHOS PRODUCTOS POR SEDE PARA USER DESDE EL EXCEL
router.post("/userProduct/createMany", authRequired, checkRoleArray, validateSchema(manyProductSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await postManyProductService(bodyArray, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/product/userProduct/createMany con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan TTTTT","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":0,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan aliñado TTTTT","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":0,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null}]



//CONTROLLER PARA OBTENER TODOS LOS PRODUCTOS DE TODOS LOS USER - CEO PLATATORMA
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const serviceLayerResponse = await getProductsService();
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product



//CONTROLLER PARA OBTENER TODOS LOS PRODUCTOS DE UN USER
router.get("/userProduct", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType } = req.user;
        const serviceLayerResponse = await getProductsUserService(id, userType);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los productos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/userProduct



//CONTROLLER PARA OBTENER TODOS LOS PRODUCTOS POR SEDE DE USER
router.get("/userProductBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getProductBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los productos por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/userProductBranch/:idBranch



//CONTROLLER PARA OBTENER UN PRODUCTO POR ID PERTENECIENTE AL USER
router.get("/userProduct/:idProduct", authRequired, async (req: Request, res: Response) => {
    try {
        const { idProduct } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getProductByIdService(idProduct, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/userProduct/:idProduct



//CONTROLLER PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
router.put("/userProduct/:idProduct", authRequired, checkRole, validateSchema(productSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idProduct } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await putProductService(idProduct, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/product/userProduct/:idProduct con { "branchId": "db12cb49-8c2c-4a4a-b7c8-8c27bc8326e5", "nameItem": "Panes", "packaged": "Si", "primaryPackageType": "Papel", "unitMeasure": "Unidades", "individualPackaging": false, "unitsPerPackage": 2, "totalWeight": 2, "otherPackageType": ["Papel", "Carton"], "rawMaterials": [ { "rawMaterialName": "Harina de trigo", "rawMaterialId": "32e5d281-6597-474b-b492-b66b21fb5864", "quantity": 800 }, { "rawMaterialName": "Sal", "rawMaterialId": "ef08633e-36fa-4c28-b9ab-99bc125b3009", "quantity": 50 } ] }



//CONTROLLER PARA ACTUALIZAR DE FORMA MASIVA VARIOS PRODUCTOS
router.put("/userProductsMany/update", authRequired, checkRoleArray, validateSchema(manyProductSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await putUpdateManyProductService(bodyArray, id, userType, employerId, typeRole, userBranchId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/product/userProductsMany/update con [{"id":"b3d4068f-d446-4a2e-8385-ce5ffe135bf4","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan aliñado ACTUALIZADO","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":100,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null},{"id":"6c3e5a63-1362-40e7-80ea-0ed51c2318ff","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan ACTUALIZADO","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":100,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null}]


//CONTROLLER PARA DAR DE BAJA UN PRODUCTO DEL USER
router.patch("/userProduct/:idProduct", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idProduct } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await patchProductService(idProduct, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/product/userProduct/:idProduct con { "branchId": "d0b3ff70-ac49-4c2c-bba3-5d67686607d3", "reasonManualDiscountingInventory": "Donado", "quantityManualDiscountingInventory": 20 }



//CONTROLLER PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
router.delete('/userProduct/:idProduct', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idProduct } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await deleteProductService(idProduct, id, userType); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/product/userProduct/:idProduct


export default router;