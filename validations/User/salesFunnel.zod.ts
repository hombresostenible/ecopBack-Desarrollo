import { z, ZodObject, ZodString, ZodNumber } from 'zod';

type SalesFunnelCustomerAcqSchemaType = ZodObject<{
    cacRegistrationDate: ZodString;
    cacPeriodOfAnalysis: ZodString;
    cacAdvertisingInvestment: ZodNumber;
    cacSalesTeamCost: ZodNumber;
    cacSalesComissions: ZodNumber;
    cacTransportCost: ZodNumber;
    cacEventsCost: ZodNumber;
    cacNewClients: ZodNumber;
    branchId: ZodString;
}>;

export const salesFunnelCustomerAcqSchemaZod: SalesFunnelCustomerAcqSchemaType = z.object({
    cacRegistrationDate: z.string({
        required_error: 'CAC Registration Date is required',
    }),
    cacPeriodOfAnalysis: z.string({
        required_error: 'CAC Period Of Analysis is required',
    }),
    cacAdvertisingInvestment: z.number({
        required_error: 'CAC Advertising Investment is required',
    }),
    cacSalesTeamCost: z.number({
        required_error: 'CAC Sales Team Cost is required',
    }),
    cacSalesComissions: z.number({
        required_error: 'CAC Sales Comissions is required',
    }),
    cacTransportCost: z.number({
        required_error: 'CAC Transport Cost is required',
    }),
    cacEventsCost: z.number({
        required_error: 'CAC Events Cost is required',
    }),
    cacNewClients: z.number({
        required_error: 'CAC New Clients is required',
    }),
    branchId: z.string({
        required_error: 'La sede del gasto del costo de adquicisión es requerida',
    }),
});



type SalesFunnelCustomerRetSchemaType = ZodObject<{
    crcRegistrationDate: ZodString;
    crcPeriodOfAnalysis: ZodString;
    crcDiscountsInvestment: ZodNumber;
    crcGuarranteesCosts: ZodNumber;
    crcAdvertisingInvestment: ZodNumber;
    crcSalesTeamCost: ZodNumber;
    crcSalesComissions: ZodNumber;
    crcTransportCosts: ZodNumber;
    crcEventsCost: ZodNumber;
    crcCurrentClients: ZodNumber;
    branchId: ZodString;
}>;

export const salesFunnelCustomerRetSchemaZod: SalesFunnelCustomerRetSchemaType = z.object({
    crcRegistrationDate: z.string({
        required_error: 'CRC Registration Date is required',
    }),
    crcPeriodOfAnalysis: z.string({
        required_error: 'CRC Period Of Analysis is required',
    }),
    crcDiscountsInvestment: z.number({
        required_error: 'CRC Discounts Investment is required',
    }),
    crcGuarranteesCosts: z.number({
        required_error: 'CRC Guarrantees Costs is required',
    }),
    crcAdvertisingInvestment: z.number({
        required_error: 'CRC Advertising Investment is required',
    }),
    crcSalesTeamCost: z.number({
        required_error: 'CRC Sales Team Cost is required',
    }),
    crcSalesComissions: z.number({
        required_error: 'CRC Sales Comissions is required',
    }),
    crcTransportCosts: z.number({
        required_error: 'CRC Transport Costs is required',
    }),
    crcEventsCost: z.number({
        required_error: 'CRC Events Cost is required',
    }),
    crcCurrentClients: z.number({
        required_error: 'CRC Current Clients is required',
    }),
    branchId: z.string({
        required_error: 'La sede del gasto del costo de retención es requerida',
    }),
});



type salesFunnelCustomerDigitalSchemaZodSchemaType = ZodObject<{
    pipelineRegistrationDate: ZodString;
    pipelinePeriodOfAnalysis: ZodString;
    nameDigitalCampaign: ZodString;
    campaignNumberOfDays: ZodNumber;
    campaignClicksViews: ZodNumber;
    interestedCustomers: ZodNumber;
    leads: ZodNumber;
    salesNumber: ZodNumber;
    totalValue: ZodNumber;
    branchId: ZodString;
}>;

export const salesFunnelCustomerDigitalSchemaZod: salesFunnelCustomerDigitalSchemaZodSchemaType = z.object({
    pipelineRegistrationDate: z.string({
        required_error: 'Pipeline Registration Date is required',
    }),
    pipelinePeriodOfAnalysis: z.string({
        required_error: 'Pipeline Period Of Analysis is required',
    }),
    nameDigitalCampaign: z.string({
        required_error: 'Name Digital Campaign is required',
    }),
    campaignNumberOfDays: z.number({
        required_error: 'Campaign Number Of Days is required',
    }),
    campaignClicksViews: z.number({
        required_error: 'Campaign Clicks Views is required',
    }),
    interestedCustomers: z.number({
        required_error: 'Interested Customers is required',
    }),
    leads: z.number({
        required_error: 'Leads is required',
    }),
    salesNumber: z.number({
        required_error: 'Sales Number is required',
    }),
    totalValue: z.number({
        required_error: 'Total Value is required',
    }),
    branchId: z.string({
        required_error: 'La sede de la venta digital es requerida',
    }),
});