import { IInventoryOffItem } from '../../types/User/InventoryOffItem/iInventoryOffItem.types';
import { IWithholdingTax } from '../../types/User/RetentonAndTaxes/withholdingTax.types';
import { IIvaAiu } from '../../types/User/RetentonAndTaxes/ivaAiu.types';

export interface IProduct {
    id: string;
    barCode?: string;
    nameItem: string;
    brandItem?: string;
    packaged?: 'Si' | 'No';
    primaryPackageType?: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    individualPackaging?: 'Si' | 'No';
    secondaryPackageType?: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    quantityPerPackage?: number,
    returnablePackaging?: 'Si' | 'No';
    inventory: number;
    unitMeasure: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
    inventoryIncrease?: 'Si' | 'No';
    periodicityAutomaticIncrease?: 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral';
    automaticInventoryIncrease?: number;
    productionPrice?: number;
    sellingPrice: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    expirationDate?: Date;
    inventoryChanges?: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    salesCount?: number;
    inventoryOff?: IInventoryOffItem[];
    reasonManualDiscountingInventory?: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';
    quantityManualDiscountingInventory?: number;
    productAccesory?: 'Si' | 'No';
    productAccesories?: {
        accesory: string;
        productAccesoryPackageType?: string | null;
    }[];
    productAsset?: 'Si' | 'No';
    productAssets?: {
        nameAssets: string;
        assetId?: string | null;
    }[];
    productRawMaterials?: {
        nameItem: string;
        rawMaterialId?: string | null;
        quantity: string;
    }[];
    // Retenciones
    retentions: IWithholdingTax[];
    // Impuestos
    IVA: 'No aplica' | 0 | 5 | 19;
    consumptionTax?: 'No aplica' | 4 | 8 | 16;
    ivaAiu?: IIvaAiu;
    taxesUltraProcessedSugarSweetenedBeverages?: number;
    valueTaxesUltraProcessedSugarSweetenedBeverages?: 0 | 18 | 28 | 35 | 38 | 55 | 65;
    taxesUltraProcessedFoodProducts?: 10 | 15 | 20;
    // IVA: number;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}