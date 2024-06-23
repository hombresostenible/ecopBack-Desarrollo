export interface InventoryOffItem {
    date: Date;
    reason: "Activo en uso" | "Activo en reposo" | "Dañado" | "Donado" | "Desechado" | "Reciclado" | "Vendido";
    quantity: number;
    description?: string;
}

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
    IVA?: number;
    sellingPrice?: number;
    inventoryOff?: InventoryOffItem[];
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}