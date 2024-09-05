import express, { Request, Response } from "express";
import {
    postRegisterCRMClientsService,
    postManyCRMClientsService,
    getCRMClientsUserService,
    getCRMClientsBranchService,
    getCRMClientByIdService,
    putCRMClientService,
    deleteCRMClientService,
} from "../../services/User/crmClients.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray  } from '../../middlewares/User/Role.middleware';
import { crmClientsSchema, manyCRMClientsSchemaType  } from '../../validations/User/crmClients.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN CLIENTE DEL USER
router.post("/", authRequired, validateSchema(crmClientsSchema), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postRegisterCRMClientsService(userId, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {        
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/crm-client con { "entityUserId": "6dde1b74-2e3c-4915-bc93-6e39ac77afc8", "name": "Carlos", "lastName": "Reyes", "typeDocumentId": "Cedula de Ciudadania", "documentId": "1110521285", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CREAR MUCHOS CLIENTES DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyCRMClientsSchemaType), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await postManyCRMClientsService(bodyArray, userId, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/crm-client/create-many con [{"address":"Casa 10 # 10 - 20, etapa 3","city":"Bogotá D.C.","corporateName":null,"department":"Bogota D.C.","documentId":"1110555666","email":"cmario.reyesp@gmail.com","lastName":"Doe","name":"Carlos","phone":"3128082002","typeDocumentId":"Cedula de Ciudadania","verificationDigit":null},{"address":"Km 20 vía Medellín Bogotá","city":"Medellín","corporateName":"Distribuidora El Comercio SAS","department":"Amazonas","documentId":"890890890","email":"distribuidoraelcomerciosas@gmail.com","lastName":null,"name":null,"phone":"6012033","typeDocumentId":"NIT","verificationDigit":5}]



//CONTROLLER PARA OBTENER TODOS LOS CLIENTES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getCRMClientsUserService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los clientes del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/crm-client



//CONTROLLER PARA OBTENER UN CLIENTE POR ID PERTENECIENTE AL USER
router.get("/:idCrmClient", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idCrmClient } = req.params;
        const serviceLayerResponse = await getCRMClientByIdService(idCrmClient, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/crm-client/:idCrmClient



//CONTROLLER PARA OBTENER TODOS LOS CLIENTES POR SEDE DE USER
router.get("/crm-clients-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getCRMClientsBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los clientes por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/crm-client/crm-clients-branch/:idBranch



//CONTROLLER PARA ACTUALIZAR UN CLIENTE PERTENECIENTE AL USER
router.put("/:idCrmClient", authRequired, validateSchema(crmClientsSchema), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idCrmClient } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putCRMClientService(idCrmClient, body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/crm-client/:idCrmClient con { "entityUserId": "6dde1b74-2e3c-4915-bc93-6e39ac77afc8", "name": "Carlos", "lastName": "Reyes", "typeDocumentId": "Cedula de Ciudadania", "documentId": "1110521285", "email": "carlosmario.reyesp@outlook.com", "phone": "3128082002", "department": "Caldas", "city": "La Dorada", "address": "Cra 100 # 200 - 300" }



//CONTROLLER PARA ELIMINAR UN CLIENTE PERTENECIENTE AL USER
router.delete('/:idCrmClient', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idCrmClient } = req.params;
        const serviceLayerResponse = await deleteCRMClientService(idCrmClient, userId); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/crm-client/:idCrmClient



export default router;