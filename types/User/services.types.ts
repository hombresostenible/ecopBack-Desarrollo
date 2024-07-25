import { IWithholdingTax } from '../../types/User/RetentonAndTaxes/withholdingTax.types';
import { IIvaAiu } from '../../types/User/RetentonAndTaxes/ivaAiu.types';

export interface IService {
    id: string;
    nameItem: string;
    sellingPrice?: number;
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
    retentions: IWithholdingTax[];
    // Impuestos
    IVA: 'No aplica' | 0 | 5 | 19;
    consumptionTax?: 'No aplica' | 4 | 8 | 16;
    ivaAiu?: IIvaAiu;
    taxesUltraProcessedSugarSweetenedBeverages?: number;
    valueTaxesUltraProcessedSugarSweetenedBeverages?: 'No aplica' | 0 | 18 | 28 | 35 | 38 | 55 | 65;
    taxesUltraProcessedFoodProducts?: 'No aplica' | 10 | 15 | 20;

    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}