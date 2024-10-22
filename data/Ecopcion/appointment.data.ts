import Appointment from '../../schema/Ecopcion/appointment.schema';
import sequelize from '../../db';
import {
    transporterZoho,
    mailDetailAppointmentUser,
    mailUpdateAppointmentUser,
    mailCancelAppointmentUser,
} from '../../libs/nodemailer';
import { IAppointment } from "../../types/Ecopcion/appointment.types";
import { ServiceError } from "../../types/Responses/responses.types";

//DATA PARA CREAR UNA CITA PARA USER
export const postAppointmentData = async (body: IAppointment): Promise<any> => {
    const t = await sequelize.transaction();
    try {
        const existingAppointment = await Appointment.findOne({
            where: { date: body.date, hour: body.hour, stateAppointment: 'Programada' },
            transaction: t,
        });
        if (existingAppointment) {
            await t.rollback();
            throw new ServiceError(400, "Ya hay una cita para esa fecha y hora");
        } else {
            const countAppointments = await Appointment.count({ transaction: t });
            const consecutivo = countAppointments + 1;
            const newAppointment = new Appointment({
                ...body,
                appointmentId: consecutivo
            });
            await newAppointment.save({ transaction: t });
            const originalDate = new Date(body.date);
            const day = originalDate.getDate();
            const monthIndex = originalDate.getMonth();
            const year = originalDate.getFullYear();
            const spanishMonths = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            const date = `${day} de ${spanishMonths[monthIndex]} del ${year}`;
            if (body.typeClient === 'User') {
                if (body.nameClient) {
                    const mailOptions = mailDetailAppointmentUser(body.email, body.nameClient, date, body.hour, newAppointment.appointmentId);
                    try {
                        await transporterZoho.sendMail(mailOptions);
                    } catch (emailError) {
                        await t.rollback();
                        throw new ServiceError(500, 'Error al enviar el correo electrónico');
                    }
                }
            }

            await t.commit(); // Confirma la transacción
            return newAppointment;
        }
    } catch (error) {
        await t.rollback(); // Revierte la transacción en caso de error
        throw error;
    }
};



//DATA PARA OBTENER TODAS LAS CITAS DE TODOS LOS USER - CEO PLATATORMA
export const getAppointmentData = async (): Promise<any> => {
    try {
        const appointments = await Appointment.findAll();
        return appointments;
    } catch (error) {
        throw error;
    }
};



//DATA PARA BUSCAR UNA CITA POR SU IDAPPOINTMENT
export const getConsultAdAppointmentData = async (appointmentId: string): Promise<any> => {
    try {
        const appointmentFound = await Appointment.findOne({ where: { appointmentId: appointmentId } });
        if (!appointmentFound) throw new Error("Cita no encontrada");
        return appointmentFound;
    } catch (error) {
        throw error;
    }
};



//DATA PARA OBTENER UNA CITA POR ID DEL USER - CEO PLATATORMA
export const getIdAppointmentData = async (appointmentId: string): Promise<any> => {
    try {
        const appointments = await Appointment.findOne({
            where: { userId: appointmentId },
        });
        return appointments;
    } catch (error) {
        throw error;
    }
};



//DATA PARA ACTUALIZAR UN PRODUCTO PERTENECIENTE AL USER
export const putAppointmentData = async (appointmentId: string, body: IAppointment): Promise<IAppointment | null> => {
    const t = await sequelize.transaction();
    try {
        const [rowsUpdated] = await Appointment.update(body, { where: { userId: appointmentId }, transaction: t });

        if (rowsUpdated === 0) {
            await t.rollback();
            throw new ServiceError(404, "No se encontró ninguna cita para actualizar");
        }
        const updatedAppointment = await Appointment.findByPk(appointmentId, { transaction: t });
        if (!updatedAppointment) {
            await t.rollback();
            throw new ServiceError(404, "No se encontró ninguna cita para actualizar");
        }
        if (body.stateAppointment === 'Reagendada') {
            if (body.nameClient) {
                const mailOptions = mailUpdateAppointmentUser(body.email, body.nameClient, body.date, body.hour);
                try {
                    await transporterZoho.sendMail(mailOptions);
                } catch (emailError) {
                    await t.rollback();
                    throw new ServiceError(500, 'Error al enviar el correo electrónico');
                }
            }
        }


        if (body.stateAppointment === 'Cancelada') {
            if (body.nameClient) {
                const mailOptions = mailCancelAppointmentUser(body.email, body.nameClient, body.date, body.hour);
                try {
                    await transporterZoho.sendMail(mailOptions);
                } catch (emailError) {
                    await t.rollback();
                    throw new ServiceError(500, 'Error al enviar el correo electrónico');
                }
            }
        }
        await t.commit();
        return updatedAppointment;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};



//DATA PARA ELIMINAR UN PRODUCTO PERTENECIENTE AL USER
export const deleteAppointmentData = async (appointmentId: string): Promise<void> => {
    try {
        const appointmentFound = await Appointment.findOne({ where: { userId: appointmentId } });
        if (!appointmentFound) throw new Error("Cita no encontrada");
        await Appointment.destroy({ where: { userId: appointmentId } });
    } catch (error) {
        throw error;
    }
};