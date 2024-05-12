import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';

class Branch extends Model {
    public id!: string;
    public nameBranch!: string;
    public department!: 'Bogotá D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlántico' | 'Bolívar' | 'Boyacá' | 'Caldas' | 'Caquetá' | 'Casanare' | 'Cauca' | 'Cesar' | 'Chocó' | 'Córdoba' | 'Cundinamarca' | 'Guainía' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindío' | 'Risaralda' | 'San Andrés y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupés' | 'Vichada';
    public city!: string;
    public codeDane!: string;
    public subregionCodeDane!: string;
    public addressBranch!: string;
    public contactEmailBranch!: string;
    public contactPhoneBranch!: string;
    public nameManagerBranch!: string;
    public lastNameManagerBranch!: string;
    public typeDocumentIdManager!: 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';    
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
            allowNull: false,
            validate: {
                isIn: [[ 'Bogotá D.C.', 'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada' ]],
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
                isIn: [[ 'Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte' ]],
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