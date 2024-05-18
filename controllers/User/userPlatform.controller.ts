import express, { Request, Response } from "express";
import {
    postUserPlatformService,
    getUserPlatformService,
    getUserPlatformBranchService,
    putProfileUserPlatformService,
    deleteUserPlatformService,
} from "../../services/User/userPlatform.services";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { checkRole, checkRoleCreateUserPlatform } from '../../middlewares/User/Role.middleware';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CREAR UN USUARIO DE PLATAFORMA
router.post("/", authRequired, checkRoleCreateUserPlatform, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await postUserPlatformService(body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/userPlatform con {"branchId":"450df933-b11b-4279-b992-701cc16a15b5","name":"Mario","lastName":"Reyes","typeDocumentId":"Cédula de Ciudadanía","documentId":"1110111222","logo":null,"userType":"User","typeRole":"Administrador","economicSector":null,"email":"mario_cr07@hotmail.es","password":"password","phone":"3001002020","department":"Tolima","city":"Ibagué","address":"Cra 10 # 3 - 20","isBlocked":true,"isAceptedConditions":true}



//CONTROLLER PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getUserPlatformService(id);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener los usuario del usuario" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/userPlatform



//CONTROLLER PARA OBTENER TODOS LOS USUARIOS DE PLATAFORMA PERTENECIENTES A UNA SEDE DE UN USER
router.get("/usersPlatform-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getUserPlatformBranchService(idBranch, id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "No se pudieron obtener los usuarios por sede" });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/userPlatform/usersPlatform-branch/:idBranch



//CONTROLLER PARA ACTUALIZAR EL PERFIL DE UN USUARIO DE PLATAFORMA
router.put("/", authRequired, async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await putProfileUserPlatformService(body, id);
        if (!serviceLayerResponse) {
            res.status(401).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/userPlatform



//CONTROLLER PARA ELIMINAR UN USUARIO DE PLATAFORMA PERTENECIENTE A UN USER
router.delete('/:idUserPlatform', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idUserPlatform } = req.params;
        const { id } = req.user
        const serviceLayerResponse = await deleteUserPlatformService(idUserPlatform, id); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/userPlatform/:idUserPlatform


export default router;