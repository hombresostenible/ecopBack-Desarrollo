import express, { Request, Response } from "express";
import {
    postRegisterCRMClientsService,
    getCRMClientsUserService,
    getCRMClientsBranchService,
    getCRMClientByIdService,
    putCRMClientService,
    deleteCRMClientService,
} from "../../services/User/crmClients.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole } from '../../middlewares/User/Role.middleware';
import { crmClientsSchema } from '../../validations/User/crmClients.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN CLIENTE DEL USER
router.post("/", authRequired, validateSchema(crmClientsSchema), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await postRegisterCRMClientsService(body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {        
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/CrmClients con { "entityUserId": null, "entityCompanyId": "1ecd49f4-f6b7-4d49-a000-0d9b58147a32", "fullName": "Carlos Mario Reyes", "typeDocumentId": "Cédula de Ciudadanía", "documentId": "1110521285", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CONTROLLER PARA OBTENER TODOS LOS CLIENTES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType } = req.user;
        const serviceLayerResponse = await getCRMClientsUserService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los clientes del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/CrmClients



//CONTROLLER PARA OBTENER TODOS LOS CLIENTES POR SEDE DE USER
router.get("/branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getCRMClientsBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los clientes por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/CrmClients/branch/:idBranch



//CONTROLLER PARA OBTENER UN CLIENTE POR ID PERTENECIENTE AL USER
router.get("/:idCRMClient", authRequired, async (req: Request, res: Response) => {
    try {
        const { idCRMClient } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getCRMClientByIdService(idCRMClient, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/CrmClients/:idCRMClient



//CONTROLLER PARA ACTUALIZAR UN CLIENTE PERTENECIENTE AL USER
router.put("/:idCRMClient", authRequired, validateSchema(crmClientsSchema), async (req: Request, res: Response) => {
    try {
        const { idCRMClient } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await putCRMClientService(idCRMClient, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/CrmClients/:idCRMClient con { "entityUserId": null, "entityCompanyId": "1ecd49f4-f6b7-4d49-a000-0d9b58147a32", "fullName": "Carlos Mario Reyes", "typeDocumentId": "Cédula de Ciudadanía", "documentId": "1110521285", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CONTROLLER PARA ELIMINAR UN CLIENTE PERTENECIENTE AL USER
router.delete('/:idCRMClient', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idCRMClient } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await deleteCRMClientService(idCRMClient, id, userType); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/CrmClients/:idCRMClient



export default router;