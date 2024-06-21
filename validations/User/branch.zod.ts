import { z, ZodObject, ZodString, ZodArray } from 'zod';

type BranchSchemaType = ZodObject<{
    nameBranch: ZodString;
    department: ZodString;
    city: ZodString;
    // codeDane: ZodString;
    // subregionCodeDane: ZodString;
    addressBranch: ZodString;
    contactEmailBranch: ZodString;
    contactPhoneBranch: ZodString;
    nameManagerBranch: ZodString;
    lastNameManagerBranch: ZodString;
    typeDocumentIdManager: ZodString;
    documentIdManager: ZodString;
}>;

export const branchSchemaZod: BranchSchemaType = z.object({
    nameBranch: z.string({
        required_error: 'El nombre de la se de es requerido',
    }),
    department: z.string({
        required_error: 'El departamento de domicilio de la sede es requerido',
    }),
    city: z.string({
        required_error: 'La ciudad de domicilio de lasede es requerida',
    }),
    // codeDane: z.string({
    //     required_error: 'El código Dane de la ciudad es requerido',
    // }),
    // subregionCodeDane: z.string({
    //     required_error: 'El código Dane de la subregión es requerido',
    // }),
    addressBranch: z.string({
        required_error: 'La dirección de la sede es requerida',
    }),
    contactEmailBranch: z.string({
        required_error: 'El email de contacto de la sede es requerido',
    }),
    contactPhoneBranch: z.string({
        required_error: 'El teléfono de contacto de la sede es requerido',
    }),
    nameManagerBranch: z.string({
        required_error: 'El nombre del líder de la sede es requerido',
    }),
    lastNameManagerBranch: z.string({
        required_error: 'El apellido del líder de la sede es requerido',
    }),
    typeDocumentIdManager: z.string({
        required_error: 'El tipo de identidad del líder de la sede es requerido',
    }),
    documentIdManager: z.string({
        required_error: 'El número de identidad del líder de la sede es requerido',
    }),
});



//ESQUEMA PARA ACTUALIZAR O CREAR MASIVAMENTE ACTIVOS
type ManyBranchsSchemaType = ZodArray<
    ZodObject<{
        nameBranch: ZodString;
        department: ZodString;
        city: ZodString;
        codeDane: ZodString;
        subregionCodeDane: ZodString;
        addressBranch: ZodString;
        contactEmailBranch: ZodString;
        contactPhoneBranch: ZodString;
        nameManagerBranch: ZodString;
        lastNameManagerBranch: ZodString;
        typeDocumentIdManager: ZodString;
        documentIdManager: ZodString;
    }>
>;

export const manyBranchsSchemaType: ManyBranchsSchemaType = z.array(
    z.object({
        nameBranch: z.string({
            required_error: 'El nombre de la se de es requerido',
        }),
        department: z.string({
            required_error: 'El departamento de domicilio de la sede es requerido',
        }),
        city: z.string({
            required_error: 'La ciudad de domicilio de lasede es requerida',
        }),
        codeDane: z.string({
            required_error: 'El código Dane de la ciudad es requerido',
        }),
        subregionCodeDane: z.string({
            required_error: 'El código Dane de la subregión es requerido',
        }),
        addressBranch: z.string({
            required_error: 'La dirección de la sede es requerida',
        }),
        contactEmailBranch: z.string({
            required_error: 'El email de contacto de la sede es requerido',
        }),
        contactPhoneBranch: z.string({
            required_error: 'El teléfono de contacto de la sede es requerido',
        }),
        nameManagerBranch: z.string({
            required_error: 'El nombre del líder de la sede es requerido',
        }),
        lastNameManagerBranch: z.string({
            required_error: 'El apellido del líder de la sede es requerido',
        }),
        typeDocumentIdManager: z.string({
            required_error: 'El tipo de identidad del líder de la sede es requerido',
        }),
        documentIdManager: z.string({
            required_error: 'El número de identidad del líder de la sede es requerido',
        }),
    })
);