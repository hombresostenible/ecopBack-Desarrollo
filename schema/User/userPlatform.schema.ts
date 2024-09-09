import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';

class UserPlatform extends Model {
    public id!: string;
    public name!: string;
    public lastName!: string;
    public typeDocumentId!: 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    public documentId!: string;
    public profilePicture!: string;
    public logo!: string;
    public typeRole!: 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    public email!: string;
    public password!: string;
    public phone!: string;
    public department!: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    public city!: string;
    public codeDane!: string;
    public subregionCodeDane!: string;
    public address!: string;
    public isAceptedConditions!: boolean;

    //USER MANAGEMENT
    public passwordResetCode!: string;
    public passwordResetCodeDate!: Date;
    public loginAttempts!: number;
    public isBlocked!: boolean;
    public unlockCode!: string;
    public expiresAt!: Date;
    public applicationPassword!: string;
    
    //RELACION DE TABLAS
    public branchId!: string;
    public userId!: string;
};

UserPlatform.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeDocumentId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte' ]],
            },
        },
        documentId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // len: [10, 10], // Longitud únicamente de 9 dígitos
                len: [1, 10], // Máximo de 9 dígitos   1110521285
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
        typeRole: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isIn: [[ 'CEO', 'Moderador de atención al cliente', 'CTO', 'Desarrollador de software', 'Financiador de programas', 'Superadmin', 'Administrador', 'Vendedor', 'Cajero', 'Operativo', 'Contador' ]],
            },
            defaultValue: 'Superadmin',
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
                isIn: [[ 'Bogota D.C.', 'Amazonas', 'Antioquia', 'Arauca', 'Atlantico', 'Bolivar', 'Boyaca', 'Caldas', 'Caqueta', 'Casanare', 'Cauca', 'Cesar', 'Choco', 'Cordoba', 'Cundinamarca', 'Guainia', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindio', 'Risaralda', 'San Andres y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupes', 'Vichada' ]],
            },
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
        isAceptedConditions: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        
        //RELACION DE TABLAS
        branchId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'UserPlatform',
    }
);

UserPlatform.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

UserPlatform.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default UserPlatform;