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
        productId?: string | null;
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
    // Retenciones
    retentionType?: 'No tiene' | 'Retefuente' | 'Rete IVA' | 'Rete ICA';
    retentionPercentageFeesConsulting?: '2' | '4' | '6' | '10' | '11';
    retentionPercentageServices?: '1' | '2' | '3.5' | '4' | '6';
    retentionPercentagePurchases?: '0.1' | '0.5' | '1' | '1.5' | '2.5' | '3' | '3.5';
    retentionPercentageOthers?: '2' | '2.5' | '3' | '4' | '7' | '10' | '20';
    retentionPercentageForeignPaymentsDividends?: '0' | '1' | '2' | '5' | '7' | '8' | '10' | '15' | '20' | '33' | '35' | '35 + Num. 51';
    retentionPercentageIVA?: '15' | '100';
    retentionPercentageICA?: '2' | '3.4' | '4.14' | '5' | '6.9' | '8' | '9.66' | '11.04' | '13.8';
    // Impuestos
    // IVA?: '0' | '5' | '19';
    consumptionTax?: '8';
    ivaAiu?: number;
    taxesUltraProcessedSugarSweetenedBeverages?: number;
    valueTaxesUltraProcessedSugarSweetenedBeverages?: '0' | '18' | '28' | '35' | '38' | '55' | '65';
    taxesUltraProcessedFoodProducts?: '10' | '15' | '20';

    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}