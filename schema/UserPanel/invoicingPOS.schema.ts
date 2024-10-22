import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import AccountsBook from './accountsBook.schema';
import Branch from './branch.schema';
import User from './user.schema';
import {
    IParametros, 
    IExtensiones, 
    IEncabezado, 
    ITerceros, 
    ILineas, 
    IAgregadoComercial,
    ITotales,
    IInvoicingPOS,
} from '../../types/User/invoicingPOS.types';

class InvoicingPOS extends Model<IInvoicingPOS> {
    public id!: string;
    public Parametros!: IParametros;
    public Extensiones!: IExtensiones;
    public Encabezado!: IEncabezado;
    public Terceros!: ITerceros;
    public Lineas!: ILineas;
    public AgregadoComercial!: IAgregadoComercial;
    public Notas!: [];
    public Totales!: ITotales;
    
    //RELACION CON OTRAS TABLAS
    public accountsBookId!: string;
    public branchId!: string;
    public userId!: string | null;
}

InvoicingPOS.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        Parametros: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Extensiones: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Encabezado: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Terceros: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Lineas: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        AgregadoComercial: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Notas: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Totales: {
            type: DataTypes.JSON,
            allowNull: true,
        },

        //RELACION CON OTRAS TABLAS
        accountsBookId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        branchId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'InvoicingPOS',
    }
);

InvoicingPOS.belongsTo(AccountsBook, {
    foreignKey: 'accountsBookId',
    as: 'accountsBook',
});

InvoicingPOS.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

InvoicingPOS.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default InvoicingPOS;