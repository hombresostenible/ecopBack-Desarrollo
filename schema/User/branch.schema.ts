import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';

class Branch extends Model {
    public id!: string;
    public nameBranch!: string;
    public department!: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    public city!: string;
    public codeDane?: string;
    public subregionCodeDane?: string;
    public addressBranch!: string;
    public contactEmailBranch!: string;
    public contactPhoneBranch!: string;
    public nameManagerBranch!: string;
    public lastNameManagerBranch!: string;
    public typeDocumentIdManager!: 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';    
    public documentIdManager!: string;

    //RELACION CON OTRAS TABLAS
    public userId!: string;
}

Branch.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nameBranch: {
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
            allowNull: true,
        },
        subregionCodeDane: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addressBranch: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactEmailBranch: {
            type: DataTypes.STRING,
        },
        contactPhoneBranch: {
            type: DataTypes.STRING,
        },
        nameManagerBranch: {
            type: DataTypes.STRING,
        },
        lastNameManagerBranch: {
            type: DataTypes.STRING,
        },
        typeDocumentIdManager: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte' ]],
            },
        },
        documentIdManager: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        //RELACION CON OTRAS TABLAS
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'Branch',
    }
);

Branch.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Branch;
