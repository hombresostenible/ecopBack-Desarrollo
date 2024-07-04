import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';
import { IItemsSold } from '../../types/User/accountsBook.types';

class AccountsBook extends Model {
    public id!: string;
    public registrationDate!: Date;
    public transactionDate!: Date;
    public transactionType!: 'Ingreso' | 'Gasto';
    public creditCash!: 'Contado' | 'Credito';
    public meanPayment?: 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)' | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay' | 'Baloto' | 'Giro' | 'Cheque';
    public expenseCategory?: 'RawMaterial' | 'Merchandise' | 'Assets' | 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nomina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos' | 'IVA' | 'ICA' | 'Declaracion de Renta' | 'Retencion en la Fuente' | 'Predial' | 'Vehiculos y motos' | 'Asesoria Contable' | 'Renovacion Camara de Comercio' | 'Licencias y permisos' | 'Asesoria Juridica' | 'Honorarios de contratista' | 'Honorarios de contratista';
    public periodicityPayService?: 'Mensual' | 'Bimestral';
    public periodPayService?: 'Enero de 2024' | 'Febrero de 2024' | 'Marzo de 2024' | 'Abril de 2024' | 'Mayo de 2024' | 'Junio de 2024' | 'Julio de 2024' | 'Agosto de 2024' | 'Septiembre de 2024' | 'Octubre de 2024' | 'Noviembre de 2024' | 'Diciembre de 2024' | 'Julio - Agosto de 2024' | 'Marzo - Abril de 2024' | 'Mayo - Junio de 2024' | 'Julio - Agosto de 2024' | 'Septiembre - Octubre de 2024' | 'Noviembre - Diciembre de 2024';
    public itemsSold?: IItemsSold[];
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
        expenseCategory: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['RawMaterial', 'Merchandise', 'Assets', 'Arriendo', 'Mantenimiento de equipos, maquinaria, herramientas', 'Reparaciones locativas', 'Transporte', 'Combustible', 'Nomina', 'Seguridad Social y/o parafiscales', 'Acueducto', 'Energia', 'Gas', 'Internet', 'Celular/Plan de datos', 'Credito del Banco', 'Credito en Cooperativa', 'Gota gota', 'Credito de almacen', 'Credito de servicios publicos', 'IVA', 'ICA', 'Declaracion de Renta', 'Retencion en la Fuente', 'Predial', 'Vehiculos y motos', 'Asesoria Contable', 'Renovacion Camara de Comercio', 'Licencias y permisos', 'Asesoria Juridica', 'Honorarios de contratista', 'Honorarios de contratista']],
            },
            allowNull: true,
        },
        periodicityPayService: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Mensual', 'Bimestral']],
            },
            allowNull: true,
        },
        periodPayService: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Enero de 2024', 'Febrero de 2024', 'Marzo de 2024', 'Abril de 2024', 'Mayo de 2024', 'Junio de 2024', 'Julio de 2024', 'Agosto de 2024', 'Septiembre de 2024', 'Octubre de 2024', 'Noviembre de 2024', 'Diciembre de 2024', 'Julio - Agosto de 2024', 'Marzo - Abril de 2024', 'Mayo - Junio de 2024', 'Julio - Agosto de 2024', 'Septiembre - Octubre de 2024', 'Noviembre - Diciembre de 2024']],
            },
            allowNull: true,
        },
        itemsSold: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
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