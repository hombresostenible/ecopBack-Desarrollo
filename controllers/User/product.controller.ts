import express, { Request, Response } from "express";
import {
    postProductService,
    postManyProductsService,
    getProductsService,
    getProductsPaginatedService,
    getProductsBranchService,
    getProductByIdService,
    getProductOffService,
    getProductsOffByBranchService,
    putProductService,
    putUpdateManyProductService,
    patchProductService,
    patchAddInventoryProductService,
    deleteProductService,
} from "../../services/User/product.services";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { productSchemaZod, manyProductSchemaZod } from '../../validations/UserPanel/product.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN PRODUCTO POR SEDE PARA USER
router.post("/", authRequired, checkRole, validateSchema(productSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postProductService(userId, typeRole, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/product con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Pan aliñado", "barCode": null, "inventory": 500, "unitMeasure": "Kilogramo", "inventoryIncrease": "Si", "periodicityAutomaticIncrease": "Diario", "automaticInventoryIncrease": 100, "IVA": 100, "sellingPrice": 1000, "packaged": "Si", "primaryPackageType": "Papel", "expirationDate": "2024-06-01T14:50:46.288Z", "returnablePackaging": "No", "quantityPerPackage": 50, "individualPackaging": "Si", "secondaryPackageType": "Papel", "productAccesory": "Si", "productAccesories": { "accesory": null, "productAccesoryPackageType": null }, "productAsset": "Si", "productAssets": { "nameAssets": "Horno de panadería", "assetId": "54041af0-b321-4624-b162-8086ee8e847c" }, "productRawMaterials": { "nameItem": "Harina de trigo", "rawMaterialId": "bae546b1-2069-410c-a6cd-966cc01cf743", "quantity": "12" }, "inventoryChanges": null, "productionPrice": null, "isDiscounted": null, "discountPercentage": null, "reasonManualDiscountingInventory": null, "quantityManualDiscountingInventory": null, "salesCount": null }



//CONTROLLER PARA CREAR MUCHOS PRODUCTOS POR SEDE PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyProductSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await postManyProductsService(userId, typeRole, bodyArray);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/product/create-many con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan TTTTT","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":0,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan aliñado TTTTT","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":0,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null}]



//CONTROLLER PARA OBTENER TODOS LOS PRODUCTOS DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getProductsService(userId);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los productos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product



//OBTENER TODOS LOS PRODUCTOS PAGINADOS DE UN USER
router.get("/paginated", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user as { userId: string };
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getProductsPaginatedService(
            userId,
            parseInt(page as string),
            parseInt(limit as string),
        );
        res.status(serviceLayerResponse.code).json({ 
            registers: serviceLayerResponse.result,
            totalRegisters: serviceLayerResponse.totalRegisters, 
            totalPages: serviceLayerResponse.totalPages, 
            currentPage: serviceLayerResponse.currentPage,
        });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code || 500).json({ message: errorController.message });
    }
}); // GET - http://localhost:3000/api/product/paginated?page=1&limit=20



//OBTENER TODOS LOS PRODUCTOS DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
router.get("/products-off", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getProductOffService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener los productos dados de baja del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/products-off



//OBTENER TODOS LOS PRODUCTOS POR SEDE DEL USER QUE TENGAN UNIDADES DADAS DE BAJA
router.get("/products-off/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getProductsOffByBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener los productos dados de baja del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/products-off/:idBranch



//CONTROLLER PARA OBTENER UN PRODUCTO POR ID PERTENECIENTE AL USER
router.get("/:idProduct", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idProduct } = req.params;
        const serviceLayerResponse = await getProductByIdService(userId, idProduct);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/:idProduct



//CONTROLLER PARA OBTENER TODOS LOS PRODUCTOS POR SEDE DE USER
router.get("/products-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getProductsBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los productos por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/product/products-branch/:idBranch



//CONTROLLER PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
router.put("/:idProduct", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idProduct } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putProductService(userId, idProduct, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/product/:idProduct con { "branchId": "db12cb49-8c2c-4a4a-b7c8-8c27bc8326e5", "nameItem": "Panes", "packaged": "Si", "primaryPackageType": "Papel", "unitMeasure": "Unidades", "individualPackaging": false, "unitsPerPackage": 2, "totalWeight": 2, "otherPackageType": ["Papel", "Carton"], "rawMaterials": [ { "rawMaterialName": "Harina de trigo", "rawMaterialId": "32e5d281-6597-474b-b492-b66b21fb5864", "quantity": 800 }, { "rawMaterialName": "Sal", "rawMaterialId": "ef08633e-36fa-4c28-b9ab-99bc125b3009", "quantity": 50 } ] }



//CONTROLLER PARA ACTUALIZAR DE FORMA MASIVA VARIOS PRODUCTOS
router.put("/updateMany", authRequired, checkRoleArray, async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await putUpdateManyProductService(userId, typeRole, bodyArray);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/product/updateMany con [{"id":"b3d4068f-d446-4a2e-8385-ce5ffe135bf4","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan aliñado ACTUALIZADO","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":100,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null},{"id":"6c3e5a63-1362-40e7-80ea-0ed51c2318ff","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Pan ACTUALIZADO","barCode":null,"inventory":500,"unitMeasure":"Kilogramo","inventoryIncrease":"Si","periodicityAutomaticIncrease":"Diario","automaticInventoryIncrease":100,"IVA":100,"sellingPrice":1000,"packaged":"Si","primaryPackageType":"Papel","expirationDate":"2024-06-01T14:50:46.288Z","returnablePackaging":"No","quantityPerPackage":50,"individualPackaging":"Si","secondaryPackageType":"Papel","productAccesory":"Si","productAccesories":{"accesory":null,"productAccesoryPackageType":null},"productAsset":"Si","productAssets":{"nameAssets":"Horno de panadería","assetId":"54041af0-b321-4624-b162-8086ee8e847c"},"productRawMaterials":{"nameItem":"Harina de trigo","rawMaterialId":"bae546b1-2069-410c-a6cd-966cc01cf743","quantity":"12"},"productionPrice":null,"isDiscounted":null,"discountPercentage":null,"reasonManualDiscountingInventory":null,"quantityManualDiscountingInventory":null,"salesCount":null}]


//CONTROLLER PARA DAR DE BAJA UN PRODUCTO DEL USER
router.patch("/:idProduct", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idProduct } = req.params;
        const body = req.body;
        const serviceLayerResponse = await patchProductService(userId, idProduct, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/product/:idProduct con { "branchId": "1e55736b-d36b-4b0e-9c17-c00ecdc43317", "inventoryOff": { "date": "2024-06-20T13:47:22.000Z", "reason": "Desechado", "quantity": 10, "description": "Se dañó porque la dejé caer" } }



//AUMENTA UNIDADES DEL INVENTARIO DE UN PRODUCTO DEL USER
router.patch("/add-inventory/:idProduct", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idProduct } = req.params;
        const body = req.body;
        const serviceLayerResponse = await patchAddInventoryProductService(userId, idProduct, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); // PATCH - http://localhost:3000/api/product/add-inventory/:idProduct con { "branchId": "82fc85e2-2672-4968-b07d-b7da442618f8", "inventory": 10 }



//CONTROLLER PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
router.delete('/:idProduct', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idProduct } = req.params;
        const serviceLayerResponse = await deleteProductService(userId, idProduct); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/product/:idProduct

export default router;