export interface ISalesFunnelCustomerAcq {
    id: string;
    cacRegistrationDate: Date;
    cacPeriodOfAnalysis: string;
    cacAdvertisingInvestment: number;
    cacSalesTeamCost: number;
    cacSalesComissions: number;
    cacTransportCost: number;
    cacEventsCost: number;
    cacNewClients: number;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}



export interface ISalesFunnelCustomerRet {
    id: string;
    crcRegistrationDate: Date;
    crcPeriodOfAnalysis: string;
    crcDiscountsInvestment: number;
    crcGuarranteesCosts: number;
    crcAdvertisingInvestment: number;
    crcSalesTeamCost: number;
    crcSalesComissions: number;
    crcTransportCosts: number;
    crcEventsCost: number;
    crcCurrentClients: number;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}



export interface ISalesFunnelSalesDigital {
    id: string;
    pipelineRegistrationDate: Date;
    pipelinePeriodOfAnalysis: string;
    nameDigitalCampaign: string;
    campaignNumberOfDays: number;
    campaignClicksViews: number;
    interestedCustomers: number;
    leads: number;
    salesNumber: number;
    totalValue: number;
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}
