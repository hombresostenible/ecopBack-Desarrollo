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

    //INVENTARIO DE PRODUCTO
    getProductsInventoryService,
    getProductsInventoryBranchService,

    //INVENTARIO DE MATERIAS PRIMAS
    getRawMaterialsInventoryService,
    getRawMaterialsInventoryBranchService,

    //INVENTARIO DE ACIVOS
    getAssetsInventoryService,
    getaAssetsInventoryBranchService,

    //INVENTARIO DE MERCANCIA
    getMerchandisesInventoryService,
    getaMerchandisesInventoryBranchService,
} from "../../../services/User/Indicators/financialIndicators.service";
import { ServiceError } from '../../../types/Responses/responses.types';
import { authRequired } from '../../../middlewares/Token/Token.middleware';
const router = express.Router();



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO
router.get("/salesPerPeriod", authRequired,async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getSalesPerPeriodService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de ventas del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/salesPerPeriod

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DE UNA SEDE DEL USUARIO
router.get("/salesPerPeriod/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getSalesPerPeriodBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de ventas de la sede escogida del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/salesPerPeriod/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS DEL USUARIO
router.get("/expensesPerPeriod", authRequired,async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getExpensesPerPeriodService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de gastos del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/expensesPerPeriod

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS DE UNA SEDE DEL USUARIO
router.get("/expensesPerPeriod/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getExpensesPerPeriodBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener los registros de gastos de la sede escogida del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/expensesPerPeriod/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO
router.get("/allTransactionsPerPeriod", authRequired,async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAllTransactionsService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/allTransactionsPerPeriod

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO
router.get("/allTransactionsPerPeriod/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAllTransactionsBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook para esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/allTransactionsPerPeriod/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DEL USUARIO
router.get("/accountsReceivable", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAccountsReceivableService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por cobrar del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/accountsReceivable

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DE UNA SEDE DEL USUARIO
router.get("/accountsReceivable/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAccountsReceivableBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por cobrar de esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/accountsReceivable/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DEL USUARIO
router.get("/accountsPayable", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAccountsPayableService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por pagar del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/accountsPayable

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DE UNA SEDE DEL USUARIO
router.get("/accountsPayable/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAccountsPayableBranchService(idBranch, id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por pagar de esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/accountsPayable/:idBranch



//CONTROLLER PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DEL USUARIO
router.get("/bestClientValue", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getBestClientValueService(id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/bestClientValue

//CONTROLLER PARA OBTENER LISTA DE MEJORES CLIENTES POR VALOR DE UNA SEDE DEL USUARIO
router.get("/bestClientValue/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getBestClientValueBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }    
}); // GET - http://localhost:3000/api/financialIndicators/bestClientValue/:idBranch    



//CONTROLLER PARA OBTENER LISTA DE CLIENTE FRECUENTE DEL USUARIO
router.get("/bestClientQuantity", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getBestClientQuantityService(id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/bestClientQuantity

//CONTROLLER PARA OBTENER LISTA DE CLIENTE FRECUENTE POR SEDE DEL USUARIO
router.get("/bestClientQuantity/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getBestClientQuantityBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/bestClientQuantity/:idBranch



//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO PARA CALCULAR EL TICKET PROMEDIO
router.get("/averageTicketPerPeriod", authRequired,async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAverageTicketTicketService(id, userType);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financialIndicators/averageTicketPerPeriod

//CONTROLLER PARA OBTENER TODOS LOS REGISTROS DE VENTAS DEL USUARIO PARA CALCULAR EL TICKET PROMEDIO POR SEDE
router.get("/averageTicketPerPeriod/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAverageTicketTicketBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/averageTicketPerPeriod/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE PRODUCTOS DEL USUARIO
router.get("/productsInventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getProductsInventoryService(id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/productsInventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE PRODUCTOS POR SEDE DEL USUARIO
router.get("/productsInventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getProductsInventoryBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/productsInventory/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS DEL USUARIO
router.get("/rawmaterialsInventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getRawMaterialsInventoryService(id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/rawmaterialsInventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE MATERIAS PRIMAS POR SEDE DEL USUARIO
router.get("/rawmaterialsInventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getRawMaterialsInventoryBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/rawmaterialsInventory/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE MAQUINAS DEL USUARIO
router.get("/assetsInventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getAssetsInventoryService(id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/assetsInventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE MAQUINAS POR SEDE DEL USUARIO
router.get("/assetsInventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getaAssetsInventoryBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/assetsInventory/:idBranch



//CONTROLLER PARA OBTENER EL INVENTARIO DE MERCANCIA DEL USUARIO
router.get("/merchandisesInventory", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getMerchandisesInventoryService(id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/merchandisesInventory

//CONTROLLER PARA OBTENER EL INVENTARIO DE MERCANCIA POR SEDE DEL USUARIO
router.get("/merchandisesInventory/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType, employerId, typeRole, userBranchId } = req.user;
        const serviceLayerResponse = await getaMerchandisesInventoryBranchService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financialIndicators/merchandisesInventory/:idBranch



export default router;