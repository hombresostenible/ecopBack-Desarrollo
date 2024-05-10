export interface IUserPlatform {
    id: string;
    name: string;
    lastName: string;
    typeDocumentId: 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';
    documentId: string;
    profilePicture?: string;
    logo?: string;
    userType: 'User';
    typeRole: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    department: 'Bogotá D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlántico' | 'Bolívar' | 'Boyacá' | 'Caldas' | 'Caquetá' | 'Casanare' | 'Cauca' | 'Cesar' | 'Chocó' | 'Córdoba' | 'Cundinamarca' | 'Guainía' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindío' | 'Risaralda' | 'San Andrés y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupés' | 'Vichada';
    city: string;
    codeDane: string;
    subregionCodeDane: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    isAceptedConditions: boolean;
    
    //USER MANAGEMENT
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    unlockCode?: string;
    isBlocked?: boolean;
    expiresAt?: Date;
    applicationPassword?: string;
    
    //RELACION DE TABLAS
    branchId?: string;
    userId?: string;
    companyId?: string;
};