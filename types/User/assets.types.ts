import { IInventoryOffAssets } from '../../types/User/InventoryOffItem/iInventoryOffItem.types';

export interface IAssets {
    id: string;
    barCode?: string;
    nameItem: string;
    brandItem?: string;
    referenceAssets?: string;
    stateAssets?: 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparacion';
    conditionAssets?: 'Nuevo' | 'Usado';
    inventory: number;
    purchasePriceBeforeTax: number;
    sellingPrice?: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    inventoryOff?: IInventoryOffAssets[];
    // Impuestos
    IVA: 'No aplica' | 0 | 5 | 19;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}