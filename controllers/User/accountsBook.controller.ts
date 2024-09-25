import express, { Request, Response } from "express";
import {
    postAccountsBookService,
    getAccountsBooksService,
    getAccountsBookByBranchService,
    getIncomesApprovedService,
    getIncomesApprovedByBranchService,
    getAccountsBooksExpesesService,
    getAccountsBooksExpesesByBranchService,
    getUnapprovedRecordsService,
    getUnapprovedRecordsByBranchService,
    getAccountsBookByIdService,
    patchApproveRecordService,
    putAccountsBookService,
    deleteAccountsBookService,
} from '../../services/User/accountsBook.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole } from '../../middlewares/User/Role.middleware';
import { accountsBookSchemaZod } from '../../validations/User/accountsBook.zod';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//CREAR UN REGISTRO CONTABLE DEL USER
router.post("/", authRequired, validateSchema(accountsBookSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const body = req.body;
        console.log('body: ', body)
        const serviceLayerResponse = await postAccountsBookService(userId, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/accounts-book con { "registrationDate": "2024-09-19T12:00:00.000Z", "transactionDate": "2024-09-19T12:00:00.000Z", "transactionType": "Ingreso", "creditCash": "Contado", "meanPayment": "Efectivo", "otherExpenses": null, "periodicityPayService": null, "periodPayService": null, "itemsSold": [ { "nameItem": "Arroz Roa", "itemId": "9c9d27ad-0ce5-4f33-b1b8-28d0477524b9", "type": "Mercancia", "sellingPrice": 2100, "quantity": 10, "subTotalValue": 21000 }, { "nameItem": "Harina de trigo", "itemId": "f2244600-1302-4ede-8f83-e29b75afd5fb", "type": "Materia Prima", "sellingPrice": 1560, "quantity": 5, "subTotalValue": 7800 } ], "totalValue": 28800, "creditDescription": null, "creditWithInterest": null, "creditInterestRate": null, "numberOfPayments": null, "paymentValue": null, "paymentNumber": null, "accountsReceivable": null, "accountsPayable": null, "transactionCounterpartId": "1110521285", "transactionApproved": true, "seller": "Mario", "branchId": "a3e4c52b-3fc6-4d3f-a981-3fcf40338e0b" }



//OBTENER TODOS LOS REGISTROS CONTABLES PAGINADOS APROBADOS Y NO APROBADOS DEL USER
router.get("/paginated", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsBooksService(
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
}); // GET - http://localhost:3000/api/accounts-book/paginated?page=1&limit=20



//OBTENER TODOS LOS REGISTROS CONTABLES PAGINADOS APROBADOS Y NO APROBADOS POR SEDE DEL USER
router.get("/paginated-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsBookByBranchService(
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
}); // GET - http://localhost:3000/api/accounts-book/paginated-branch/:idBranch?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE INGRESOS PAGINADOS APROBADOS DEL USER
router.get("/incomes", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getIncomesApprovedService(
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
}); // GET - http://localhost:3000/api/accounts-book/incomes?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE INGRESOS PAGINADOS APROBADOS POR SEDE DEL USER
router.get("/incomes-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const { page = 1, limit = 20 } = req.query;
        console.log('userId: ', userId)
        console.log('idBranch: ', idBranch)
        const serviceLayerResponse = await getIncomesApprovedByBranchService(
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
        const rawMaterialError = error as ServiceError;
        res.status(rawMaterialError.code).json(rawMaterialError.message);
    }
}); //GET - http://localhost:3000/api/accounts-book/incomes-branch/:idBranch?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE GASTOS PAGINADOS DEL USER
router.get("/expenses", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsBooksExpesesService(
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
}); // GET - http://localhost:3000/api/accounts-book/expenses?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE GASTOS PAGINADOS APROBADOS POR SEDE DEL USER
router.get("/expenses-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getAccountsBooksExpesesByBranchService(
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
        const rawMaterialError = error as ServiceError;
        res.status(rawMaterialError.code).json(rawMaterialError.message);
    }
}); //GET - http://localhost:3000/api/accounts-book/expenses-branch/:idBranch?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE TRANSACCIONES NO APROBADAS PAGINADAS DEL USER
router.get("/unapproved-records", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getUnapprovedRecordsService(
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
}); // GET - http://localhost:3000/api/accounts-book/unapproved-records?page=1&limit=20



//OBTENER TODOS LOS REGISTROS DE TRANSACCIONES NO APROBADAS PAGINADAS POR SEDE DEL USER
router.get("/unapproved-records/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idBranch } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const serviceLayerResponse = await getUnapprovedRecordsByBranchService(
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
}); // GET - http://localhost:3000/api/accounts-book/unapproved-records/:idBranch



//OBTENER UN REGISTRO CONTABLE POR ID DEL USER
router.get("/:idAccountsBook", authRequired, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAccountsBook } = req.params;
        const serviceLayerResponse = await getAccountsBookByIdService(idAccountsBook, userId);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accounts-book/:idAccountsBook



//APROBAR UN REGISTRO DE INGRESO DEL USER
router.patch("/approve-record/:idAccountsBook", authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAccountsBook } = req.params;
        const serviceLayerResponse = await patchApproveRecordService(userId, idAccountsBook);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const assetError = error as ServiceError;
        res.status(assetError.code).json(assetError.message);
    }
}); //PATCH - http://localhost:3000/api/accounts-book/approve-record/:idAccountsBook



//ACTUALIZAR UN REGISTRO CONTABLE DEL USER
router.put("/:idAccountsBook", authRequired, checkRole, validateSchema(accountsBookSchemaZod), async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAccountsBook } = req.params;
        const body = req.body;
        const serviceLayerResponse = await putAccountsBookService(idAccountsBook, body, userId);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //PUT - http://localhost:3000/api/accounts-book/:idAccountsBook con { "transactionDate": "2023-09-19T12:00:00.000Z", "transactionType": "Ingreso", "item": "Nombre del producto/servicio/materiaPrima", "sellingPrice": "15000", "quantity": "2", "totalValue": "30000" }



//ELIMINAR UN REGISTRO CONTABLE DEL USER
router.delete('/:idAccountsBook', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { idAccountsBook } = req.params;
        const serviceLayerResponse = await deleteAccountsBookService(userId, idAccountsBook);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/accounts-book/:idAccountsBook

export default router;