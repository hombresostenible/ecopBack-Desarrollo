import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';
import Company from './company.schema';

class SalesFunnelCustomerRet extends Model {
    public id!: string;
    public crcRegistrationDate!: Date;
    public crcPeriodOfAnalysis!: string;
    public crcDiscountsInvestment!: number;
    public crcGuarranteesCosts!: number;
    public crcAdvertisingInvestment!: number;
    public crcSalesTeamCost!: number;
    public crcSalesComissions!: number;
    public crcTransportCosts!: number;    
    public crcEventsCost!: number;
    public crcCurrentClients!: number;
    
    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string;
    public companyId!: string;
};

SalesFunnelCustomerRet.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        crcRegistrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        crcPeriodOfAnalysis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crcDiscountsInvestment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcGuarranteesCosts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcAdvertisingInvestment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcSalesTeamCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcSalesComissions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcTransportCosts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcEventsCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crcCurrentClients: {
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
        companyId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'SalesFunnelCustomerRet',
    }
);

SalesFunnelCustomerRet.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

SalesFunnelCustomerRet.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
  
SalesFunnelCustomerRet.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company',
});

export default SalesFunnelCustomerRet;