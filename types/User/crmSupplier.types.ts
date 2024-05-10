export interface ICrmSuppliers {
    id: string;
    entityUserId?: string;
    entityCompanyId?: string;
    name?: string;
    lastName?: string;
    nameCompany?: string;
    typeDocumentId: 'NIT' | 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';
    documentId: string;
    verificationDigit: string;
    email?: string;
    phone: string;
    department?: 'Bogotá D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlántico' | 'Bolívar' | 'Boyacá' | 'Caldas' | 'Caquetá' | 'Casanare' | 'Cauca' | 'Cesar' | 'Chocó' | 'Córdoba' | 'Cundinamarca' | 'Guainía' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindío' | 'Risaralda' | 'San Andrés y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupés' | 'Vichada';
    city?: string;
    codeDane?: string;
    subregionCodeDane?: string;
    address?: string;

    //RELACION CON OTRAS TABLAS
    userId?: string;
    companyId?: string;
};