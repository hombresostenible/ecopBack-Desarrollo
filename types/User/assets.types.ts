export interface InventoryOffItem {
    date: Date;
    quantity: number;
    reason: "Activo en uso" | "Activo en reposo" | "Dañado" | "Donado" | "Desechado" | "Vendido";
}

export interface IAssets {
    id: string;
    nameItem: string;
    barCode?: string;
    inventory: number;
    inventoryOff?: InventoryOffItem[]; // Cambio realizado aquí
    brandAssets: string;
    referenceAssets?: string;
    conditionAssets?: 'Nuevo' | 'Usado';
    stateAssets?: 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparacion';
    purchasePriceBeforeTax?: number;
    IVA?: number;
    sellingPrice?: number;    
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}