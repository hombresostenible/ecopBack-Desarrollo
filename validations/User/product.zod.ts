import { z, ZodObject, ZodArray, ZodString } from 'zod';

//ESQUEMA PARA CREAR UN PRODUCTO
type ProductSchemaType = ZodObject<{
    nameItem: ZodString;
    packaged: ZodString;
    branchId: ZodString;
}>;


export const productSchemaZod: ProductSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre del producto es requerido',
    }),
    packaged: z.string({
        required_error: 'Es requerido responder si viene o no empacado el producto',
    }),
    branchId: z.string({
        required_error: 'La sede del producto es requerida',
    }),
});



//ESQUEMA PARA ACTUALIZAR O CREAR MASIVAMENTE PRODUCTOS
type ManyProductSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        packaged: ZodString;
        branchId: ZodString;
    }>
>;

export const manyProductSchemaZod: ManyProductSchemaType = z.array(
    z.object({
        nameItem: z.string({
            required_error: 'El nombre del producto es requerido',
        }),
        packaged: z.string({
            required_error: 'Es requerido responder si viene o no empacado el producto',
        }),
        branchId: z.string({
            required_error: 'La sede del producto es requerida',
        }),
    })
);