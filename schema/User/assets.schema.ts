import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { InventoryOffItem } from '../../types/User/assets.types';
import Branch from './branch.schema';
import User from './user.schema';

class Assets extends Model {
    public id!: string;
    public nameItem!: string;
    public barCode!: string;
    public inventory!: number;
    public inventoryOff!: InventoryOffItem[];
    public brandAssets!: string;
    public referenceAssets!: string;
    public conditionAssets!: 'Nuevo' | 'Usado';
    public stateAssets!: 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparación';
    public purchasePriceBeforeTax!: number;
    public IVA!: number;
    public sellingPrice!: number;

    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string;
};

Assets.init(
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
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        inventoryOff: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        brandAssets: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        referenceAssets: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        conditionAssets: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Nuevo', 'Usado' ]],
            },
        },
        stateAssets: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Funciona correctamente', 'Funciona requiere mantenimiento', 'Dañada requiere cambio', 'Dañada requiere reparación' ]],
            },
        },
        purchasePriceBeforeTax: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        IVA: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
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