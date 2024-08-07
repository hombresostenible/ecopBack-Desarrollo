import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { IInventoryOffAssets } from '../../types/User/InventoryOffItem/iInventoryOffItem.types';
import Branch from './branch.schema';
import User from './user.schema';

class Assets extends Model {
    public id!: string;
    public barCode!: string;
    public nameItem!: string;
    public brandItem!: string;
    public referenceItem!: string;
    public stateAssets!: 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparacion';
    public conditionAssets!: 'Nuevo' | 'Usado';
    public inventory!: number;
    public purchasePriceBeforeTax!: number;
    public sellingPrice!: number;
    public isDiscounted!: 'Si' | 'No';
    public discountPercentage!: number;
    public inventoryOff!: IInventoryOffAssets[];
    // Impuestos y rentenciones
    public IVA!: 'No aplica' | 0 | 5 | 19;
    public consumptionTax!: 'No aplica' | 4 | 8 | 16;
    public retentionType!: 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
    public withholdingTax!: 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
    public withholdingIVA!: 'No aplica' | 15 | 100;
    public withholdingICA!: 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;

    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId?: string;
};

Assets.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        barCode: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        nameItem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brandItem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        referenceItem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stateAssets: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Funciona correctamente', 'Funciona requiere mantenimiento', 'Dañada requiere cambio', 'Dañada requiere reparacion' ]],
            },
        },
        conditionAssets: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Nuevo', 'Usado' ]],
            },
        },
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        purchasePriceBeforeTax: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        isDiscounted: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Si', 'No' ]],
            },
            defaultValue: 'No',
        },
        discountPercentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        inventoryOff: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },

        // Impuestos
        IVA: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[ 'No aplica', 0, 5, 19 ]],
            },
            defaultValue: 0,
        },
        consumptionTax: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[ 'No aplica', 4, 8, 16 ]],
            },
            defaultValue: 'No aplica',
        },
        retentionType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[ 'Honorarios y consultoria', 'Servicios', 'Compras', 'Otros', 'Pagos al exterior y dividendos' ]],
            },
        },
        withholdingTax: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[ 'No aplica', 0.1, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6, 7, 8, 10, 11, 15, 20, 33, 35 ]],
            },
            defaultValue: 'No aplica',
        },
        withholdingIVA: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[ 'No aplica', 15, 100 ]],
            },
            defaultValue: 'No aplica',
        },
        withholdingICA: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'Assets',
    }
);

Assets.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

Assets.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Assets;