import { DataTypes, Model } from 'sequelize';
import db from '../db';

class ProjectFunder extends Model {
    public id!: string;
    public corporateName!: string;
    public typeDocumentId!: 'NIT';
    public documentId!: string;
    public verificationDigit!: string;
    public logo!: string;
    public userType!: 'User';
    public typeRole!: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    public codeCiiu!: string;
    public department!: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    public city!: string;
    public codeDane!: string;
    public subregionCodeDane!: string;
    public address!: string;
    public postalCode!: string;
    public phone!: string;
    public email!: string;
    public password!: string;
    
    //USER MANAGEMENT
    public passwordResetCode!: string;
    public passwordResetCodeDate!: Date;
    public loginAttempts!: number;
    public isBlocked!: boolean;
    public unlockCode!: string;
    public expiresAt!: Date;
    public applicationPassword!: string;
    public isAceptedConditions!: boolean;
};

ProjectFunder.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        corporateName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeDocumentId: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'NIT' ]],
            },
            allowNull: false,
        },
        documentId: {
            type: DataTypes.STRING,
            validate: {
                // len: [10, 10], // Longitud únicamente de 9 dígitos
                len: [1, 10], // Máximo de 9 dígitos   1110521285
            },
            allowNull: false,
        },
        verificationDigit: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 1],
            },
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userType: {
            type: DataTypes.ENUM('User'),
            defaultValue: 'User',
            allowNull: false,
        },
        typeRole: {
            type: DataTypes.UUID,
            validate: {
                isIn: [[ 'CEO', 'Moderador de atención al cliente', 'CTO', 'Desarrollador de software', 'Financiador de programas', 'Superadmin', 'Administrador', 'Vendedor', 'Cajero', 'Operativo', 'Contador' ]],
            },
            defaultValue: 'Superadmin',
            allowNull: false,
        },
        codeCiiu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'Bogota D.C.', 'Amazonas', 'Antioquia', 'Arauca', 'Atlantico', 'Bolivar', 'Boyaca', 'Caldas', 'Caqueta', 'Casanare', 'Cauca', 'Cesar', 'Choco', 'Cordoba', 'Cundinamarca', 'Guainia', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindio', 'Risaralda', 'San Andres y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupes', 'Vichada' ]],
            },
            allowNull: false,
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
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        //USER MANAGEMENT
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
            defaultValue: true,
        },
        unlockCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        applicationPassword: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAceptedConditions: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'ProjectFunder',
    }
);

export default ProjectFunder;