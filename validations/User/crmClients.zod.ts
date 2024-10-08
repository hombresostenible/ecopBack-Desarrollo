import { z, ZodObject, ZodString, ZodArray } from 'zod';

type CRMClientsSchemaType = ZodObject<{
    typeDocumentId: ZodString;
    documentId: ZodString;
    email: ZodString;
    phone: ZodString;
}>;

export const crmClientsSchema: CRMClientsSchemaType = z.object({
    typeDocumentId: z.string({
        required_error: 'El tipo de documento de identidad del cliente es requerido',
    }),
    documentId: z.string({
        required_error: 'El número de identidad del cliente es requerido',
    }),
    email: z.string({
        required_error: 'El email de contacto del cliente es requerido',
    }).email({
        message: 'El email no es válido',
    }),
    phone: z.string({
        required_error: 'El teléfono de contacto del cliente es requerido',
    }),
});



//ESQUEMA PARA ACTUALIZAR O CREAR MASIVAMENTE MERCANCIAS
type ManyCRMClientsSchemaType = ZodArray<
    ZodObject<{
        typeDocumentId: ZodString;
        documentId: ZodString;
        email: ZodString;
        phone: ZodString;
    }>
>;

export const manyCRMClientsSchemaType: ManyCRMClientsSchemaType = z.array(
    z.object({
        typeDocumentId: z.string({
            required_error: 'El tipo de documento de identidad del cliente es requerido',
        }),
        documentId: z.string({
            required_error: 'El número de identidad del cliente es requerido',
        }),
        email: z.string({
            required_error: 'El email de contacto del cliente es requerido',
        }).email({
            message: 'El email no es válido',
        }),
        phone: z.string({
            required_error: 'El teléfono de contacto del cliente es requerido',
        }),
    })
);