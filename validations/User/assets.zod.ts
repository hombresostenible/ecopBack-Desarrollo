import { z, ZodObject, ZodArray, ZodString } from 'zod';

//ESQUEMA PARA CREAR UN ACTIVO
type AssetsSchemaType = ZodObject<{
    nameItem: ZodString;
    brandItem: ZodString;
    referenceItem: ZodString;
    conditionAssets: ZodString;
    stateAssets: ZodString;
    branchId: ZodString;
}>;

export const assetsSchemaZod: AssetsSchemaType = z.object({
    nameItem: z.string({
        required_error: 'El nombre del equipo, herramienta o máquina es requerido',
    }),
    brandItem: z.string({
        required_error: 'La marca Brand del equipo, herramienta o máquina es requerida',
    }),
    referenceItem: z.string({
        required_error: 'La referencia del equipo, herramienta o máquina es requerida',
    }),
    conditionAssets: z.string({
        required_error: 'La condición del equipo, herramienta o máquina es requerida',
    }),
    stateAssets: z.string({
        required_error: 'El estado del equipo, herramienta o máquina es requerido',
    }),
    branchId: z.string({
        required_error: 'La sede del equipo, herramienta o máquina es requerida',
    }),
});



//ESQUEMA PARA ACTUALIZAR O CREAR MASIVAMENTE ACTIVOS
type ManyAssetsSchemaType = ZodArray<
    ZodObject<{
        nameItem: ZodString;
        brandItem: ZodString;
        referenceItem: ZodString;
        // conditionAssets: ZodString;
        // stateAssets: ZodString;
        branchId: ZodString;
    }>
>;

export const manyAssetsSchemaZod: ManyAssetsSchemaType = z.array(
    z.object({
        nameItem: z.string({
            required_error: 'El nombre del equipo, herramienta o máquina es requerido',
        }),
        brandItem: z.string({
            required_error: 'La sede Brand del equipo, herramienta o máquina es requerida',
        }),
        referenceItem: z.string({
            required_error: 'La referencia del equipo, herramienta o máquina es requerida',
        }),
        // conditionAssets: z.string({
        //     required_error: 'La condición del equipo, herramienta o máquina es requerida',
        // }),
        // stateAssets: z.string({
        //     required_error: 'El estado del equipo, herramienta o máquina es requerido',
        // }),
        branchId: z.string({
            required_error: 'La sede del equipo, herramienta o máquina es requerida',
        }),
    })
);