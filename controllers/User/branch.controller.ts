import express, { Request, Response } from "express";
import {
    postBranchesService,
    postManyBranchesService,
    getBranchesService,
    getBranchesPaginatedService,
    getBranchByIdService,
    putBranchService,
    deleteBranchService
} from "../../services/User/branch.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRoleAdmin } from '../../middlewares/User/Role.middleware';
import { branchSchemaZod, manyBranchsSchemaType } from '../../validations/UserPanel/branch.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UNA SEDE PARA USER
router.post("/", authRequired, checkRoleAdmin, validateSchema(branchSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postBranchesService(body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/branch con { "nameBranch": "Sede Centro", "department": "Bogota D.C.", "city": "Bogota D.C.", "codeDane": "11001", "subregionCodeDane": "11", "addressBranch": "Av Caracas", "contactEmailBranch": "sedecentro@gmail.com", "contactPhoneBranch": "3128082002", "nameManagerBranch": "Carlos", "lastNameManagerBranch": "Reyes", "typeDocumentIdManager": "Cedula de Ciudadania", "documentIdManager": "1110521285" }



//CONTROLLER PARA CREAR MASIVAMENTE SEDES PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleAdmin, validateSchema(manyBranchsSchemaType), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { userId } = req.user;
        const serviceLayerResponse = await postManyBranchesService(bodyArray, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/branch/create-many con [{"nameBranch":"Sede Uno","departmentBranch":"Av Caracas","cityBranch":"Av Caracas","addressBranch":"Av Caracas","identificationNumberBranch":"1000","contactEmailBranch":"sedeuno@gmail.com","contactPhoneBranch":"3001002030","nameManagerBranch":"Carlos","lastNameManagerBranch":"Reyes","managertypeDocumentId":"Cedula de Ciudadania","managerIdDocument":"100020003000"},{"nameBranch":"Sede Dos","departmentBranch":"Av Caracas","cityBranch":"Av Caracas","addressBranch":"Av Caracas","identificationNumberBranch":"1000","contactEmailBranch":"sededos@gmail.com","contactPhoneBranch":"3001002030","nameManagerBranch":"Carlos","lastNameManagerBranch":"Reyes","managertypeDocumentId":"Cedula de Ciudadania","managerIdDocument":"100020003000"}]



//CONTROLLER PARA OBTENER TODAS LAS SEDES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getBranchesService(userId);      
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



//CONTROLLER PARA OBTENER TODAS LAS SEDES DE UN USER
router.get("/paginated", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user as { userId: string };
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getBranchesPaginatedService(
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
}); // GET - http://localhost:3000/api/branch/paginated?page=1&limit=20



//CONTROLLER PARA OBTENER UNA SEDE POR ID PERTENECIENTE AL USER
router.get("/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getBranchByIdService(userId, idBranch);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/branch/:idBranch



//CONTROLLER PARA ACTUALIZAR UNA SEDE PERTENECIENTE AL USER
router.put("/:idBranch", authRequired, checkRoleAdmin, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putBranchService(userId, idBranch, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/branch/:idBranch con { "nameBranch": "Sede Norte", "addressBranch": "Av Caracas", "identificationNumberBranch": "1000", "contactEmailBranch": "sedenorte@gmail.com", "contactPhoneBranch": "3001002030", "nameManagerBranch": "Carlos", "lastNameManagerBranch": "Reyes", "managertypeDocumentId": "Cedula de Ciudadania", "managerIdDocument": "100020003000" }



//CONTROLLER PARA ELIMINAR UNA SEDE PERTENECIENTE AL USER
router.delete('/:idBranch', authRequired, checkRoleAdmin, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await deleteBranchService(userId, idBranch);  
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/branch/:idBranch

export default router;