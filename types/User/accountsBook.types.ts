export interface IItemsSold {
    nameItem: string;
    id: string;
    type: 'Assets' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service';
    sellingPrice: number;
    quantity: number;
    subTotalValue: number;
}

export interface IAccountsBook {
    id: string;
    registrationDate: Date;
    transactionDate: Date;
    transactionType: 'Ingreso' | 'Gasto';
    creditCash: 'Contado' | 'Credito';
    meanPayment?: 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)' | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay'     | 'Baloto' | 'Giro' | 'Cheque';
    expenseCategory?: 'RawMaterial' | 'Merchandise' | 'Assets' | 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nomina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos' | 'IVA' | 'ICA' | 'Declaracion de Renta' | 'Retencion en la Fuente' | 'Predial' | 'Vehiculos y motos' | 'Asesoria Contable' | 'Renovacion Camara de Comercio' | 'Licencias y permisos' | 'Asesoria Juridica' | 'Honorarios de contratista' | 'Honorarios de contratista';
    periodicityPayService?: 'Mensual' | 'Bimestral';
    periodPayService?: 'Enero de 2024' | 'Febrero de 2024' | 'Marzo de 2024' | 'Abril de 2024' | 'Mayo de 2024' | 'Junio de 2024' | 'Julio de 2024' | 'Agosto de 2024' | 'Septiembre de 2024' | 'Octubre de 2024' | 'Noviembre de 2024' | 'Diciembre de 2024' | 'Julio - Agosto de 2024' | 'Marzo - Abril de 2024' | 'Mayo - Junio de 2024' | 'Julio - Agosto de 2024' | 'Septiembre - Octubre de 2024' | 'Noviembre - Diciembre de 2024';
    itemsSold?: IItemsSold[];
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