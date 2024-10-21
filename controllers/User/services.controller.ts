import express, { Request, Response } from "express";
import {
    postServicesService,
    postManyServicesService,
    getServicesService,
    getServicesPaginatedService,
    getServicesBranchService,
    getServiceByIdService,
    putServiceService,
    putUpdateManyServicesService,
    deleteServiceService,
} from "../../services/User/services.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { serviceSchemaZod, manyServiceSchemaZod } from '../../validations/UserPanel/services.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN SERVICIO POR SEDE PARA USER
router.post("/", authRequired, checkRole, validateSchema(serviceSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { userId, typeRole } = req.user;
        const serviceLayerResponse = await postServicesService(body, userId, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/service con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Servicio de Programación 2.0", "sellingPrice": 1500000, "IVA": 19 }



//CONTROLLER PARA CREAR MUCHOS SERVICIOS POR SEDE PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyServiceSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId, typeRole } = req.user;
        const bodyArray = req.body;
        const serviceLayerResponse = await postManyServicesService(userId, typeRole, bodyArray);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/service/create-many con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación QQQQ","sellingPrice":1500000,"IVA":19},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación 2.0 QQQW","sellingPrice":1500000,"IVA":19}]



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS DEL USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
      const { userId } = req.user;
      const serviceLayerResponse = await getServicesService(userId);      
      if (Array.isArray(serviceLayerResponse.result)) {
        res.status(200).json(serviceLayerResponse.result);
      } else {
        res.status(500).json({ message: "Error al obtener los servicios del usuario" });
      }
    } catch (error) {
      const errorController = error as ServiceError;
      res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/service



//OBTENER TODOS LOS SERVICIOS PAGINADOS DE UN USER
router.get("/paginated", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user as { userId: string };
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getServicesPaginatedService(
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
}); // GET - http://localhost:3000/api/service/paginated?page=1&limit=20



//CONTROLLER PARA OBTENER UN SERVICIO POR ID PERTENECIENTE AL USER
router.get("/:idService", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idService } = req.params;
        const serviceLayerResponse = await getServiceByIdService(userId, idService);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/service/:idService



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS POR SEDE PARA USER
router.get("/services-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getServicesBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "Error al obtener los servicios del usuario por sede" });
        }
    } catch (error) {
        const rawMaterialError = error as ServiceError;
        res.status(rawMaterialError.code).json(rawMaterialError.message);
    }
}); // GET - http://localhost:3000/api/service/services-branch/:idBranch



//CONTROLLER PARA ACTUALIZAR UN SERVICIO DEL USER
router.put("/:idService", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idService } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putServiceService(userId, idService, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/service/:idService con { "nameItem": "Servicio de Programación", "branchId": "f9bb2696-7925-4a9d-9a26-5530ef0d741b" }



//CONTROLLER PARA ACTUALIZAR DE FORMA MASIVA VARIO SERVICIOS
router.put("/updateMany", authRequired, checkRoleArray, async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { userId, typeRole } = req.user;
        const serviceLayerResponse = await putUpdateManyServicesService(bodyArray, userId, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/service/updateMany con [{"id":"1c4f8631-1405-4076-a246-2adbf1677a12","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación 2.0 ACTUALIZADO","sellingPrice":1500000,"IVA":19},{"id":"7ed6c261-e537-4df3-b7a5-1bca416d07fd","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación QQQQ ACTUALIZADO","sellingPrice":1500000,"IVA":19}]


//CONTROLLER PARA ELIMINAR UNSERVICIO DEL USER
router.delete('/:idService', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idService } = req.params;
        const serviceLayerResponse = await deleteServiceService(userId, idService); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/service/:idService

export default router;