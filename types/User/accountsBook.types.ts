export interface IItemsAccountsBook {
    nameItem: string;
    id: string;
    type: 'Asset' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service';
    IVA: number;
    sellingPrice: number;
    quantity: number;
    subTotalValue: number;
}

export interface IAccountsBook {
    id: string;
    registrationDate: Date;
    transactionDate: Date;
    transactionType: 'Ingreso' | 'Gasto';
    // transactionType: 'Ingreso' | 'Gasto' | 'CXC' | 'CXP';
    creditCash: 'Contado' | 'Credito';
    meanPayment?: 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)' | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay'     | 'Baloto' | 'Giro' | 'Cheque';
    initialDate?: Date;
    finalDate?: Date;
    itemsSold?: IItemsAccountsBook[];
    itemsBuy?: IItemsAccountsBook[];
    otherIncomes?: 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos';
    otherExpenses?: 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nomina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos' | 'IVA' | 'ICA' | 'Declaracion de Renta' | 'Retencion en la Fuente' | 'Predial' | 'Vehiculos y motos' | 'Asesoria Contable' | 'Renovacion Camara de Comercio' | 'Licencias y permisos' | 'Asesoria Juridica' | 'Honorarios de contratista' | 'Honorarios de contratista';
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