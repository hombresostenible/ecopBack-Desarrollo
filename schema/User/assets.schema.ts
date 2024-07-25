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
    public referenceAssets!: string;
    public stateAssets!: 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparacion';
    public conditionAssets!: 'Nuevo' | 'Usado';
    public inventory!: number;
    public purchasePriceBeforeTax!: number;
    public IVA!: 'No aplica' | 0 | 5 | 19;
    public sellingPrice!: number;
    public inventoryOff!: IInventoryOffAssets[];

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
        referenceAssets: {
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

        // Retenciones

        // Impuestos
        IVA: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[ 'No aplica', 0, 5, 19 ]],
            },
            defaultValue: 0,
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        inventoryOff: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
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