export interface IAccountsBook {
    id: string;
    registrationDate: Date;
    transactionDate: Date;
    transactionType: 'Ingreso' | 'Gasto';
    creditCash: 'Contado' | 'Crédito';
    meanPayment: 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)' | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay'     | 'Baloto' | 'Giro' | 'Cheque';
    incomeCategory?: 'Producto' | 'Materia Prima' | 'Mercancía' | 'Servicio' | 'Activo' | 'Crédito del banco' | 'Crédito en Cooperativa' | 'Gota gota' | 'Crédito de almacén' | 'Crédito de servicios públicos';
    nameItem?: string;
    itemId?: string;
    typeExpenses?: 'Materia Prima' | 'Mercancía' | 'Activo' | 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nómina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energía' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Crédito del banco' | 'Crédito de la cooperativa' | 'Gota gota' | 'Créditos en almacenes' | 'Créditos en servicios públicos' | 'IVA' | 'ICA' | 'Declaración de Renta' | 'Retención en la Fuente' | 'Predial' | 'Vehículos y motos' | 'Asesoría Contable' | 'Renovación Cámara de Comercio' | 'Licencias y permisos' | 'Asesoría Jurídica' | 'Honorarios de contratista' | 'Honorarios de contratista';
    periodicityPayService?: 'Mensual' | 'Bimestral';
    periodPayService?: 'Enero de 2024' | 'Febrero de 2024' | 'Marzo de 2024' | 'Abril de 2024' | 'Mayo de 2024' | 'Junio de 2024' | 'Julio de 2024' | 'Agosto de 2024' | 'Septiembre de 2024' | 'Octubre de 2024' | 'Noviembre de 2024' | 'Diciembre de 2024' | 'Julio - Agosto de 2024' | 'Marzo - Abril de 2024' | 'Mayo - Junio de 2024' | 'Julio - Agosto de 2024' | 'Septiembre - Octubre de 2024' | 'Noviembre - Diciembre de 2024';
    unitValue?: number;
    quantity?: number;
    totalValue: number;
    creditDescription?: string;
    creditWithInterest?: 'Si' | 'No';
    creditInterestRate?: string;    
    numberOfPayments?: number;
    paymentValue?: number;
    paymentNumber?: number;
    accountsReceivable?: number;
    accountsPayable?: number;
    transactionCounterpartId: string;
    transactionApproved: boolean;
    seller?: string;
    userRegister?: string;
    pay?: 'Si' | 'No';

    //RELACION CON OTRAS TABLAS 
    branchId: string;
    userId?: string;
}