import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';
import { IItemsAccountsBook } from '../../types/UserPanel/accountsBook.types';

class AccountsBook extends Model {
    public id!: string;
    public registrationDate!: Date;
    public transactionDate!: Date;
    public transactionType!: 'Ingreso' | 'Gasto';
    public creditCash!: 'Contado' | 'Credito';
    public meanPayment?: 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)' | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay' | 'Baloto' | 'Giro' | 'Cheque';
    public initialDate!: Date;
    public finalDate!: Date;
    public itemsSold?: IItemsAccountsBook[];
    public itemsBuy?: IItemsAccountsBook[];
    public otherIncomes?: 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos';
    public otherExpenses?: 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nomina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos' | 'IVA' | 'ICA' | 'Declaracion de Renta' | 'Retencion en la Fuente' | 'Predial' | 'Vehiculos y motos' | 'Asesoria Contable' | 'Renovacion Camara de Comercio' | 'Licencias y permisos' | 'Asesoria Juridica' | 'Honorarios de contratista' | 'Honorarios de contratista';
    public totalValue!: number;
    public creditDescription?: string;
    public creditWithInterest?: 'Si' | 'No';
    public creditInterestRate?: string;
    public numberOfPayments?: number;
    public paymentValue?: number;
    public paymentNumber?: number;
    public accountsReceivable?: number;
    public accountsPayable?: number;
    public transactionCounterpartId!: string;
    public transactionApproved!: boolean;
    public seller?: string;
    public userRegister?: string;
    public pay?: 'Si' | 'No';
    
    // Relations
    public branchId!: string;
    public userId?: string;
}

AccountsBook.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        transactionType: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Ingreso', 'Gasto']],
            },
            allowNull: false,
        },
        creditCash: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Contado', 'Credito']],
            },
            allowNull: false,
        },
        meanPayment: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Efectivo', 'Tarjeta de Credito/Debito', 'Transferencia bancaria (PSE)', 'Daviplata', 'Nequi', 'Movii', 'Tuya Pay', 'Dale', 'Nubank', 'Uala', 'Lulo Bank', 'Tpaga', 'Powwi', 'BBVA Wallet', 'Ahorro a la mano', 'Apple Pay', 'Rappipay', 'Claro Pay', 'Baloto', 'Giro', 'Cheque']],
            },
            allowNull: true,
        },
        otherExpenses: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['RawMaterial', 'Merchandise', 'Assets', 'Arriendo', 'Mantenimiento de equipos, maquinaria, herramientas', 'Reparaciones locativas', 'Transporte', 'Combustible', 'Nomina', 'Seguridad Social y/o parafiscales', 'Acueducto', 'Energia', 'Gas', 'Internet', 'Celular/Plan de datos', 'Credito del Banco', 'Credito en Cooperativa', 'Gota gota', 'Credito de almacen', 'Credito de servicios publicos', 'IVA', 'ICA', 'Declaracion de Renta', 'Retencion en la Fuente', 'Predial', 'Vehiculos y motos', 'Asesoria Contable', 'Renovacion Camara de Comercio', 'Licencias y permisos', 'Asesoria Juridica', 'Honorarios de contratista', 'Honorarios de contratista']],
            },
            allowNull: true,
        },
        initialDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        finalDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        itemsSold: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        itemsBuy: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        otherIncomes: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Credito del Banco', 'Credito en Cooperativa', 'Gota gota', 'Credito de almacen', 'Credito de servicios publicos']],
            },
            allowNull: true,
        },
        totalValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creditDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        creditWithInterest: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Si', 'No']],
            },
            allowNull: true,
        },
        creditInterestRate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberOfPayments: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        paymentValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        paymentNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        accountsReceivable: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        accountsPayable: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        transactionCounterpartId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transactionApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        seller: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userRegister: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pay: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Si', 'No']],
            },
            allowNull: true,
        },
        branchId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'AccountsBook',
    }
);

AccountsBook.belongsTo(Branch, {
    foreignKey: 'branchId',
    targetKey: 'id',
    onDelete: 'CASCADE',
});

AccountsBook.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
});

export default AccountsBook;