import { z, ZodObject, ZodString, ZodNumber, ZodArray } from 'zod';

// Definir el esquema de un objeto dentro de `itemsQuoted`
const quotedItemSchema = z.object({
  item: z.string({
    required_error: 'El nombre del artículo es requerido',
  }),
  quantity: z.number({
    required_error: 'La cantidad es requerida',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
  }),
});

// VERIFICACIÓN ZOD PARA CREAR COTIZACIONES
type CreateQuotationSchemaType = ZodObject<{
  quotationDate: ZodString;
  expirationDate: ZodString;
  customerId: ZodString;
  itemsQuoted: ZodArray<typeof quotedItemSchema>;
  totalAmount: ZodNumber;
  status: ZodString;
  notes: ZodString;
  branchId: ZodString;
}>;

export const createQuotationSchema: CreateQuotationSchemaType = z.object({
  quotationDate: z.string({
    required_error: 'La fecha de la cotización es requerida',
  }),
  expirationDate: z.string({
    required_error: 'La fecha de expiración es requerida',
  }),
  customerId: z.string({
    required_error: 'El ID del cliente es requerido',
  }).uuid({
    message: 'El ID del cliente debe ser un UUID válido',
  }),
  itemsQuoted: z.array(quotedItemSchema, {
    required_error: 'Los artículos cotizados son requeridos',
  }),
  totalAmount: z.number({
    required_error: 'El monto total es requerido',
  }),
  status: z.string({
    required_error: 'El estado es requerido',
  }),
  notes: z.string({
    required_error: 'Las notas son requeridas',
  }),
  branchId: z.string({
    required_error: 'El ID de la sucursal es requerido',
  }).uuid({
    message: 'El ID de la sucursal debe ser un UUID válido',
  }),
});
