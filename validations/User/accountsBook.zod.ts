import { z, ZodObject, ZodString, ZodNumber } from 'zod';

type AccountsBookSchemaType = ZodObject<{
    registrationDate: ZodString;
    transactionDate: ZodString;
    transactionType: ZodString;
    creditCash: ZodString;
    totalValue: ZodNumber;
    branchId: ZodString;
}>;

export const accountsBookSchemaZod: AccountsBookSchemaType = z.object({
    registrationDate: z.string({
        required_error: 'La fecha de registro del registro contable es requerida',
    }),
    transactionDate: z.string({
        required_error: 'La fecha de transacción del registro contable es requerida',
    }),
    transactionType: z.string({
        required_error: 'El tipo de transacción del registro contable es requerido',
    }),
    creditCash: z.string({
        required_error: 'El tipo de ingreso del registro contable es requerido',
    }),
    totalValue: z.number({
        required_error: 'El valor total del registro contable es requerido',
    }),   
    branchId: z.string({
        required_error: 'La sede del registro contable es requerida',
    }),
});