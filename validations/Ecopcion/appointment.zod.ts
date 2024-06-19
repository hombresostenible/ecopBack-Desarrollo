import { z, ZodObject, ZodString, ZodBoolean } from 'zod';

type AppointmentSchemaType = ZodObject<{
    typeClient: ZodString;
    email: ZodString;
    phone: ZodString;
    date: ZodString;
    hour: ZodString;
    stateAppointment: ZodString;
    acceptPersonalDataPolicy: ZodBoolean;
}>;


export const appointmentSchemaZod: AppointmentSchemaType = z.object({
    typeClient: z.string({
        required_error: 'Type Client is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    }),
    phone: z.string({
        required_error: 'Phone is required',
    }),
    date: z.string({
        required_error: 'Date is required',
    }),
    hour: z.string({
        required_error: 'Hour is required',
    }),
    stateAppointment: z.string({
        required_error: 'State Appointment is required',
    }),
    acceptPersonalDataPolicy: z.boolean({
        required_error: 'Accept Personal Data Policy is required',
    }),
});