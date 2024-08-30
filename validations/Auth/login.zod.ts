import { z, ZodObject, ZodString } from 'zod';

// VERIFICACION ZOD PARA LOGIN DE USERS
type LoginSchemaType = ZodObject<{
    email: ZodString;
    password: ZodString;
}>;

export const loginSchema: LoginSchemaType = z.object({
    email: z.string({
        required_error: 'El email es requerido',
    }).email({
        message: 'El email no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
    })
});