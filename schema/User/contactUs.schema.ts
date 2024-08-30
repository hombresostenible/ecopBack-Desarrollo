import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class ContactUs extends Model {
    public id!: string;
    public email!: string;
    public userName!: string;
    public phone!: string;
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
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
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