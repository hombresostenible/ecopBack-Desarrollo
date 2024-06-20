import { z, ZodObject, ZodArray, ZodString } from 'zod';

//ESQUEMA PARA CREAR UN SERVICIO
type ServiceSchemaType = ZodObject<{
    nameItem: ZodString;
    branchId: ZodString;
    sellingPrice: ZodString;
    IVA: ZodString;
}>;


export const serviceSchemaZod: ServiceSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre del servicio es requerido',
    }),
    branchId: z.string({
        required_error: 'La sede del servicio es requerida',
    }),
    sellingPrice: z.string({
        required_error: 'El precio de venta es requerido',
    }),
    IVA: z.string({
        required_error: 'El IVA es requerido',
    }),
});



//ESQUEMA PARA CREAR MASIVAMENTE SERVICIOS
type ManyServiceSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        branchId: ZodString;
        sellingPrice: ZodString;
        IVA: ZodString;
    }>
>;

export const manyServiceSchemaZod: ManyServiceSchemaType = z.array(
    z.object({
        nameItem: z.string({
            required_error: 'El nombre del servicio es requerido',
        }),
        branchId: z.string({
            required_error: 'La sede del servicio es requerida',
        }),
        sellingPrice: z.string({
            required_error: 'El precio de venta es requerido',
        }),
        IVA: z.string({
            required_error: 'El IVA es requerido',
        }),
    })
);