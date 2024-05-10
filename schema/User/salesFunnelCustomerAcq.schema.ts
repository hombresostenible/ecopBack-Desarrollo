import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';

class SalesFunnelCustomerAcq extends Model {
    public id!: string;
    public cacRegistrationDate!: Date;
    public cacPeriodOfAnalysis!: string;
    public cacAdvertisingInvestment!: number;
    public cacSalesTeamCost!: number;
    public cacSalesComissions!: number;
    public cacTransportCost!: number;
    public cacEventsCost!: number;
    public cacNewClients!: number;
    
    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string;
};

SalesFunnelCustomerAcq.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        cacRegistrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cacPeriodOfAnalysis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cacAdvertisingInvestment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cacSalesTeamCost: {
            type: DataTypes.INTEGER,
        },
        cacSalesComissions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cacTransportCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cacEventsCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cacNewClients: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        //RELACION CON OTRAS TABLAS
        branchId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'SalesFunnelCustomerAcq',
    }
);

SalesFunnelCustomerAcq.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

SalesFunnelCustomerAcq.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default SalesFunnelCustomerAcq;