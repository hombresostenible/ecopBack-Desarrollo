import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { IWithholdingTax } from '../../types/User/services.types';
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
    public retentions!: IWithholdingTax[];
    // Impuestos
    public IVA!: 0 | 5 | 19;
    public consumptionTax!: 4 | 8 | 16;
    public ivaAiu!: 0 | 1;
    public taxesUltraProcessedSugarSweetenedBeverages!: number;
    public valueTaxesUltraProcessedSugarSweetenedBeverages!: 0 | 18 | 28 | 35 | 38 | 55 | 65;
    public taxesUltraProcessedFoodProducts!: 10 | 15 | 20;

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
        retentions: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
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
                isIn: [[4, 8, 16]],
            },
        },
        ivaAiu: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[0, 1]],
            },
        },
        taxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        valueTaxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[0, 18, 28, 35, 38, 55, 65]],
            },
        },
        taxesUltraProcessedFoodProducts: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[10, 15, 20]],
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