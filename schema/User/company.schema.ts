import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class Company extends Model {
    public id!: string;
    public nameCompany!: string;
    public NIT!: string;
    public verificationDigit!: string;
    public profilePicture!: string;
    public logo!: string;
    public commercialName!: string;
    public userType!: 'Company';
    public typeRole!: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    public nameCompanyLeader!: string;
    public lastNameCompanyLeader!: string;
    public typeDocumentIdLeaderCompany!: 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';
    public documentIdLeaderCompany!: string;
    public economicSector!: 'Agricultura' | 'Manufactura' | 'Comercio' | 'Servicios' | 'Construcción' | 'Turismo' | 'Otro';
    public codeCiiu!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public department!: 'Bogotá D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlántico' | 'Bolívar' | 'Boyacá' | 'Caldas' | 'Caquetá' | 'Casanare' | 'Cauca' | 'Cesar' | 'Chocó' | 'Córdoba' | 'Cundinamarca' | 'Guainía' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindío' | 'Risaralda' | 'San Andrés y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupés' | 'Vichada';
    public city!: string;
    public codeDane!: string;
    public subregionCodeDane!: string;
    public address!: string;
    public numberEmployees!: number;
    
    public passwordResetCode!: string;
    public passwordResetCodeDate!: Date;
    public loginAttempts!: number;
    public isBlocked!: boolean;
    public unlockCode!: string;
    public expiresAt!: Date;
    public projectFunder!: string;
    public applicationPassword!: string;
    public isAceptedConditions!: boolean;
};

Company.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nameCompany: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NIT: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [9, 9], // Longitud únicamente de 9 dígitos
                //len: [0, 9], // Máximo de 9 dígitos   1110521285
            },
        },
        verificationDigit: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 1],
            },
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        commercialName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userType: {
            type: DataTypes.ENUM('Company'),
            defaultValue: 'Company',
        },
        typeRole: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isIn: [[ 'CEO', 'Moderador de atención al cliente', 'CTO', 'Desarrollador de software', 'Financiador de programas', 'Superadmin', 'Administrador', 'Vendedor', 'Cajero', 'Operativo', 'Contador' ]],
            },
            defaultValue: 'Superadmin',
        },
        nameCompanyLeader: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastNameCompanyLeader: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeDocumentIdLeaderCompany: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte']],
            },
        },
        documentIdLeaderCompany: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        economicSector: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Agricultura' , 'Manufactura' , 'Comercio' , 'Servicios' , 'Construcción' , 'Turismo' , 'Otro']],
            },
        },
        codeCiiu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Bogotá D.C.' , 'Amazonas' , 'Antioquia' , 'Arauca' , 'Atlántico' , 'Bolívar' , 'Boyacá' , 'Caldas' , 'Caquetá' , 'Casanare' , 'Cauca' , 'Cesar' , 'Chocó' , 'Córdoba' , 'Cundinamarca' , 'Guainía' , 'Guaviare' , 'Huila' , 'La Guajira' , 'Magdalena' , 'Meta' , 'Nariño' , 'Norte de Santander' , 'Putumayo' , 'Quindío' , 'Risaralda' , 'San Andrés y Providencia' , 'Santander' , 'Sucre' , 'Tolima' , 'Valle del Cauca' , 'Vaupés' , 'Vichada']],
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codeDane: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subregionCodeDane: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numberEmployees: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        passwordResetCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        passwordResetCodeDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        loginAttempts : {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        unlockCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        projectFunder: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        applicationPassword: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAceptedConditions: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        modelName: 'Company',
    }
);

export default Company;