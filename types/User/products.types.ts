export interface InventoryOffItem {
    date: Date;
    reason: "Activo en uso" | "Activo en reposo" | "Dañado" | "Donado" | "Desechado" | "Reciclado" | "Vendido";
    quantity: number;
    description?: string;
}

export interface IProduct {
    id: string;
    nameItem: string;
    barCode?: string;
    inventory: number;
    inventoryOff?: InventoryOffItem[];
    unitMeasure: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
    inventoryIncrease?: 'Si' | 'No';
    periodicityAutomaticIncrease?: 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral';
    automaticInventoryIncrease?: number;
    IVA?: number;
    sellingPrice?: number;
    packaged: 'Si' | 'No';
    primaryPackageType?: 'Ninguno' | 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    expirationDate?: Date;    
    returnablePackaging?: 'Si' | 'No';
    quantityPerPackage?: number,
    individualPackaging?: 'Si' | 'No';
    secondaryPackageType?: 'Ninguno' | 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
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
    inventoryChanges: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    productionPrice?: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    reasonManualDiscountingInventory?: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';
    quantityManualDiscountingInventory?: number;    
    salesCount?: number;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}