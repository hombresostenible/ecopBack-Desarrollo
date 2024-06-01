import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class ContactUs extends Model {
    public id!: string;
    public email!: string;
    public nameUser!: string;
    public phone!: string;
    public helpDescription!: string;
    public selectedTopic!: 'Indicadores' | 'Inventario' | 'Facturacion electronica' | 'Otro';
    public acceptPersonalDataPolicy!: boolean;
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
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helpDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        selectedTopic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Indicadores', 'Inventario', 'Facturacion electronica', 'Otro' ]],
            },
        },
        acceptPersonalDataPolicy: {
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