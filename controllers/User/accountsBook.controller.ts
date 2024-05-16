import express, { Request, Response } from "express";
import {
    postAccountsBookService,
    getAccountsBooksService,
    getAccountsBookService,
    getItemBarCodeService,
    getNameItemService,
    getAllItemsService,
    putAccountsBookService,
    deleteAccountsBookService
} from '../../services/User/accountsBook.service';
import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { checkRole } from '../../middlewares/User/Role.middleware';
import { accountsBookSchemaZod } from '../../validations/User/accountsBook.zod';
import { ServiceError } from '../../types/Responses/responses.types';
const router = express.Router();

//CONTROLLER PARA CREAR EL REGISTRO EN EL LIBRO DIARIO
router.post("/", authRequired, validateSchema(accountsBookSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await postAccountsBookService(body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //POST - http://localhost:3000/api/accountsBook con { "registrationDate": "2023-09-19T12:00:00.000Z", "transactionType": "Venta", "item": "Arroz", "productId": "f0f4f10b-449e-46cf-b462-a08d5f37a9ce", "unitValue": 15000, "quantity": 10, "totalValue": 150000, "creditCash": "Crédito", "numberOfPayments": 0, "paymentValue": 0, "paymentNumber": 0, "accountsReceivable": 0, "accountsPayable": 0, "seller": "Mario", "branchId": "9da61ca8-eb13-4062-987a-83b7d3b89ca1", "transactionDate": "2023-09-19T12:00:00.000Z" }



//CONTROLLER PARA OBTENER LOS REGISTROS DE TODAS LAS SEDES DE UN USER
router.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const { id, userType } = req.user;
        const serviceLayerResponse = await getAccountsBooksService(id, userType);
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



//CONTROLLER PARA OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID PERTENECIENTE AL USER
router.get("/userAccountsBookBranch/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getAccountsBookService(idBranch, id, userType);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/userAccountsBookBranch/:idBranch



//CONTROLLER PARA BUSCAR UN ITEM DE MERCHANDISE, ASSETS, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
router.get("/userAccountsBookBranch/:idBranch/:barCode", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch, barCode } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getItemBarCodeService(idBranch, barCode, id, userType);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/userAccountsBookBranch/:idBranch/:barCode



//BUSCA UN ARTICULO POR NOMBRE EN TODAS LAS TABLAS
router.get("/userItem/:idBranch/query?", authRequired, async (req: Request, res: Response) => {
    try {
        const nameItem = req.query.nameItem as string | undefined;
        if (!nameItem) {
            return res.status(400).json({ error: 'El parámetro nameItem es requerido.' });
        }
        const { id } = req.user;
        const serviceLayerResponse = await getNameItemService(nameItem, id);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/userItem/:idBranch/query?



//CONTROLLER PARA OBTENER TODOS LOS ACTIVOS, MERCANCIAS, PRODUCTOS, MATERIAS PRIMAS Y SERVICIOS POR SEDE DE UN USER O COMPANY
router.get("/userItem/:idBranch", authRequired, async (req: Request, res: Response) => {
    try {
        const { idBranch } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await getAllItemsService(idBranch, id, userType);
        if (serviceLayerResponse.result) {
            res.status(200).json({ data: serviceLayerResponse.result }); // Enviando las tablas dentro de un objeto 'data'
        } else {
            res.status(500).json({ message: "Error al obtener los clientes del usuario" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/accountsBook/userItem/:idBranch



//CONTROLLER PARA ACTUALIZAR UN REGISTRO EN EL LIBRO DIARIO PERTENECIENTE AL USER O COMPANY
router.put("/userAccountsBook/:idAccountsBook", authRequired, checkRole, validateSchema(accountsBookSchemaZod), async (req: Request, res: Response) => {
    try {
        const { idAccountsBook } = req.params;
        const body = req.body;
        const { id, userType } = req.user;
        const serviceLayerResponse = await putAccountsBookService(idAccountsBook, body, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); //PUT - http://localhost:3000/api/accountsBook/userAccountsBook/:idAccountsBook con { "transactionDate": "2023-09-19T12:00:00.000Z", "transactionType": "Ingreso", "item": "Nombre del producto/servicio/materiaPrima", "unitValue": "15000", "quantity": "2", "totalValue": "30000" }



//CONTROLLER PARA ELIMINAR UN REGISTRO DEL LIBRO DIARIO PERTENECIENTE AL USER O COMPANY
router.delete('/userAccountsBook/:idAccountsBook', authRequired, checkRole, async (req: Request, res: Response) => {
    try {
        const { idAccountsBook } = req.params;
        const { id, userType } = req.user;
        const serviceLayerResponse = await deleteAccountsBookService(idAccountsBook, id, userType);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/accountsBook/userAccountsBook/:idAccountsBook



export default router;