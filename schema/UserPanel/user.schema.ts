import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import ProjectFunder from '../projectFunder.schema';

class User extends Model {
    public id!: string;
    public name!: string;
    public lastName!: string;
    public corporateName!: string;
    public typeDocumentId!: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    public documentId!: string;
    public verificationDigit!: string;
    public commercialName!: string;
    public logo!: string;
    public typeRole!: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    public economicSector!: 'Agricultura' | 'Manufactura' | 'Comercio' | 'Servicios' | 'Construcción' | 'Turismo' | 'Otro';
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
    //Responsable de IVA
    
    //USER MANAGEMENT
    public passwordResetCode!: string;
    public passwordResetCodeDate!: Date;
    public loginAttempts!: number;
    public isBlocked!: boolean;
    public unlockCode!: string;
    public expiresAt!: Date;
    public emailProvider!: 'aol' | 'gmail' | 'hotmail' | 'outlook' |'yahoo' | 'zoho';
    public applicationPassword!: string;
    public isAceptedConditions!: boolean;
    
    //RELACION CON OTRAS TABLAS
    public projectFunderId!: string | null;
};

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        corporateName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        typeDocumentId: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'NIT', 'Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte' ]],
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
            allowNull: true,
        },
        commercialName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        typeRole: {
            type: DataTypes.UUID,
            validate: {
                isIn: [[ 'CEO', 'Moderador de atención al cliente', 'CTO', 'Desarrollador de software', 'Financiador de programas', 'Superadmin', 'Administrador', 'Vendedor', 'Cajero', 'Operativo', 'Contador' ]],
            },
            defaultValue: 'Superadmin',
            allowNull: false,
        },
        economicSector: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'Agricultura', 'Manufactura', 'Comercio', 'Servicios', 'Construcción', 'Turismo', 'Otro' ]],
            },
            allowNull: true,
        },
        codeCiiu: {
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: true,
        },
        subregionCodeDane: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true,
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
            defaultValue: false,
            allowNull: true,
        },
        unlockCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        emailProvider: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[ 'aol', 'gmail', 'hotmail', 'outlook', 'yahoo', 'zoho' ]],
            },
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

        //RELACION CON OTRAS TABLAS
        projectFunderId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'User',
    }
);

User.belongsTo(ProjectFunder, {
    foreignKey: 'projectFunderId',
    as: 'projectFunder',
});

export default User;