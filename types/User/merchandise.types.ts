export interface InventoryOffItem {
    date: Date;
    reason: "Activo en uso" | "Activo en reposo" | "Dañado" | "Donado" | "Desechado" | "Reciclado" | "Vendido";
    quantity: number;
    description?: string;
}

export interface IMerchandise {
    id: string;
    barCode?: string;
    nameItem: string;
    brandItem?: string;
    packaged: 'Si' | 'No';
    primaryPackageType?: 'Ninguno' | 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    individualPackaging?: 'Si' | 'No';
    secondaryPackageType?: 'Ninguno' | 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    quantityPerPackage?: number;
    returnablePackaging?: 'Si' | 'No';
    inventory: number;
    unitMeasure: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
    inventoryIncrease?: 'Si' | 'No';
    periodicityAutomaticIncrease?: 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral';
    automaticInventoryIncrease?: number;
    purchasePriceBeforeTax: number;
    IVA: number;
    sellingPrice: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    expirationDate?: Date;
    inventoryChanges?: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    salesCount?: number;
    inventoryOff?: InventoryOffItem[];
    reasonManualDiscountingInventory?: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';
    quantityManualDiscountingInventory?: number;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}