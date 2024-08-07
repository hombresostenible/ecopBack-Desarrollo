import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { IIvaAiu } from '../../types/User/RetentonAndTaxes/ivaAiu.types';
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
    // Impuestos y rentenciones
    public IVA!: 'No aplica' | 0 | 5 | 19;
    public ivaAiu!: IIvaAiu;
    public consumptionTax!: 'No aplica' | 4 | 8 | 16;
    public retentionType!: 'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
    public withholdingTax!: 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
    public withholdingIVA!: 'No aplica' | 15 | 100;
    public withholdingICA!: 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;

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

        // Impuestos y rentenciones
        IVA: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'No aplica', 0, 5, 19 ]],
            },
            defaultValue: 0,
        },
        ivaAiu: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'No aplica', 0, 1 ]],
            },
            defaultValue: 'No aplica',
        },
        consumptionTax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'No aplica', 4, 8, 16 ]],
            },
            defaultValue: 'No aplica',
        },
        retentionType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 'Honorarios y consultoria', 'Servicios', 'Compras', 'Otros', 'Pagos al exterior y dividendos' ]],
            },
        },
        withholdingTax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 0.1, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6, 7, 8, 10, 11, 15, 20, 33, 35 ]],
            },
            defaultValue: 'No aplica',
        },
        withholdingIVA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 15, 100 ]],
            },
            defaultValue: 'No aplica',
        },
        withholdingICA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 2, 3.4, 4.14, 5, 6.9, 8, 9.66, 11.04, 13.8 ]],
            },
            defaultValue: 'No aplica',
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