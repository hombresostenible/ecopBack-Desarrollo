import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';
import CustomerTracking from './customerTracking';

class CrmClients extends Model {
    public id!: string;
    public entityUserId!: string;
    public name!: string;
    public lastName!: string;
    public corporateName!: string;
    public typeDocumentId!: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    public documentId!: string;
    public email!: string;
    public phone!: string;
    public department!: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    public city!: string;
    public codeDane!: string;
    public subregionCodeDane!: string;
    public address!: string;
    
    //RELACION CON OTRAS TABLAS
    public customerTrackingId!: string;
    public userId!: string;
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
            allowNull: false,
            validate: {
                isIn: [[ 'NIT', 'Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte' ]],
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
                isIn: [[ 'Bogota D.C.', 'Amazonas', 'Antioquia', 'Arauca', 'Atlantico', 'Bolivar', 'Boyaca', 'Caldas', 'Caqueta', 'Casanare', 'Cauca', 'Cesar', 'Choco', 'Cordoba', 'Cundinamarca', 'Guainia', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindio', 'Risaralda', 'San Andres y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupes', 'Vichada' ]],
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

export default CrmClients;