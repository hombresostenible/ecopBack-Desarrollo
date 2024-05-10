import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import AccountsBook from './accountsBook.schema';
import Assets from './assets.schema';
import Merchandise from './merchandise.schema';
import Product from './product.schema';
import RawMaterial from './rawMaterial.schema';
import Service from './service.schema';
import Branch from './branch.schema';
import User from './user.schema';
import Company from './company.schema';

class AccountsReceivable extends Model {
    public id!: string;
    public transactionDate!: Date;
    public transactionCounterpartId!: string;
    public creditDescription!: string;
    public stateAccount!: 'Activo' | 'Pagado';
    public creditWithInterest!: 'Si' | 'No';
    public creditInterestRate!: string;
    public initialValue!: number;
    public initialNumberOfPayments!: number;
    public paymentValue!: number;
    public currentBalance!: number;
    public pendingNumberOfPayments!: number;
    public creditPayments!: { date: Date; value: number; branchId: string; seller: string }[];
    public cancellationDate!: Date;
    public seller!: string;    
    
    //RELACION CON OTRAS TABLAS
    public accountsBookId!: string;
    public assetId!: string;
    public merchandiseId!: string;
    public productId!: string;
    public rawMaterialId!: string;
    public serviceId!: string;
    public branchId!: string;
    public userId!: string;
    public companyId!: string;
};

AccountsReceivable.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        transactionCounterpartId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creditDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stateAccount: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Activo', 'Pagado' ]],
            },
        },
        creditWithInterest: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Si', 'No' ]],
            },
        },
        creditInterestRate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        initialValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        initialNumberOfPayments: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        paymentValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentBalance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pendingNumberOfPayments: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        creditPayments: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        cancellationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        seller: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        
        //RELACION CON OTRAS TABLAS
        accountsBookId: {
            type: DataTypes.UUID,
            allowNull: false,
        },        
        assetId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        merchandiseId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        rawMaterialId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        serviceId: {
            type: DataTypes.UUID,
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
        companyId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'AccountsReceivable',
    }
);

AccountsReceivable.belongsTo(AccountsBook, {
    foreignKey: 'accountsBookId',
    as: 'accountsBook',
});

AccountsReceivable.belongsTo(Assets, {
    foreignKey: 'assetId',
    as: 'assets',
});

AccountsReceivable.belongsTo(Merchandise, {
    foreignKey: 'merchandiseId',
    as: 'merchandise',
});

AccountsReceivable.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
});

AccountsReceivable.belongsTo(RawMaterial, {
    foreignKey: 'rawMaterialId',
    as: 'rawMaterial',
});

AccountsReceivable.belongsTo(Service, {
    foreignKey: 'serviceId',
    as: 'service',
});

AccountsReceivable.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

AccountsReceivable.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
  
AccountsReceivable.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company',
});

export default AccountsReceivable;