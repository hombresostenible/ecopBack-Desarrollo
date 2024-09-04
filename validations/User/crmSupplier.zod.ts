import { z, ZodObject, ZodString, ZodArray } from 'zod';

type CRMSupplierSchemaType = ZodObject<{
    typeDocumentId: ZodString;
    documentId: ZodString;
    email: ZodString;
    phone: ZodString;
}>;

export const crmSupplierSchema: CRMSupplierSchemaType = z.object({
    typeDocumentId: z.string({
        required_error: 'El tipo de documento de identidad del proveedor es requerido',
    }),
    documentId: z.string({
        required_error: 'El número de identidad del proveedor es requerido',
    }),
    email: z.string({
        required_error: 'El email de contacto del proveedor es requerido',
    }).email({
        message: 'El email no es válido',
    }),
    phone: z.string({
        required_error: 'El teléfono de contacto del proveedor es requerido',
    }),
});



type ManyCRMSupplierSchemaType = ZodArray<
    ZodObject<{
        typeDocumentId: ZodString;
        documentId: ZodString;
        email: ZodString;
        phone: ZodString;
    }>
>;

export const manyCRMSupplierSchemaType: ManyCRMSupplierSchemaType = z.array(
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