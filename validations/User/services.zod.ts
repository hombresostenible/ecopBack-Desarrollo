import { z, ZodObject, ZodArray, ZodString, ZodNumber } from 'zod';

//ESQUEMA PARA CREAR UN SERVICIO
type ServiceSchemaType = ZodObject<{
    nameItem: ZodString;
    sellingPrice: ZodString;
    IVA: ZodString;
    branchId: ZodString;
}>;


export const serviceSchemaZod: ServiceSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre del servicio es requerido',
    }),
    sellingPrice: z.string({
        required_error: 'El precio de venta es requerido',
    }),
    IVA: z.string({
        required_error: 'El IVA es requerido',
    }),
    branchId: z.string({
        required_error: 'La sede del servicio es requerida',
    }),
});



//ESQUEMA PARA CREAR MASIVAMENTE SERVICIOS
type ManyServiceSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        sellingPrice: ZodNumber;
        IVA: ZodNumber;
        branchId: ZodString;
    }>
>;

export const manyServiceSchemaZod: ManyServiceSchemaType = z.array(
    z.object({
        nameItem: z.string({
            required_error: 'El nombre del servicio es requerido',
        }),
        sellingPrice: z.number({
            required_error: 'El precio de venta es requerido',
        }),
        IVA: z.number({
            required_error: 'El IVA es requerido',
        }),
        branchId: z.string({
            required_error: 'La sede del servicio es requerida',
        }),
    })
);