
export interface IQuotation {
    id?: string;
    quotationNumber?: number | null;
    quotationDate: Date;
    expirationDate?: Date | null;
    customerId?: string | null;
    itemsQuoted?: any;
    totalAmount: number;
    status?: string;
    notes: string;
    branchId: string;
    userId?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
