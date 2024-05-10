import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';
import Company from './company.schema';
import CustomerTracking from './customerTracking';

class CrmClients extends Model {
    public id!: string;
    public entityUserId!: string;
    public entityCompanyId!: string;
    public name!: string;
    public lastName!: string;
    public nameCompany!: string;
    public typeDocumentId!: 'NIT' | 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';
    public documentId!: string;
    public email!: string;
    public phone!: string;
    public department!: 'Bogotá D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlántico' | 'Bolívar' | 'Boyacá' | 'Caldas' | 'Caquetá' | 'Casanare' | 'Cauca' | 'Cesar' | 'Chocó' | 'Córdoba' | 'Cundinamarca' | 'Guainía' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindío' | 'Risaralda' | 'San Andrés y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupés' | 'Vichada';
    public city!: string;
    public codeDane!: string;
    public subregionCodeDane!: string;
    public address!: string;
    
    //RELACION CON OTRAS TABLAS
    public customerTrackingId!: string;
    public userId!: string;
    public companyId!: string;
};
    
CrmClients.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        entityUserId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        entityCompanyId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nameCompany: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        typeDocumentId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'NIT', 'Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte' ]],
            },
        },
        documentId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Bogotá D.C.', 'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada' ]],
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codeDane: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subregionCodeDane: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        //RELACION CON OTRAS TABLAS
        customerTrackingId: {
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
        modelName: 'CrmClients',
    }
);

CrmClients.belongsTo(CustomerTracking, {
    foreignKey: 'customerTrackingId',
    as: 'customertracking',
});

CrmClients.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

CrmClients.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company',
});

export default CrmClients;