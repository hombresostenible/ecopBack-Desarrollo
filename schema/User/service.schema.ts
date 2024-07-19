import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';
import Branch from './branch.schema';

class Service extends Model {
    public id!: string;
    public nameItem!: string;
    public barCode!: string;
    public sellingPrice!: number;
    public serviceAssets!: { nameItem: string; assetId?: string | null}[];
    public serviceProducts!: { nameItem: string; productId?: string | null; quantity: string}[];
    public serviceRawMaterials!: { nameItem: string; rawMaterialId?: string | null; quantity: string}[];
    public isDiscounted!: 'Si' | 'No';
    public discountPercentage!: number;
    public salesCount!: number;

    // Retenciones
    public retentionType!: 'No tiene' | 'Retefuente' | 'Rete IVA' | 'Rete ICA';
    public retentionPercentageFeesConsulting!: '2' | '4' | '6' | '10' | '11';
    public retentionPercentageServices!: '1' | '2' | '3.5' | '4' | '6';
    public retentionPercentagePurchases!: '0.1' | '0.5' | '1' | '1.5' | '2.5' | '3' | '3.5';
    public retentionPercentageOthers!: '2' | '2.5' | '3' | '4' | '7' | '10' | '20';
    public retentionPercentageForeignPaymentsDividends!: '0' | '1' | '2' | '5' | '7' | '8' | '10' | '15' | '20' | '33' | '35' | '35 + Num. 51';
    public retentionPercentageIVA!: '15' | '100';
    public retentionPercentageICA!: '2' | '3.4' | '4.14' | '5' | '6.9' | '8' | '9.66' | '11.04' | '13.8';
    // Impuestos
    public IVA!: 0 | 5 | 19;
    public consumptionTax!: '4' | '8' | '16';
    public ivaAiu!: number;
    public taxesUltraProcessedSugarSweetenedBeverages!: string;
    public valueTaxesUltraProcessedSugarSweetenedBeverages!: '0' | '18' | '28' | '35' | '38' | '55' | '65';
    public taxesUltraProcessedFoodProducts!: '10' | '15' | '20';

    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string | null;
}

Service.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nameItem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        barCode: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        serviceAssets: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        serviceProducts: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        serviceRawMaterials: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isDiscounted: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['Si', 'No']],
            },
            defaultValue: 'No',
        },
        discountPercentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        salesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },

        // Retenciones
        retentionType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['No tiene', 'Retefuente', 'Rete IVA', 'Rete ICA']],
            },
        },
        retentionPercentageFeesConsulting: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['2', '4', '6', '10', '11']],
            },
        },
        retentionPercentageServices: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['1', '2', '3.5', '4', '6']],
            },
        },
        retentionPercentagePurchases: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0.1', '0.5', '1', '1.5', '2.5', '3', '3.5']],
            },
        },
        retentionPercentageOthers: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['2', '2.5', '3', '4', '7', '10', '20']],
            },
        },
        retentionPercentageForeignPaymentsDividends: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0', '1', '2', '5', '7', '8', '10', '15', '20', '33', '35', '35 + Num. 51']],
            },
        },
        retentionPercentageIVA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['15', '100']],
            },
        },
        retentionPercentageICA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['2', '3.4', '4.14', '5', '6.9', '8', '9.66', '11.04', '13.8']],
            },
        },
        
        // Impuestos
        IVA: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[ 0, 5, 19]],
            },
            defaultValue: 0,
        },
        consumptionTax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['4', '8', '16']],
            },
        },
        ivaAiu: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        taxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        valueTaxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0', '18', '28', '35', '38', '55', '65']],
            },
        },
        taxesUltraProcessedFoodProducts: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0', '18', '28', '35', '38', '55', '65']],
            },
        },

        //RELACION CON OTRAS TABLAS
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
        modelName: 'Service',
    }
);

Service.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

Service.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Service;