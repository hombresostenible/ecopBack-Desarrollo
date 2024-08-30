import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class ContactUs extends Model {
    public id!: string;
    public email!: string;
    public nameUser!: string;
    public phone!: string;
    public selectedTopic!: 'Indicadores' | 'Inventario' | 'Facturacion electronica' | 'Otro';
    public helpDescription!: string;
    public isAceptedConditions!: boolean;
};

ContactUs.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        nameUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        selectedTopic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Indicadores', 'Inventario', 'Facturacion electronica', 'Otro' ]],
            },
        },
        helpDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAceptedConditions: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'ContactUs',
    }
);

export default ContactUs;