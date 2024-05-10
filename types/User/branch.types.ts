export interface IBranch {
    id: string;
    nameBranch: string;
    department: 'Bogotá D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlántico' | 'Bolívar' | 'Boyacá' | 'Caldas' | 'Caquetá' | 'Casanare' | 'Cauca' | 'Cesar' | 'Chocó' | 'Córdoba' | 'Cundinamarca' | 'Guainía' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindío' | 'Risaralda' | 'San Andrés y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupés' | 'Vichada';
    city: string;
    codeDane: string;
    subregionCodeDane: string;
    addressBranch: string;
    contactEmailBranch: string;
    contactPhoneBranch: string;
    nameManagerBranch: string;
    lastNameManagerBranch: string;
    typeDocumentIdManager: 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';    
    documentIdManager: string;

    //RELACION CON OTRAS TABLAS
    userId?: string;
}