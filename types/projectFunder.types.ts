export interface IUser {
    id: string;
    corporateName: string;
    typeDocumentId: 'NIT';
    documentId: string;
    verificationDigit: string;
    logo?: string;
    userType: 'User';
    typeRole: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    codeCiiu: string;
    department: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city: string;
    codeDane: string;
    subregionCodeDane: string;
    address: string;
    postalCode: string;
    phone: string;
    email: string;
    password: string;

    //USER MANAGEMENT
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    isBlocked?: boolean;
    unlockCode?: string;
    expiresAt?: Date;
    applicationPassword?: string;
    isAceptedConditions: boolean;
};