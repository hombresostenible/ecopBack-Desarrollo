import { z, ZodObject, ZodString, ZodBoolean } from 'zod';

const selectedTopicEnum = z.enum(['Indicadores', 'Inventario', 'Facturacion electronica', 'Otro']);

type ContactUsSchemaType = ZodObject<{
    email: ZodString;
    nameUser: ZodString;
    phone: ZodString;
    selectedTopic: typeof selectedTopicEnum;
    helpDescription: ZodString;
    isAceptedConditions: ZodBoolean;
}>;

export const contactUsSchema: ContactUsSchemaType = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Email is not valid',
    }),
    nameUser: z.string({
        required_error: 'Name User is required',
    }),
    phone: z.string({
        required_error: 'Phone is required',
    }),
    selectedTopic: selectedTopicEnum,
    helpDescription: z.string({
        required_error: 'Help Description is required',
    }),
    isAceptedConditions: z.boolean({
        required_error: 'Accept Personal Data Policy is required',
    }),
});