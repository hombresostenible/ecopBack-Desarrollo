import { IInventoryOffItem } from '../../types/User/InventoryOffItem/iInventoryOffItem.types';
import { IWithholdingTax } from '../../types/User/RetentonAndTaxes/withholdingTax.types';
import { IIvaAiu } from '../../types/User/RetentonAndTaxes/ivaAiu.types';

export interface IRawMaterial {
    id: string;
    barCode?: string;
    nameItem: string;
    brandItem?: string;
    packaged?: 'Si' | 'No';
    primaryPackageType?: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    individualPackaging?: 'Si' | 'No';
    secondaryPackageType?: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    quantityPerPackage?: number;
    returnablePackaging?: 'Si' | 'No';
    inventory: number;
    unitMeasure: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
    inventoryIncrease?: 'Si' | 'No';
    periodicityAutomaticIncrease?: 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral';
    automaticInventoryIncrease?: number;
    purchasePriceBeforeTax: number;
    sellingPrice?: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    salesCount?: number;
    expirationDate?: Date;
    inventoryChanges?: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    inventoryOff?: IInventoryOffItem[];
    reasonManualDiscountingInventory?: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';    
    quantityManualDiscountingInventory?: number;
    // Retenciones
    retentions: IWithholdingTax[];
    // Impuestos
    IVA: 'No aplica' | 0 | 5 | 19;
    consumptionTax?: 'No aplica' | 4 | 8 | 16;
    ivaAiu?: IIvaAiu;
    // taxesUltraProcessedSugarSweetenedBeverages?: number;
    // valueTaxesUltraProcessedSugarSweetenedBeverages?: 'No aplica' | 0 | 18 | 28 | 35 | 38 | 55 | 65;
    // taxesUltraProcessedFoodProducts?: 'No aplica' | 10 | 15 | 20;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}