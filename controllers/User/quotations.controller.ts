// src/controllers/User/quotation.controller.ts
import express, { Request, Response } from 'express';
import {
    createQuotationService,
    getQuotationByIdService,
    updateQuotationService,
    deleteQuotationService,
    getAllQuotationsService,
} from '../../services/User/quotations.service';

import { authRequired } from '../../middlewares/Token/Token.middleware';
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { createQuotationSchema } from '../../validations/User/quotations.zod';
import { ServiceError } from '../../types/Responses/responses.types';

const router = express.Router();

// Crear una nueva cotización
router.post('/', authRequired, validateSchema(createQuotationSchema), async (req: Request, res: Response) => {
    try { 
        const { userId } = req.user;
        const body = req.body;
        body.userId = userId; // Asignar userId desde el token

        const serviceResponse = await createQuotationService(body);
        res.status(serviceResponse.code).json(serviceResponse.result);
    } catch (error) {     
        const errorController = error as ServiceError;
        res.status(errorController.code).json({ message: errorController.message });
    }
});

// Obtener una cotización por ID
router.get('/:id', authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const serviceResponse = await getQuotationByIdService(id);
        res.status(serviceResponse.code).json(serviceResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json({ message: errorController.message });
    }
});

// Actualizar una cotización por ID
router.put('/:id', authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const serviceResponse = await updateQuotationService(id, body);
        res.status(serviceResponse.code).json(serviceResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json({ message: errorController.message });
    }
});

// Eliminar una cotización por ID
router.delete('/:id', authRequired, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const serviceResponse = await deleteQuotationService(id);
        res.status(serviceResponse.code).json({ message: serviceResponse.message });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json({ message: errorController.message });
    }
});

// Obtener todas las cotizaciones
router.get('/', authRequired, async (req: Request, res: Response) => {
    try {
        const serviceResponse = await getAllQuotationsService();
        res.status(serviceResponse.code).json(serviceResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json({ message: errorController.message });
    }
});

export default router;
