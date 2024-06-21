import express, { Request, Response } from "express";
import {
    postServicesService,
    postManyServicesService,
    getServicesUserService,
    getServicesBranchService,
    getServicesService,
    putServicesService,
    putUpdateManyServiceService,
    deleteServicesService,
} from "../../services/User/services.service";
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole, checkRoleArray } from '../../middlewares/User/Role.middleware';
import { serviceSchemaZod, manyServiceSchemaZod } from '../../validations/User/services.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UN SERVICIO POR SEDE PARA USER
router.post("/", authRequired, checkRole, validateSchema(serviceSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postServicesService(body, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/service con { "branchId": "28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0", "nameItem": "Servicio de Programación 2.0", "sellingPrice": 1500000, "IVA": 19 }



//CONTROLLER PARA CREAR MUCHOS SERVICIOS POR SEDE PARA USER DESDE EL EXCEL
router.post("/create-many", authRequired, checkRoleArray, validateSchema(manyServiceSchemaZod), async (req: Request, res: Response) => {
    try {
        console.log('OLA')
        const bodyArray = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postManyServicesService(bodyArray, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        console.log('ERROR EN SERVICES: ', error)
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/service/create-many con [{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación QQQQ","sellingPrice":1500000,"IVA":19},{"branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación 2.0 QQQW","sellingPrice":1500000,"IVA":19}]



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS DEL USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
      const { id } = req.user;
      const serviceLayerResponse = await getServicesUserService(id);      
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



//CONTROLLER PARA OBTENER UN SERVICIO POR ID PERTENECIENTE AL USER
router.get("/:idService", authRequired, async (req: Request, res: Response) => {
    try {
        const { idService } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getServicesService(idService, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/service/:idService



//CONTROLLER PARA OBTENER TODOS LOS SERVICIOS POR SEDE PARA USER
router.get("/services-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getServicesBranchService(idBranch, id);
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
router.put("/:idService", authRequired, checkRole, validateSchema(serviceSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idService } = req.params;
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await putServicesService(idService, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/service/:idService con { "nameItem": "Servicio de Programación", "branchId": "f9bb2696-7925-4a9d-9a26-5530ef0d741b" }



//CONTROLLER PARA ACTUALIZAR DE FORMA MASIVA VARIO SERVICIOS
router.put("/updateMany", authRequired, checkRoleArray, validateSchema(manyServiceSchemaZod), async (req: Request, res: Response) => {
    try {
        const bodyArray = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await putUpdateManyServiceService(bodyArray, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/service/updateMany con [{"id":"1c4f8631-1405-4076-a246-2adbf1677a12","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación 2.0 ACTUALIZADO","sellingPrice":1500000,"IVA":19},{"id":"7ed6c261-e537-4df3-b7a5-1bca416d07fd","branchId":"28fe38ac-aaf7-4cd5-8514-f0d7b03cfcd0","nameItem":"Servicio de Programación QQQQ ACTUALIZADO","sellingPrice":1500000,"IVA":19}]


//CONTROLLER PARA ELIMINAR UNSERVICIO DEL USER
router.delete('/:idService', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idService } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await deleteServicesService(idService, id); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/service/:idService



export default router;