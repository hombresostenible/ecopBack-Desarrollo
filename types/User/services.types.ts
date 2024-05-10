export interface IService {
    id: string;
    nameItem: string;
    sellingPrice?: number;
    IVA?: number;
    barCode?: string;
    serviceAssets?: {
        nameItem: string;
        assetId?: string | null;
    }[];
    serviceProducts?: {
        nameItem: string;
        productlId?: string | null;
        quantity: string;
    }[];
    serviceRawMaterials?: {
        nameItem: string;
        rawMaterialId?: string | null;
        quantity: string;
    }[];
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    salesCount?: number;

    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
    companyId?: string;
}