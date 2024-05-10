import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';
import Company from './company.schema';

class SalesFunnelCustomerDigital extends Model {
    public id!: string;
    public pipelineRegistrationDate!: Date;
    public pipelinePeriodOfAnalysis!: string;
    public nameDigitalCampaign!: string;
    public campaignNumberOfDays!: number;
    public campaignClicksViews!: number;
    public interestedCustomers!: number;
    public leads!: number;
    public salesNumber!: number;
    public totalValue!: number;
    
    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string;
    public companyId!: string;
};

SalesFunnelCustomerDigital.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        pipelineRegistrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        pipelinePeriodOfAnalysis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nameDigitalCampaign: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        campaignNumberOfDays: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        campaignClicksViews: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        interestedCustomers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        leads: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salesNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalValue: {
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
        modelName: 'SalesFunnelCustomerDigital',
    }
);

SalesFunnelCustomerDigital.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

SalesFunnelCustomerDigital.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
  
SalesFunnelCustomerDigital.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company',
});

export default SalesFunnelCustomerDigital;