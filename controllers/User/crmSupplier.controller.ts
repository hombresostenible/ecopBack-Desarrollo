import express, { Request, Response } from "express";
import {
    postRegisterCRMSuppliersService,
    getCRMSuppliersUserService,
    getCRMSuppliersBranchService,
    getCRMSupplierByIdService,
    putCRMSupplierService,
    deleteCRMSupplierService,
} from "../../services/User/crmSupplier.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole } from '../../middlewares/User/Role.middleware';
import { crmSupplierSchema } from '../../validations/User/crmSupplier.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN PROVEEDOR DEL USER
router.post("/", authRequired, validateSchema(crmSupplierSchema), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await postRegisterCRMSuppliersService(body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/CrmSupplier con { "entityUserId": null, "entityCompanyId": "1ecd49f4-f6b7-4d49-a000-0d9b58147a32", "fullName": "Carlos Mario Reyes", "typeDocumentId": "Cédula de Ciudadanía", "documentId": "1110521285", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CONTROLLER PARA OBTENER TODOS LOS PROVEEDORES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType } = req.user;
        const serviceLayerResponse = await getCRMSuppliersUserService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los proveedores del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/CRMSuppliers



//CONTROLLER PARA OBTENER TODOS LOS PROVEEDORES POR SEDE DE USER
router.get("/branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getCRMSuppliersBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los proveedores por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/CrmSupplier/branch/:idBranch



//CONTROLLER PARA OBTENER UN PROVEEDOR POR ID PERTENECIENTE AL USER
router.get("/:idCRMSupplier", authRequired, async (req: Request, res: Response) => {
    try {
        const { idCRMSupplier } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getCRMSupplierByIdService(idCRMSupplier, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/CrmSupplier/:idCRMSupplier



//CONTROLLER PARA ACTUALIZAR UN PROVEEDOR PERTENECIENTE AL USER
router.put("/:idCRMSupplier", authRequired, validateSchema(crmSupplierSchema), async (req: Request, res: Response) => {
    try {
        const { idCRMSupplier } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await putCRMSupplierService(idCRMSupplier, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/CrmSupplier/:idCRMSupplier con { "entityUserId": null, "entityCompanyId": "1ecd49f4-f6b7-4d49-a000-0d9b58147a32", "fullName": "Carlos Mario Reyes", "typeDocumentId": "Cédula de Ciudadanía", "documentId": "1110521285", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CONTROLLER PARA ELIMINAR UN PROVEEDOR PERTENECIENTE AL USER
router.delete('/:idCRMSupplier', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idCRMSupplier } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await deleteCRMSupplierService(idCRMSupplier, id, userType); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/CrmSupplier/:idCRMSupplier



export default router;