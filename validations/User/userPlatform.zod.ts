import { z, ZodObject, ZodString, ZodBoolean, ZodArray } from 'zod';

// VERIFICACION ZOD PARA EL REGISTRO DE USUARIOS
type RegisterUserPlatformSchemaType = ZodObject<{
    name: ZodString;
    lastName: ZodString;
    typeDocumentId: ZodString;
    documentId: ZodString;
    typeRole: ZodString;
    department: ZodString;
    city: ZodString;
    codeDane: ZodString;
    subregionCodeDaneDane: ZodString;
    address: ZodString;
    phone: ZodString;
    email: ZodString;
    password: ZodString;
    isAceptedConditions: ZodBoolean;
}>;

export const userPlatformSchema: RegisterUserPlatformSchemaType = z.object({
    name: z.string({
        required_error: 'El nombre del usuario es requerido',
    }),
    lastName: z.string({
        required_error: 'El apellido del usuario es requerido',
    }),
    typeDocumentId: z.string({
        required_error: 'El tipo de identidad del usuario es requerido',
    }),
    documentId: z.string({
        required_error: 'El número de identidad del usuario es requerido',
    }),
    typeRole: z.string({
        required_error: 'El tipo de rol del usuario es requerido',
    }),
    department: z.string({
        required_error: 'El departamento del usuario es requerido',
    }),
    city: z.string({
        required_error: 'La ciudad del usuario es requerida',
    }),
    codeDane: z.string({
        required_error: 'El código Dane de la ciudad del usuario es requerido',
    }),
    subregionCodeDaneDane: z.string({
        required_error: 'El código de la subregión Dane es requerido',
    }),
    address: z.string({
        required_error: 'La dirección del usuario es requerida',
    }),    
    phone: z.string({
        required_error: 'El número de celular o teléfono del usuario es requerido',
    }),
    email: z.string({
        required_error: 'El email del usuario es requerido',
    }).email({
        message: 'El email no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña del usuario es requerida',
    }).min(6, {
        message: 'La contraseña debe de tener más de seis caracteres',
    }),
    isAceptedConditions: z.boolean({
        required_error: 'Aceptar términos y condiciones para el usuario es requerido',
    }),
});





// VERIFICACION ZOD PARA CREAR USUARIOS DE PLATAFORMA DE MANERA MASIVA
type ManyRegisterUserPlatformSchemaType = ZodArray<
    ZodObject<{
        name: ZodString;
        lastName: ZodString;
        typeDocumentId: ZodString;
        documentId: ZodString;
        typeRole: ZodString;
        permissions: ZodArray<ZodString>;
        department: ZodString;
        city: ZodString;
        codeDane: ZodString;
        subregionCodeDaneDane: ZodString;
        address: ZodString;
        phone: ZodString;
        email: ZodString;
        password: ZodString;
        isAceptedConditions: ZodBoolean;
    }>
>;

export const manyRegisterUserPlatformSchema: ManyRegisterUserPlatformSchemaType = z.array(
    z.object({
        name: z.string({
            required_error: 'El nombre del usuario es requerido',
        }),
        lastName: z.string({
            required_error: 'El apellido del usuario es requerido',
        }),
        typeDocumentId: z.string({
            required_error: 'El tipo de identidad del usuario es requerido',
        }),
        documentId: z.string({
            required_error: 'El número de identidad del usuario es requerido',
        }),
        typeRole: z.string({
            required_error: 'El tipo de rol del usuario es requerido',
        }),
        permissions: z.array(z.string({
            required_error: 'El o los permisos del usuario son requeridos',
        })),
        department: z.string({
            required_error: 'El departamento del usuario es requerido',
        }),
        city: z.string({
            required_error: 'La ciudad del usuario es requerida',
        }),
        codeDane: z.string({
            required_error: 'El código Dane de la ciudad del usuario es requerida',
        }),
        subregionCodeDaneDane: z.string({
            required_error: 'El código de la subregión Dane es requerida',
        }),
        address: z.string({
            required_error: 'La dirección del usuario es requerida',
        }),    
        phone: z.string({
            required_error: 'El número de celular o teléfono del usuario es requerido',
        }),
        email: z.string({
            required_error: 'El email del usuario es requerido',
        }).email({
            message: 'El email no es válido',
        }),
        password: z.string({
            required_error: 'La contraseña del usuario es requerida',
        }).min(6, {
            message: 'La contraseña debe de tener más de seis caracteres',
        }),
        isAceptedConditions: z.boolean({
            required_error: 'Aceptar térm,inos y condiciones para el usuario es requerido',
        }),
    })
);