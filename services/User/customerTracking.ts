import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import User from './user.schema';

class CustomerTracking extends Model {
    public id!: string;                             // ID DEL CLIENTE 
    public lastSale!: Date;                         // ULTIMA VENTA
    public newsletterSubscriber!: 'Si' | 'No';      // SUSCRITO A NEWSLETTER
    public lastCall!: Date;                         // ULTIMA LLAMADA HECHA
    public lastEmail!: Date;                        // ULTIMO EMAIL ENVIADO
    public lastQuotation!: Date;                    // ULTIMA COTIZACION
    public lastMeeting!: Date;                      // ULTIMO ENCUENTRO
    public typeMeeting!: 'Personal' | 'Digital';    // TIPO DE ENCUENTRO
    public accumulatedSalesValue!: string;          // VALOR ACUMULADO DE VENTAS
    public accumulatedSalesQuantity!: string;       // CANTIDAD ACUMULADA DE VENTAS
    
    //RELACION CON OTRAS TABLAS
    public userId!: string;
};
    
CustomerTracking.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        lastSale: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        newsletterSubscriber: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Si', 'No' ]],
            },
        },
        lastCall: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lastEmail: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lastQuotation: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lastMeeting: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        typeMeeting: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Personal', 'Digital' ]],
            },
        },
        accumulatedSalesValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accumulatedSalesQuantity: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        //RELACION CON OTRAS TABLAS
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'CustomerTracking',
    }
);

CustomerTracking.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default CustomerTracking;