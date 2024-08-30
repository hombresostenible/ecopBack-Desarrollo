import { DataTypes, Model } from 'sequelize';
import db from '../../db';

class Newsletter extends Model {
    public id!: string;
    public email!: string;
};

Newsletter.init(
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
    },
    {
        sequelize: db,
        modelName: 'Newsletter',
    }
);

export default Newsletter;