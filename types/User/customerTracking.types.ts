export interface ICustomerTracking {
    id: string;
    entityUserId?: string;
    entityCompanyId?: string;    
    lastSale?: Date;
    ageRange?: string;
    gender?: string;
    newsletterSubscriber?: 'Si' | 'No';
    lastCall?: Date;
    lastEmail?: Date;
    lastQuotation?: Date;
    lastMeeting?: Date;
    typeMeeting?: 'Personal' | 'Digital';
    accumulatedSalesValue?: string;
    accumulatedSalesQuantity?: string;

    //RELACION CON OTRAS TABLAS
    userId?: string;
    companyId?: string;
};