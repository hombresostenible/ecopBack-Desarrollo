import express, { Request, Response } from "express";
import {
    getUserPlatformService,
    getUserPlatformBranchService,
    putProfileUserPlatformService,
    deleteUserPlatformService,
} from "../../services/User/userPlatform.services";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { checkRole } from '../../middlewares/User/Role.middleware';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

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
router.get("/:idBranch", authRequired, async (req: Request, res: Response) => {
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
}); // GET - http://localhost:3000/api/userPlatform/:idBranch



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