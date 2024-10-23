import express, { Request, Response } from "express";
import {
    postSustainabilityService,
    getSustainabilityUserService,
    getSustainabilityBranchService,
    getEnergyConsumptionService,
    getSustainabilityByIdService,
    getEnergyConsumptionBranchService,
    getWaterConsumptionService,
    getWaterConsumptionBranchService,
    putSustainabilityService,
    deleteSustainabilityService,
} from "../../../../services/UserPanel/10ReportsAndIndicators/03SustainabilityIndicators/sustainabilityIndicators.service";
import { authRequired } from '../../../../middlewares/Token/Token.middleware';
import { ServiceError } from '../../../../types/Responses/responses.types';
const router = express.Router();

//CONTROLLER PARA CREAR REGISTROS DE SOSTENIBILIDAD
router.post("/userSustainability", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const body = req.body;
        const serviceLayerResponse = await postSustainabilityService(body, userId, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/sustainabilityIndicators/userSustainability con { "branchId": "9378fcf1-e06c-4176-98f5-cda04db7d2b1", "energyConsumption": 50 // "waterConsumption": 141, // "waterReuse": 28.2, // "rainWaterQuantity": 60, // "sustainabilityStrategy": "Reutilización de aguas grises en mi ciudad", // "sustainabilityProgramsNumber": 5, // "sustainabilityProgramName": "Reutilización localizada de agua de eficio Ecopción", // "sustainabilityProgramStartingDate": "2023-12-01T00:00:00.000Z", // "sustainabilityTopics": "¿Cómo captar el agua de lluevia eficientemente?", // "numberSustainabilityReports": 10, // "numberManagersInvolvedInSustainability": 50, // "managerName": "", // "managerRole": "", // "numberEmployeesInvolvedInSustainability": 50, // "numberSustainabilityTrainings": 50 }



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE SOSTENIBILIDAD DE UN USER
router.get("/userSustainability", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getSustainabilityUserService(userId);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los registros de sostenibilidad del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/sustainabilityIndicators/userSustainability



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE SOSTENIBILIDAD POR SEDE DE UN USER
router.get("/userSustainabilityBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getSustainabilityBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de sostenibilidad por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/sustainabilityIndicators/userSustainabilityBranch/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA DEL USER
router.get("/energyConsumption", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getEnergyConsumptionService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los servicios de energía del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/sustainabilityIndicators/energyConsumption



//
router.get("/verifyEnergyConsumption/:idSustainability", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idSustainability } = req.params;
        const serviceLayerResponse = await getSustainabilityByIdService(userId, idSustainability);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/sustainabilityIndicators/verifyEnergyConsumption/:idSustainability



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS DE ENERGIA POR SEDE DEL USER
router.get("/energyConsumptionBranch/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getEnergyConsumptionBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los servicios de energía por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/sustainabilityIndicators/energyConsumptionBranch/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS DE AGUA USER
router.get("/waterConsumption", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getWaterConsumptionService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los servicios de agua por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/sustainabilityIndicators/waterConsumption



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS DE AGUA POR SEDE DEL USER
router.get("/waterConsumptionBranch/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getWaterConsumptionBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los servicios de agua por sede del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/sustainabilityIndicators/waterConsumptionBranch/:idBranch



//CONTROLLER PARA ACTUALIZAR UN REGISTRO DE SOSTENIBILIDAD DEL USER
router.put("/userSustainability/:idSustainability", authRequired, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { userId } = req.user;
        const { idSustainability } = req.params;
        const serviceLayerResponse = await putSustainabilityService(body, userId, idSustainability);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/sustainabilityIndicators/userSustainability/:idSustainability con { "branchId": "9378fcf1-e06c-4176-98f5-cda04db7d2b1", "energyConsumption": 50 // "waterConsumption": 141, // "waterReuse": 28.2, // "rainWaterQuantity": 60, // "sustainabilityStrategy": "Reutilización de aguas grises en mi ciudad", // "sustainabilityProgramsNumber": 5, // "sustainabilityProgramName": "Reutilización localizada de agua de eficio Ecopción", // "sustainabilityProgramStartingDate": "2023-12-01T00:00:00.000Z", // "sustainabilityTopics": "¿Cómo captar el agua de lluevia eficientemente?", // "numberSustainabilityReports": 10, // "numberManagersInvolvedInSustainability": 50, // "managerName": "", // "managerRole": "", // "numberEmployeesInvolvedInSustainability": 50, // "numberSustainabilityTrainings": 50 }



//CONTROLLER PARA ELIMINAR UN REGISTRO DE SOSTENIBILIDAD PERTENECIENTE AL USER
router.delete('/userSustainability/:idSustainability', authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idSustainability } = req.params;
        const serviceLayerResponse = await deleteSustainabilityService(userId, idSustainability); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/sustainabilityIndicators/userSustainability/:idSustainability

export default router;