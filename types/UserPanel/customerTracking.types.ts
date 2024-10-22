export interface ICustomerTracking {
    id: string;
    lastSale?: Date;
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
};