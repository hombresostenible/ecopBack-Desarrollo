import express, { Request, Response } from "express";
import {
    //Services para CUSTOMERACQUISITION
    postSalesFunnelCustomerAcqService,
    getSalesFunnelCustomerAcqUserService,
    getCustomerAcqBranchService,
    getCustomerAcqService,
    putSalesFunnelCustomerAcqService,
    deleteSalesFunnelCustomerAcqService,


    //Services para CUSTOMERRETENTION
    postSalesFunnelCustomerRetService,
    getSalesFunnelCustomerRetUserService,
    getCustomerRetBranchService,
    getCustomerRetService,
    putSalesFunnelCustomerRetService,
    deleteSalesFunnelCustomerRetService,


    //Services para CUSTOMERDIGITAL
    postSalesFunnelCustomerDigitalService,
    getSalesFunnelCustomerDigitalUserService,
    getCustomerDigitalBranchService,
    getCustomerDigitalService,
    putSalesFunnelCustomerDigitalService,
    deleteSalesFunnelCustomerDigitalService
} from "../../../services/User/Indicators/marketingIndicators.service";
import { validateSchema } from '../../../middlewares/Schema/Schema.middleware';
import { salesFunnelCustomerAcqSchemaZod, salesFunnelCustomerRetSchemaZod, salesFunnelCustomerDigitalSchemaZod } from '../../../validations/User/salesFunnel.zod';
import { authRequired } from '../../../middlewares/Token/Token.middleware';
import { ServiceError } from '../../../types/Responses/responses.types';
const router = express.Router();



//^ SALESFUNNELCUSTOMERACQUISITION
//CONTROLLER PARA CREAR UN CUSTOMERACQUISITION EN LA SEDE DE USER
router.post("/customerAcquisition", authRequired, validateSchema(salesFunnelCustomerAcqSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postSalesFunnelCustomerAcqService(body, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/marketingIndicators/customerAcquisition con { "cacRegistrationDate": "2023-09-28T19:45:10.000Z", "cacPeriodOfAnalysis": "JUNIO", "cacAdvertisingInvestment": 7000, "cacSalesTeamCost": 7000, "cacSalesComissions": 7000, "cacTransportCost": 7000, "cacEventsCost": 7000, "cacNewClients": 7000, "branchId": "ad191be1-0c43-4732-96a9-e53b7ddd96bb" }



//CONTROLLER PARA OBTENER TODOS LOS CUSTOMERACQUISITION DE UN USER
router.get("/customerAcquisition", authRequired, async (req: Request, res: Response) => {
    try {
        console.log('Hola')
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getSalesFunnelCustomerAcqUserService(id);      
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los CUSTOMERACQUISITION" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/marketingIndicators/customerAcquisition



//CONTROLLER PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERACQUISITION DE UN USER
router.get("/customerAcquisitionBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getCustomerAcqBranchService(idBranch, id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los productos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/marketingIndicators/customerAcquisitionBranch/3b35837d-5459-4e01-9494-2d85c50baef2



//CONTROLLER PARA OBTENER UN CUSTOMERACQUISITION POR ID PERTENECIENTE AL USER
router.get("/customerAcquisition/:idCustomerAcquisition", authRequired, async (req: Request, res: Response) => {
    try {
        const { idCustomerAcquisition } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getCustomerAcqService(idCustomerAcquisition, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/marketingIndicators/customerAcquisition/3b35837d-5459-4e01-9494-2d85c50baef2



//CONTROLLER PARA ACTUALIZAR UN CUSTOMERACQUISITION PERTENECIENTE AL USER
router.put("/customerAcquisition/:idCustomerAcquisition", authRequired, validateSchema(salesFunnelCustomerAcqSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idCustomerAcquisition } = req.params;
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await putSalesFunnelCustomerAcqService(idCustomerAcquisition, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //PUT - http://localhost:3000/api/marketingIndicators/customerAcquisition con { "cacRegistrationDate": "2023-09-28T19:45:10.000Z", "cacPeriodOfAnalysis": "JUNIO", "cacAdvertisingInvestment": 7000, "cacSalesTeamCost": 7000, "cacSalesComissions": 7000, "cacTransportCost": 7000, "cacEventsCost": 7000, "cacNewClients": 7000, "branchId": "ad191be1-0c43-4732-96a9-e53b7ddd96bb" }



//CONTROLLER PARA ELIMINAR UN REGISTRO DEL CUSTOMERACQUISITION PERTENECIENTE AL USER
router.delete('/customerAcquisition/:idCustomerAcquisition', authRequired, async (req: Request, res: Response) => {
    try {
        const { idCustomerAcquisition } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await deleteSalesFunnelCustomerAcqService(idCustomerAcquisition, id);  
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/marketingIndicators/customerAcquisition/c8db0efa-c130-4fe8-99c0-74dc9a133740










//^ SALESFUNNELCUSTOMERRETENTION
//CONTROLLER PARA CREAR UN CUSTOMERRETENTION EN LA SEDE DE USER
router.post("/customerRetention", authRequired, validateSchema(salesFunnelCustomerRetSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postSalesFunnelCustomerRetService(body, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/marketingIndicators/customerRetention con { "crcRegistrationDate": "2023-09-28T19:45:10.000Z", "crcPeriodOfAnalysis": "NOVIEMBRE USER", "crcDiscountsInvestment": 8000, "crcGuarranteesCosts": 100, "crcAdvertisingInvestment": 15000, "crcSalesTeamCost": 100, "crcSalesComissions": 7000, "crcTransportCosts": 100, "crcEventsCost": 4051, "crcCurrentClients": 100, "branchId": "8fa90b7a-aaa4-4147-b813-aa5f5f7a7735" }


//CONTROLLER PARA OBTENER TODOS LOS CUSTOMERRETENTION DE UN USER
router.get("/customerRetention", authRequired, async (req: Request, res: Response) => {
    try {
        console.log('Hola')
      const { id, typeRole } = req.user;
      const serviceLayerResponse = await getSalesFunnelCustomerRetUserService(id);      
      if (Array.isArray(serviceLayerResponse.result)) {
        res.status(200).json(serviceLayerResponse.result);
      } else {
        res.status(500).json({ message: "Error al obtener los CUSTOMERRETENTION" });
      }
    } catch (error) {
      const errorController = error as ServiceError;
      res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/marketingIndicators/customerRetention




//CONTROLLER PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERRETENTION DE UN USER
router.get("/customerRetentionBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getCustomerRetBranchService(idBranch, id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los productos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/marketingIndicators/customerRetentionBranch/3b35837d-5459-4e01-9494-2d85c50baef2




//CONTROLLER PARA OBTENER UN CUSTOMERRETENTION POR ID PERTENECIENTE AL USER
router.get("/customerRetention/:idCustomerRetention", authRequired, async (req: Request, res: Response) => {
    try {
        const { idCustomerRetention } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getCustomerRetService(idCustomerRetention, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/marketingIndicators/customerRetention/3b35837d-5459-4e01-9494-2d85c50baef2



//CONTROLLER PARA ACTUALIZAR UN CUSTOMERRETENTION PERTENECIENTE AL USER
router.put("/customerRetention/:idCustomerRetention", authRequired, validateSchema(salesFunnelCustomerRetSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idCustomerRetention } = req.params;
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await putSalesFunnelCustomerRetService(idCustomerRetention, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //PUT - http://localhost:3000/api/marketingIndicators/customerRetention con { "crcRegistrationDate": "2023-09-28T19:45:10.000Z", "crcPeriodOfAnalysis": "NOVIEMBRE USER", "crcDiscountsInvestment": 8000, "crcGuarranteesCosts": 100, "crcAdvertisingInvestment": 15000, "crcSalesTeamCost": 100, "crcSalesComissions": 7000, "crcTransportCosts": 100, "crcEventsCost": 4051, "crcCurrentClients": 100, "branchId": "8fa90b7a-aaa4-4147-b813-aa5f5f7a7735" }




//CONTROLLER PARA ELIMINAR UN REGISTRO DEL CUSTOMERACQUISITION PERTENECIENTE AL USER
router.delete('/customerRetention/:idCustomerRetention', authRequired, async (req: Request, res: Response) => {
    try {
        const { idCustomerRetention } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await deleteSalesFunnelCustomerRetService(idCustomerRetention, id);  
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/marketingIndicators/customerRetention/c8db0efa-c130-4fe8-99c0-74dc9a133740










//^ SALESFUNNELCUSTOMERDIGITAL
//CONTROLLER PARA CREAR UN CUSTOMERDIGITAL EN LA SEDE DE USER
router.post("/customerDigital", authRequired, validateSchema(salesFunnelCustomerDigitalSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await postSalesFunnelCustomerDigitalService(body, id, typeRole);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/marketingIndicators/customerDigital con { "pipelineRegistrationDate": "2023-09-28T19:45:10.000Z", "pipelinePeriodOfAnalysis": "ddddddd", "campaignNumberOfDays": 30, "campaignClicksViews": 1500, "interestedCustomers": 100, "leads": 50, "salesNumber": 20, "branchId": "7c4b9636-13da-4ac3-ab76-2d3115c78356" }



//CONTROLLER PARA OBTENER TODOS LOS CUSTOMERDIGITAL DE UN USER
router.get("/customerDigital", authRequired, async (req: Request, res: Response) => {
    try {
        console.log('Hola')
      const { id, typeRole } = req.user;
      const serviceLayerResponse = await getSalesFunnelCustomerDigitalUserService(id);      
      if (Array.isArray(serviceLayerResponse.result)) {
        res.status(200).json(serviceLayerResponse.result);
      } else {
        res.status(500).json({ message: "Error al obtener los CUSTOMERDIGITAL" });
      }
    } catch (error) {
      const errorController = error as ServiceError;
      res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/marketingIndicators/customerDigital




//CONTROLLER PARA OBTENER TODOS LOS REGISTOS DE UNA SEDE DEL CUSTOMERDIGITAL DE UN USER
router.get("/customerDigitalBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getCustomerDigitalBranchService(idBranch, id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener los productos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/marketingIndicators/customerDigitalBranch/3b35837d-5459-4e01-9494-2d85c50baef2



//CONTROLLER PARA OBTENER UN CUSTOMERDIGITAL POR ID PERTENECIENTE AL USER
router.get("/customerDigital/:idCustomerDigital", authRequired, async (req: Request, res: Response) => {
    try {
        const { idCustomerDigital } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await getCustomerDigitalService(idCustomerDigital, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/marketingIndicators/customerDigital/3b35837d-5459-4e01-9494-2d85c50baef2



//CONTROLLER PARA ACTUALIZAR UN CUSTOMERDIGITAL PERTENECIENTE AL USER
router.put("/customerDigital/:idCustomerDigital", authRequired, validateSchema(salesFunnelCustomerDigitalSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idCustomerDigital } = req.params;
        const body = req.body;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await putSalesFunnelCustomerDigitalService(idCustomerDigital, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //PUT - http://localhost:3000/api/marketingIndicators/customerDigital con { "crcRegistrationDate": "2023-09-28T19:45:10.000Z", "crcPeriodOfAnalysis":  "Marzo ACTUALIZADO", "crcDiscountsInvestment": 100, "crcGuarranteesCosts": 100, "crcAdvertisingInvestment": 100, "crcSalesTeamCost": 100, "crcSalesComissions": 100, "crcTransportCosts": 100, "crcEventsCost": 100, "crcCurrentClients": 100 }



//CONTROLLER PARA ELIMINAR UN REGISTRO DEL CUSTOMERDIGITAL PERTENECIENTE AL USER
router.delete('/customerDigital/:idCustomerDigital', authRequired, async (req: Request, res: Response) => {
    try {
        const { idCustomerDigital } = req.params;
        const { id, typeRole } = req.user;
        const serviceLayerResponse = await deleteSalesFunnelCustomerDigitalService(idCustomerDigital, id);  
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/marketingIndicators/customerDigital/c8db0efa-c130-4fe8-99c0-74dc9a133740


export default router;