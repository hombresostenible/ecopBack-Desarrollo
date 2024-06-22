import express, { Request, Response } from "express";
import {
    postAccountsBookService,
    getAccountsBooksService,
    getAccountsBooksIncomesApprovedService,
    getAccountsBooksIncomesApprovedByBranchService,
    getAccountsBooksIncomesNotApprovedService,
    getAccountsBooksExpesesService,
    getAccountsBookByIdService,
    getAccountsBookByBranchService,
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
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await postAccountsBookService(body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/accountsBook con { "registrationDate": "2023-09-19T12:00:00.000Z", "transactionType": "Venta", "item": "Arroz", "productId": "f0f4f10b-449e-46cf-b462-a08d5f37a9ce", "unitValue": 15000, "quantity": 10, "totalValue": 150000, "creditCash": "Credito", "numberOfPayments": 0, "paymentValue": 0, "paymentNumber": 0, "accountsReceivable": 0, "accountsPayable": 0, "seller": "Mario", "branchId": "9da61ca8-eb13-4062-987a-83b7d3b89ca1", "transactionDate": "2023-09-19T12:00:00.000Z" }



//OBTENER TODOS LOS REGISTROS CONTABLES DEL USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBooksService(id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook



//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
router.get("/incomes", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBooksIncomesApprovedService(id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "No se pudieron obtener registros de ingresos aprobados del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/incomes



//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS POR SEDE DEL USER
router.get("/incomes-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBooksIncomesApprovedByBranchService(idBranch, id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else res.status(500).json({ message: "Error al obtener los registros de ingresos aprobados del usuario por sede" });
    } catch (error) {
        const rawMaterialError = error as ServiceError;
        res.status(rawMaterialError.code).json(rawMaterialError.message);
    }
}); //GET - http://localhost:3000/api/accountsBook/aincomes-branch/:idBranch



//OBTENER TODOS LOS REGISTROS DE INGRESOS NO APROBADOS DEL USER
router.get("/incomes-not-approved", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBooksIncomesNotApprovedService(id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/incomes-not-approved



//OBTENER TODOS LOS REGISTROS DE GASTOS DEL USER
router.get("/expenses", authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBooksExpesesService(id);
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {            
            res.status(500).json({ message: "No se pudieron obtener registros de AccountsBook" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/expenses



//OBTENER UN REGISTRO CONTABLE POR ID DEL USER
router.get("/:idAccountsBook", authRequired, async (req: Request, res: Response) => {
    try {
        const { idAccountsBook } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBookByIdService(idAccountsBook, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/userAccountsBookBranch/:idBranch



//OBTENER TODOS LOS REGISTROS CONTABLES POR SEDE DEL USER
router.get("/accountsBook-branch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await getAccountsBookByBranchService(idBranch, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/userAccountsBookBranch/:idBranch



//ACTUALIZAR UN REGISTRO CONTABLE DEL USER
router.put("/:idAccountsBook", authRequired, checkRole, validateSchema(accountsBookSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idAccountsBook } = req.params;
        const body = req.body;
        const { id } = req.user;
        const serviceLayerResponse = await putAccountsBookService(idAccountsBook, body, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //PUT - http://localhost:3000/api/accountsBook/:idAccountsBook con { "transactionDate": "2023-09-19T12:00:00.000Z", "transactionType": "Ingreso", "item": "Nombre del producto/servicio/materiaPrima", "unitValue": "15000", "quantity": "2", "totalValue": "30000" }



//ELIMINAR UN REGISTRO CONTABLE DEL USER
router.delete('/:idAccountsBook', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idAccountsBook } = req.params;
        const { id } = req.user;
        const serviceLayerResponse = await deleteAccountsBookService(idAccountsBook, id);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/accountsBook/:idAccountsBook



export default router;