import express, { Request, Response } from "express";
import {
    postRegisterCRMSuppliersService,
    postManyCRMSuppliersService,
    getCRMSuppliersUserService,
    getCRMSuppliersBranchService,
    getCRMSupplierByIdService,
    putCRMSupplierService,
    deleteCRMSupplierService,
} from "../../services/User/crmSupplier.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { crmSupplierSchema, manyCRMSupplierSchemaType } from '../../validations/User/crmSupplier.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN PROVEEDOR DEL USER
router.post("/", authRequired, validateSchema(crmSupplierSchema), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postRegisterCRMSuppliersService(body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/crm-supplier con { "entityUserId": "6dde1b74-2e3c-4915-bc93-6e39ac77afc8", "name": "Carlos", "lastName": "Reyes", "typeDocumentId": "Cedula de Ciudadania", "documentId": "1110521285", "verificationDigit": "5", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CREAR MUCHOS PROVEEDORES DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyCRMSupplierSchemaType), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await postManyCRMSuppliersService(bodyArray, userId, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/crm-supplier/create-many con [{"entityUserId":"6dde1b74-2e3c-4915-bc93-6e39ac77afc8","name":"Carlos","lastName":"Reyes","typeDocumentId":"Cedula de Ciudadania","documentId":"1110521285","verificationDigit":"5","email":"carlosmario.reyesp@outlook.com","phone":"3128082002","department":"Tolima","city":"Ibagué","codeDane":"73001","subregionCodeDane":"73","address":"Cra 100 # 200 - 300"},{"entityUserId":"6dde1b74-2e3c-4915-bc93-6e39ac77afc8","name":"Carlos","lastName":"Reyes","typeDocumentId":"Cedula de Ciudadania","documentId":"7788999999","verificationDigit":"5","email":"carlosmario.reyesp@outlook.com","phone":"3128082002","department":"Tolima","city":"Ibagué","codeDane":"73001","subregionCodeDane":"73","address":"Cra 100 # 200 - 300"}]



//CONTROLLER PARA OBTENER TODOS LOS PROVEEDORES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getCRMSuppliersUserService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los proveedores del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/crm-supplier



//CONTROLLER PARA OBTENER UN PROVEEDOR POR ID PERTENECIENTE AL USER
router.get("/:idCrmSupplier", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idCrmSupplier } = req.params;
        const serviceLayerResponse = await getCRMSupplierByIdService(idCrmSupplier, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/crm-supplier/:idCrmSupplier



//CONTROLLER PARA OBTENER TODOS LOS PROVEEDORES POR SEDE DE USER
router.get("/crm-supplier-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getCRMSuppliersBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los proveedores por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/crm-supplier/crmSupplier-branch/:idBranch



//CONTROLLER PARA ACTUALIZAR UN PROVEEDOR PERTENECIENTE AL USER
router.put("/:idCrmSupplier", authRequired, validateSchema(crmSupplierSchema), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idCrmSupplier } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putCRMSupplierService(idCrmSupplier, body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/crm-supplier/:idCrmSupplier con { "entityUserId": "6dde1b74-2e3c-4915-bc93-6e39ac77afc8", "name": "Carlos", "lastName": "Reyes", "typeDocumentId": "Cedula de Ciudadania", "documentId": "1110521285", "verificationDigit": "5", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CONTROLLER PARA ELIMINAR UN PROVEEDOR PERTENECIENTE AL USER
router.delete('/:idCrmSupplier', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idCrmSupplier } = req.params;
        const serviceLayerResponse = await deleteCRMSupplierService(idCrmSupplier, userId); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/crm-supplier/:idCrmSupplier



export default router;