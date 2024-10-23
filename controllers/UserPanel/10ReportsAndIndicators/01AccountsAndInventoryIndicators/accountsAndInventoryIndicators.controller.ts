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
    getAccountsReceivablePaginatedService,
    getAccountsReceivableBranchService,
    getAccountsReceivableBranchPaginatedService,

    //CUENTAS POR PAGAR
    getAccountsPayableService,
    getAccountsPayablePaginatedService,
    getAccountsPayableBranchService,
    getAccountsPayableBranchPaginatedService,

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
} from "../../../../services/UserPanel/10ReportsAndIndicators/01AccountsAndInventoryIndicators/accountsAndInventoryIndicators.service";
import { ServiceError } from '../../../../types/Responses/responses.types';
import { authRequired } from '../../../../middlewares/Token/Token.middleware';
const router = express.Router();

//OBTENER TODOS LOS REGISTROS DE VENTAS DEL PERIODO DEL USUARIO
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



//OBTENER TODOS LOS REGISTROS DE VENTAS DEL PERIODO DE UNA SEDE DEL USUARIO
router.get("/sales-per-period/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getSalesPerPeriodBranchService(userId, idBranch);
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



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL PERIODO DEL USUARIO
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



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL PERIODO DE UNA SEDE DEL USUARIO
router.get("/expenses-per-period/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getExpensesPerPeriodBranchService(userId, idBranch);
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



//OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO DEL PERIODO
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



//OBTENER TODOS LOS REGISTROS DE GASTOS Y VENTAS DE UNA SEDE DEL USUARIO PARA CALCULAR LA UTILIDAD, TICKET PROMEDIO DEL PERIODO
router.get("/all-transactions-per-period/:idBranch", authRequired,async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAllTransactionsBranchService(userId, idBranch);
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



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DEL USUARIO
router.get("/indicator-accounts-receivable", authRequired, async (req: Request, res: Response) => {
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
}); //GET - http://localhost:3000/api/financial-indicator/indicator-accounts-receivable



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR PAGINADOS DEL USUARIO
router.get("/accounts-receivable-paginated", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsReceivablePaginatedService(
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
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-receivable-paginated?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR DE UNA SEDE DEL USUARIO
router.get("/indicator-accounts-receivable/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAccountsReceivableBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por cobrar de esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/indicator-accounts-receivable/:idBranch



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR COBRAR PAGINADOS DE UNA SEDE DEL USUARIO
router.get("/accounts-receivable-paginated/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsReceivableBranchPaginatedService(
            userId,
            idBranch,
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
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-receivable-paginated/:idBranch?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DEL USUARIO
router.get("/indicator-accounts-payable", authRequired, async (req: Request, res: Response) => {
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
}); //GET - http://localhost:3000/api/financial-indicator/indicator-accounts-payable



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR PAGINADOS DEL USUARIO
router.get("/accounts-payable-paginated", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsPayablePaginatedService(
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
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-payable-paginated



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR DE UNA SEDE DEL USUARIO
router.get("/indicator-accounts-payable/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const serviceLayerResponse = await getAccountsPayableBranchService(userId, idBranch);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de cuentas por pagar de esta sede" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/indicator-accounts-payable/:idBranch



//OBTENER TODOS LOS REGISTROS DE CUENTAS POR PAGAR PAGINADOS DE UNA SEDE DEL USUARIO
router.get("/accounts-payable-paginated/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsPayableBranchPaginatedService(
            userId,
            idBranch,
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
        res.status(errorController.code).json(errorController.message);
    }
}); //GET - http://localhost:3000/api/financial-indicator/accounts-payable-paginated/:idBranch



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
        const serviceLayerResponse = await getBestClientValueBranchService(userId, idBranch);
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
        const serviceLayerResponse = await getBestClientQuantityBranchService(userId, idBranch);
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
        const serviceLayerResponse = await getAverageTicketTicketBranchService(userId, idBranch);
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
        const serviceLayerResponse = await getaAssetsInventoryBranchService(userId, idBranch);
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
        const serviceLayerResponse = await getaMerchandisesInventoryBranchService(userId, idBranch);
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
        const serviceLayerResponse = await getProductsInventoryBranchService(userId, idBranch);
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
        const serviceLayerResponse = await getRawMaterialsInventoryBranchService(userId, idBranch);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/financial-indicator/rawmaterials-inventory/:idBranch

export default router;