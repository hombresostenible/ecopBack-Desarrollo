import express, { Request, Response } from "express";
import {
    postBranchService,
    postManyBranchService,
    getBranchsUserService,
    getBranchService,
    putBranchService,
    deleteBranchService
} from "../../services/User/branch.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRoleAdmin } from '../../middlewares/User/Role.middleware';
import { branchSchemaZod, manyBranchsSchemaType } from '../../validations/User/branch.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UNA SEDE PARA USER
router.post("/", authRequired, checkRoleAdmin, validateSchema(branchSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await postBranchService(body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/branch con { "nameBranch": "Sede oriente", "departmentBranch": "Av Caracas", "cityBranch": "Av Caracas", "addressBranch": "Av Caracas", "identificationNumberBranch": "1000", "contactEmailBranch": "sedeoriente@gmail.com", "contactPhoneBranch": "3001002030", "nameManagerBranch": "Carlos", "lastNameManagerBranch": "Reyes", "managertypeDocumentId": "Cedula de Ciudadania", "managerIdDocument": "100020003000" }



//CONTROLLER PARA CREAR MASIVAMENTE SEDES PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleAdmin, validateSchema(manyBranchsSchemaType), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await postManyBranchService(bodyArray, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/branch/create-many con [{"nameBranch":"Sede Uno","departmentBranch":"Av Caracas","cityBranch":"Av Caracas","addressBranch":"Av Caracas","identificationNumberBranch":"1000","contactEmailBranch":"sedeuno@gmail.com","contactPhoneBranch":"3001002030","nameManagerBranch":"Carlos","lastNameManagerBranch":"Reyes","managertypeDocumentId":"Cedula de Ciudadania","managerIdDocument":"100020003000"},{"nameBranch":"Sede Dos","departmentBranch":"Av Caracas","cityBranch":"Av Caracas","addressBranch":"Av Caracas","identificationNumberBranch":"1000","contactEmailBranch":"sededos@gmail.com","contactPhoneBranch":"3001002030","nameManagerBranch":"Carlos","lastNameManagerBranch":"Reyes","managertypeDocumentId":"Cedula de Ciudadania","managerIdDocument":"100020003000"}]



//CONTROLLER PARA OBTENER TODAS LAS SEDES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getBranchsUserService(id);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error en la respuesta del servicio" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/branch



//CONTROLLER PARA OBTENER UNA SEDE POR ID PERTENECIENTE AL USER
router.get("/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getBranchService(idBranch, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/branch/:idBranch



//CONTROLLER PARA ACTUALIZAR UNA SEDE PERTENECIENTE AL USER
router.put("/:idBranch", authRequired, checkRoleAdmin, validateSchema(branchSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await putBranchService(idBranch, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/branch/:idBranch con { "nameBranch": "Sede Norte", "addressBranch": "Av Caracas", "identificationNumberBranch": "1000", "contactEmailBranch": "sedenorte@gmail.com", "contactPhoneBranch": "3001002030", "nameManagerBranch": "Carlos", "lastNameManagerBranch": "Reyes", "managertypeDocumentId": "Cedula de Ciudadania", "managerIdDocument": "100020003000" }



//CONTROLLER PARA ELIMINAR UNA SEDE PERTENECIENTE AL USER
router.delete('/:idBranch', authRequired, checkRoleAdmin, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await deleteBranchService(idBranch, id);  
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/branch/:idBranch


export default router;