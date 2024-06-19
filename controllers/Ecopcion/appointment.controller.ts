import express, { Request, Response } from "express";
import {
    postAppointmentService,
    getAppointmentService,
    getIdAppointmentService,
    putAppointmentService,
    deleteAppointmentService,
    getConsultAdAppointmentService,
} from "../../services/Ecopcion/appointment.service";
import { validateSchema } from '../../middlewares/Schema/Schema.middleware';
import { appointmentSchemaZod } from '../../validations/Ecopcion/appointment.zod';
import { ServiceError } from "../../types/Responses/responses.types";
const router = express.Router();

//CONTROLLER PARA CREAR UNA CITA PARA USER
router.post("/", validateSchema(appointmentSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const serviceLayerResponse = await postAppointmentService(body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // POST - http://localhost:3000/api/appointment con { "typeClient": "User", "nameClient": "Carlos", "lastNameClient": "Reyes", "nameCompany": "", "nameCompanyLeader": "", "lastNameCompanyLeader": "", "email": "carlos@gmail.com", "phone": "3128082002", "date": "2023-12-27T00:00:00.000Z", "hour": "10:00", "stateAppointment": "Programada", "acceptPersonalDataPolicy": true, "typeAppointment": "Negocio", "typeAppointmentIndicator": "Finanzas", "typeAppointmentIndicatorFinantial": "VentasPeriodo", "typeAppointmentIndicatorMarketing": "", "typeAppointmentIndicatorSustainability": "", "typeAppointmentPlatform": "", "typeAppointmentOthers": "" }



//CONTROLLER PARA VER TODAS LAS CITAS EN LA PLATAFORMA
router.get("/", async (req: Request, res: Response) => {
    try {
        const serviceLayerResponse = await getAppointmentService();
        if (Array.isArray(serviceLayerResponse.result)) {
            res.status(200).json(serviceLayerResponse.result);
        } else {
            res.status(500).json({ message: "Error al obtener todas las citas de la plataforma" });
        }
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/appointment



//CONTROLLER PARA BUSCAR UNA CITA POR SU IDAPPOINTMENT
router.get('/consultAdAppointment', async (req: Request, res: Response) => {
    try {
        const appointmentId = req.query.appointmentId as string;
        if (appointmentId === undefined) {
            res.status(400).json({ error: 'Falta el parámetro appointmentId' });
            return;
        }
        const serviceLayerResponse = await getConsultAdAppointmentService(appointmentId);
        res.status(200).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/appointment/consultAdAppointment?appointmentId=2



//CONTROLLER PARA UNA CITA POR ID EN LA PLATAFORMA
router.get("/:appointmentId", async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;
        const serviceLayerResponse = await getIdAppointmentService(appointmentId);
        res.status(serviceLayerResponse.code).json({ result: serviceLayerResponse.result });
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // GET - http://localhost:3000/api/appointment/:appointmentId



//CONTROLLER PARA ACTUALIZAR UNA CITA PARA USER
router.put("/:appointmentId", validateSchema(appointmentSchemaZod), async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { appointmentId } = req.params;
        const serviceLayerResponse = await putAppointmentService(appointmentId, body);
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.result);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // PUT - http://localhost:3000/api/appointment/:appointmentId con { "typeClient": "User", "email": "carlos@gmail.com", "phone": "3128082002", "date": "2023-12-27T00:00:00.000Z", "hour": "10:40", "stateAppointment": "Reagendada", "acceptPersonalDataPolicy": true }



//CONTROLLER PARA ELIMINAR UNA CITA PARA USER
router.delete('/:appointmentId', async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;
        const serviceLayerResponse = await deleteAppointmentService(appointmentId); 
        res.status(serviceLayerResponse.code).json(serviceLayerResponse.message);
    } catch (error) {
        const errorController = error as ServiceError;
        res.status(errorController.code).json(errorController.message);
    }
}); // DELETE - http://localhost:3000/api/appointment/:appointmentId


export default router;