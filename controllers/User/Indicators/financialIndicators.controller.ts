import express, { Request, Response } from "express";
import {
    //VENTAS DEL PERIODO
    getSalesPerPeriodService,
    getSalesPerPeriodBranchService,

    //GASTOS DEL PERIODO
    getExpensesPerPeriodService,
    getExpensesPerPeriodBranchService,

    //TODAS LAS TRANSACCIONES
    getAllTransactionsService,
    getAllTransactionsBranchService,

    //CUENTAS POR COBRAR
    getAccountsReceivableService,
    getAccountsReceivableBranchService,

    //CUENTAS POR PAGAR
    getAccountsPayableService,
    getAccountsPayableBranchService,

    //MEJOR CLIENTE POR VALOR
    getBestClientValueService,
    getBestClientValueBranchService,

    //MEJOR CLIENTE POR CANTIDAD
    getBestClientQuantityService,
    getBestClientQuantityBranchService,

    //TICKET PROMEDIO
    getAverageTicketTicketService,
    getAverageTicketTicketBranchService,

    //INVENTARIO DE ACIVOS
    getAssetsInventoryService,
    getaAssetsInventoryBranchService,

    //INVENTARIO DE MERCANCIA
    getMerchandisesInventoryService,
    getaMerchandisesInventoryBranchService,

    //INVENTARIO DE PRODUCTO
    getProductsInventoryService,
    getProductsInventoryBranchService,

    //INVENTARIO DE MATERIAS PRIMAS
    getRawMaterialsInventoryService,
    getRawMaterialsInventoryBranchService,
} from "../../../services/User/Indicators/financialIndicators.service";
import { ServiceError } from '../../../types/Responses/responses.types';
import { authRequired } from '../../../middlewares/Token/Token.middleware';
const router = express.Router();

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO
router.get("/sales-per-period", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getSalesPerPeriodService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de ventas del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/sales-per-period



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DE UNA SEDE DEL USUARIO
router.get("/sales-per-period/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getSalesPerPeriodBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de ventas de la sede escogida del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/sales-per-period/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS DEL USUARIO
router.get("/expenses-per-period", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getExpensesPerPeriodService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de gastos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/expenses-per-period

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS DE UNA SEDE DEL USUARIO
router.get("/expenses-per-period/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getExpensesPerPeriodBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de gastos de la sede escogida del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/expenses-per-period/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO
router.get("/all-transactions-per-period", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAllTransactionsService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/all-transactions-per-period

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO
router.get("/all-transactions-per-period/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAllTransactionsBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook para esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/all-transactions-per-period/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DEL USUARIO
router.get("/accounts-receivable", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAccountsReceivableService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por cobrar del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-receivable

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DE UNA SEDE DEL USUARIO
router.get("/accounts-receivable/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAccountsReceivableBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por cobrar de esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-receivable/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DEL USUARIO
router.get("/accounts-payable", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAccountsPayableService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por pagar del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-payable



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DE UNA SEDE DEL USUARIO
router.get("/accounts-payable/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAccountsPayableBranchService(idBranch, userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por pagar de esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-payable/:idBranch



//CONTROLLER PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DEL USUARIO
router.get("/best-client-value", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getBestClientValueService(userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/best-client-value

//CONTROLLER PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DE UNA SEDE DEL USUARIO
router.get("/best-client-value/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getBestClientValueBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }    
}); // GET - http://localhost:3000/api/financial-indicator/best-client-value/:idBranch    



//CONTROLLER PARA OBTENER LISTA DE CLIENTE FRECUENTE DEL USUARIO
router.get("/best-client-quantity", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getBestClientQuantityService(userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/best-client-quantity

//CONTROLLER PARA OBTENER LISTA DE CLIENTE FRECUENTE POR SEDE DEL USUARIO
router.get("/best-client-quantity/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getBestClientQuantityBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/best-client-quantity/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO PARA CALCULAR EL TICKET PROMEDIO
router.get("/average-ticket-per-period", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAverageTicketTicketService(userId);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/average-ticket-per-period

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO PARA CALCULAR EL TICKET PROMEDIO POR SEDE
router.get("/average-ticket-per-period/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAverageTicketTicketBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/average-ticket-per-period/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE MAQUINAS DEL USUARIO
router.get("/assets-inventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getAssetsInventoryService(userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/assets-inventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE MAQUINAS POR SEDE DEL USUARIO
router.get("/assets-inventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getaAssetsInventoryBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/assets-inventory/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE MERCANCIA DEL USUARIO
router.get("/merchandises-inventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getMerchandisesInventoryService(userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/merchandises-inventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE MERCANCIA POR SEDE DEL USUARIO
router.get("/merchandises-inventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getaMerchandisesInventoryBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/merchandises-inventory/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE PRODUCTOS DEL USUARIO
router.get("/products-inventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getProductsInventoryService(userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/products-inventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE PRODUCTOS POR SEDE DEL USUARIO
router.get("/products-inventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getProductsInventoryBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/products-inventory/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS DEL USUARIO
router.get("/rawmaterials-inventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const serviceLayerResponse = await getRawMaterialsInventoryService(userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/rawmaterials-inventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS POR SEDE DEL USUARIO
router.get("/rawmaterials-inventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getRawMaterialsInventoryBranchService(idBranch, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/rawmaterials-inventory/:idBranch



export default router;