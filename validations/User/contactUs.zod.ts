import { z, ZodObject, ZodString, ZodBoolean } from 'zod';

// VERIFICACION ZOD PARA EL FORMULARIO DE CONTACTANOS
type ContactUsSchemaType = ZodObject<{
    email: ZodString;
    userName: ZodString;
    phone: ZodString;
    helpDescription: ZodString;
    isAceptedConditions: ZodBoolean;
}>;

export const contactUsSchema: ContactUsSchemaType = z.object({
    email: z.string({
        required_error: 'El email del usuario es requerido',
    }).email({
        message: 'El email no es válido',
    }),
    userName: z.string({
        required_error: 'El nombre del usuario es requerido',
    }),
    phone: z.string({
        required_error: 'El número de celular o teléfono del usuario es requerido',
    }),
    helpDescription: z.string({
        required_error: 'La descripción es requerida',
    }),
    isAceptedConditions: z.boolean({
        required_error: 'Aceptar términos y condiciones para el usuario es requerido',
    }),
});