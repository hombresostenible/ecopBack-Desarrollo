import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';
import Branch from './branch.schema';
import AccountsBook from './accountsBook.schema';

class Sustainability extends Model {
    public id!: string;
    public registrationDate!: Date;
    public transactionDate!: Date;
    public otherExpenses!: 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos';
    public initialDate!: Date;
    public finalDate!: Date;
    public energyConsumption!: number;
    public waterConsumption!: number;
    public totalValue!: number;
    public waterReuse!: number;
    public rainWaterQuantity!: number;
    public sustainabilityStrategy!: string;
    public sustainabilityProgramsNumber!: number;
    public sustainabilityProgramName!: string;  
    public sustainabilityProgramStartingDate!: Date;
    public sustainabilityTopics!: string;
    public numberSustainabilityReports!: number;
    public numberManagersInvolvedInSustainability!: number;
    public managerName!: string;
    public managerRole!: string;
    public numberEmployeesInvolvedInSustainability!: number;
    public numberSustainabilityTrainings!: number;

    //RELACION CON OTRAS TABLAS
    public accountsBookId!: string;
    public branchId!: string;
    public userId!: string;
};

Sustainability.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true,
            primaryKey: true,
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        otherExpenses: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Acueducto', 'Energia', 'Gas', 'Internet', 'Celular/Plan de datos' ]],
            },
        },
        initialDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        finalDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        energyConsumption: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        waterConsumption: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        totalValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        waterReuse: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        rainWaterQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sustainabilityStrategy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sustainabilityProgramsNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sustainabilityProgramName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sustainabilityProgramStartingDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        sustainabilityTopics: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberSustainabilityReports: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        numberManagersInvolvedInSustainability: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        managerName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        managerRole: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberEmployeesInvolvedInSustainability: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        numberSustainabilityTrainings: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        //RELACION CON OTRAS TABLAS
        branchId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        accountsBookId: {
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
        modelName: 'Sustainability',
    }
);

Sustainability.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

Sustainability.belongsTo(AccountsBook, {
    foreignKey: 'accountsBookId',
    as: 'accountsBook',
});

Sustainability.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Sustainability;