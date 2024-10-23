import express, { Request, Response } from "express";
import {
    postUserPlatformService,
    postManyUserPlatformService, 
    getUsersPlatformService,
    getUserPlatformByIdService,
    getUserPlatformBranchService,
    putProfileUserPlatformService,
    deleteUserPlatformService,
} from "../../../services/UserPanel/06ElectronicPayroll/userPlatform.services";
import { authRequired } from "../../../middlewares/Token/Token.middleware";
import { validateSchema } from "../../../middlewares/Schema/Schema.middleware";
import { checkRole, checkRoleCreateUserPlatform, checkRoleArrayCreateUserPlatform } from '../../../middlewares/User/Role.middleware';
import { userPlatformSchema, manyUserPlatformsSchema } from "../../../validations/UserPanel/userPlatform.zod";
import { ServiceError } from "../../../types/Responses/responses.types";
const router = express.Router();

//CREAR UN USUARIO DE PLATAFORMA
router.post("/", authRequired, checkRoleCreateUserPlatform, validateSchema(userPlatformSchema), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { userId } = req.user;
        const serviceLayerResponse = await postUserPlatformService(body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/user-platform con {"branchId":"bc0a2090-669b-4568-9fe1-c70175a0d149","name":"Mario","lastName":"Reyes","typeDocumentId":"Cedula de Ciudadania","documentId":"1110111222","logo":null,"userType":"User","typeRole":"Administrador","economicSector":null,"email":"mario_cr07@hotmail.es","password":"password","phone":"3001002020","department":"Tolima","city":"Ibagué","codeDane":"73001","subregionCodeDane":"73","address":"Cra 10 # 3 - 20","isBlocked":true,"isAceptedConditions":true}



//CREAR MUCHAS MERCANCIAS POR SEDE PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArrayCreateUserPlatform, validateSchema(manyUserPlatformsSchema), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await postManyUserPlatformService(userId, typeRole, bodyArray);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/user-platform/create-many con [{"branchId":"bc0a2090-669b-4568-9fe1-c70175a0d149","name":"Mario","lastName":"Reyes","typeDocumentId":"Cedula de Ciudadania","documentId":"10200300","logo":null,"userType":"User","typeRole":"Administrador","economicSector":null,"email":"cmario.reyesp@gmail.com","password":"password","phone":"3001002020","department":"Tolima","city":"Ibagué","codeDane":"73001","subregionCodeDane":"73","address":"Cra 10 # 3 - 20","isBlocked":true,"isAceptedConditions":true},{"branchId":"bc0a2090-669b-4568-9fe1-c70175a0d149","name":"Mario","lastName":"Reyes","typeDocumentId":"Cedula de Ciudadania","documentId":"1111200300","logo":null,"userType":"User","typeRole":"Administrador","economicSector":null,"email":"carlosmario.reyesp@outlook.com","password":"password","phone":"3001002020","department":"Tolima","city":"Ibagué","codeDane":"73001","subregionCodeDane":"73","address":"Cra 10 # 3 - 20","isBlocked":true,"isAceptedConditions":true}]



//CONTROLLER PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getUsersPlatformService(userId);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener los usuario del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/user-platform



//OBTENER UN USUARIO DE PLATAFORMA POR ID PERTENECIENTE AL USER
router.get("/:idUserPlatform", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idUserPlatform } = req.params;
        const serviceLayerResponse = await getUserPlatformByIdService(userId, idUserPlatform);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/user-platform/:idUserPlatform



//CONTROLLER PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA PERTENECIENTES A UNA SEDE DE UN USER
router.get("/users-platform-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getUserPlatformBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "No se pudieron obtener los usuarios por sede" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/user-platform/users-platform-branch/:idBranch



//CONTROLLER PARA ACTUALIZAR EL PERFIL DE UN USUARIO DE PLATAFORMA
router.put("/", authRequired, async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.user;
        const body = req.body;
        const serviceLayerResponse = await putProfileUserPlatformService(userId, body);
        if (!serviceLayerResponse) {
            res.status(401).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/user-platform



//CONTROLLER PARA ELIMINAR UN USUARIO DE PLATAFORMA PERTENECIENTE A UN USER
router.delete('/:idUserPlatform', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user
        const { idUserPlatform } = req.params;
        const serviceLayerResponse = await deleteUserPlatformService(userId, idUserPlatform); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/user-platform/:idUserPlatform


export default router;