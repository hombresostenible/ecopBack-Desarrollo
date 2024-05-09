import { z, ZodObject, ZodArray, ZodString, ZodBoolean } from 'zod';

// VERIFICACION ZOD PARA REGISTRO DE USUARIOS
type RegisterUserSchemaType = ZodObject<{
    typeDocumentId: ZodString;
    documentId: ZodString;
    verificationDigit: ZodString;
    userType: ZodString;
    typeRole: ZodString;
    economicSector: ZodString;
    codeCiiu: ZodString;
    department: ZodString,
    city: ZodString,
    codeDane: ZodString;
    subregionCodeDane: ZodString;
    address: ZodString,
    postalCode: ZodString,
    phone: ZodString;
    email: ZodString;
    password: ZodString;
    isAceptedConditions: ZodBoolean,
}>;

export const registerUserSchema: RegisterUserSchemaType = z.object({
    typeDocumentId: z.string({
        required_error: 'El tipo de identidad es requerido',
    }),
    documentId: z.string({
        required_error: 'El número de identidad es requerido',
    }),
    verificationDigit: z.string({
        required_error: 'El dígito de verificación es requerido',
    }),
    userType: z.string({
        required_error: 'El tipo de usuario es requerido',
    }),
    typeRole: z.string({
        required_error: 'El tipo de rol es requerido',
    }),
    economicSector: z.string({
        required_error: 'El sector económico es requerido',
    }),
    codeCiiu: z.string({
        required_error: 'El código CIIU es requerido',
    }),
    department: z.string({
        required_error: 'El departamento de residencia es requerido',
    }),
    city: z.string({
        required_error: 'La ciudad de residencia es requerida',
    }),
    codeDane: z.string({
        required_error: 'El código Dane de la ciudad es requerido',
    }),
    subregionCodeDane: z.string({
        required_error: 'El código Dane de la subregión es requerido',
    }),
    address: z.string({
        required_error: 'La dirección de domicilio es requerida',
    }),
    postalCode: z.string({
        required_error: 'El código posta es requerido',
    }),
    phone: z.string({
        required_error: 'El celular o teléfono de contacto es requerido',
    }),
    email: z.string({
        required_error: 'El email es requerido',
    }).email({
        message: 'El Email no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe de ser de más de 6 caracteres',
    }),
    isAceptedConditions: z.boolean({
        required_error: 'Aceptar términos y condiciones es requerido',
    }),
});