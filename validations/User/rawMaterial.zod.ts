import { z, ZodObject, ZodArray, ZodString, ZodNumber } from 'zod';


//ESQUEMA PARA CREAR UNA MATERIA PRIMA
type RawMaterialSchemaType = ZodObject<{
    nameItem: ZodString;
    packaged: ZodString;
    unitMeasure: ZodString;
    branchId: ZodString;
}>;

export const rawMaterialSchema: RawMaterialSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre de la materia prima es requerido',
    }),
    packaged: z.string({
        required_error: 'Es requerido responder si viene o no empacada l amateria prima',
    }),
    unitMeasure: z.string({
        required_error: 'La unidad de medida de la materia prima es requerida',
    }),
    branchId: z.string({
        required_error: 'La sede de la materia prima es requerida',
    }),
});



//ESQUEMA PARA ACTUALIZAR O CREAR MASIVAMENTE MATERIAS PRIMAS
type ManyRawMaterialSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        unitMeasure: ZodString;
        branchId: ZodString;
    }>
>;

export const manyRawMaterialSchema: ManyRawMaterialSchemaType = z.array(
    z.object({
        nameItem: z.string({
            required_error: 'El nombre de la materia prima es requerido',
        }),
        unitMeasure: z.string({
            required_error: 'La unidad de medida de la materia prima es requerida',
        }),
        branchId: z.string({
            required_error: 'La sede de la materia prima es requerida',
        }),
    })
);