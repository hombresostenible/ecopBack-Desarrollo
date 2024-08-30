import { z, ZodObject, ZodArray, ZodString } from 'zod';

//ESQUEMA PARA CREAR UNA MERCANCIA
type MerchandiseSchemaType = ZodObject<{
    nameItem: ZodString;
    packaged: ZodString;
    branchId: ZodString;
}>;

export const merchandiseSchemaZod: MerchandiseSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre de la mercancía es requerido',
    }),
    packaged: z.string({
        required_error: 'Es requerido responder si viene o no empacada la mercancía',
    }),
    branchId: z.string({
        required_error: 'La sede de la mercancía es requerida',
    }),
});



//ESQUEMA PARA ACTUALIZAR O CREAR MASIVAMENTE MERCANCIAS
type ManyMerchandiseSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        branchId: ZodString;
    }>
>;

export const manyMerchandiseSchemaZod: ManyMerchandiseSchemaType = z.array(
    z.object({
        nameItem: z.string({
            required_error: 'El nombre de la mercancía es requerido',
        }),
        branchId: z.string({
            required_error: 'La sede de la mercancía es requerida',
        }),
    })
);