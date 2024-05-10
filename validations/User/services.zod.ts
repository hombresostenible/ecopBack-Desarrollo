import { z, ZodObject, ZodArray, ZodString } from 'zod';

//ESQUEMA PARA CREAR UN SERVICIO
type ServiceSchemaType = ZodObject<{
    nameItem: ZodString;
    branchId: ZodString;
}>;


export const serviceSchemaZod: ServiceSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre del servicio es requerido',
    }),
    branchId: z.string({
        required_error: 'La sede del servicio es requerida',
    }),
});



//ESQUEMA PARA CREAR MASIVAMENTE SERVICIOS
type ManyServiceSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        branchId: ZodString;
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
    })
);