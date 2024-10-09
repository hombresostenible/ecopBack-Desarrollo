import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import AccountsBook from './accountsBook.schema';
import User from './user.schema';
import {
    IParametros, 
    IExtensiones, 
    IEncabezado, 
    ITerceros, 
    ILineas, 
    IAgregadoComercial,
    ITotales,
    IElectronicInvoicing,
} from '../../types/User/electronicInvoicing.types';

//Solo con ingresos
class ElectronicInvoicing extends Model<IElectronicInvoicing> {
    public id!: string;
    public Parametros!: IParametros;
    public Extensiones!: IExtensiones;
    public Encabezado!: IEncabezado;
    public Terceros!: ITerceros;
    public Lineas!: ILineas;
    public AgregadoComercial!: IAgregadoComercial;    
    public Totales!: ITotales;
    
    //RELACION CON OTRAS TABLAS
    public accountsBookId!: string;
    public branchId!: string;
    public userId!: string | null;
}

ElectronicInvoicing.init(
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
        }
    },
    {
        sequelize: db,
        modelName: 'ElectronicInvoicing',
    }
);

ElectronicInvoicing.belongsTo(AccountsBook, {
    foreignKey: 'accountsBookId',
    as: 'accountsBook',
});

ElectronicInvoicing.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

ElectronicInvoicing.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default ElectronicInvoicing;





/*

PARAMETROS: CONDICIONES GENERALES
EXTENSIONES: NO ES OBLIGATORIO PUESTO QUE APLICAN PARA CASOS ESPECIFICOS
ENCABEZADO: DATOS
TERCEROS: 
    -TERCERO PROVEEDOR CONTABLE: CLIENTE DE ECOPCION QUIEN EMITRE LA FACTUA ELECTRONICA
    -TERCERO CLIENTE CONTABLE: QUIEN RECIBE ESA FACTURA ELECTRONICA, CLIENTE DE NUESTRO CLIENTE
LINEAS: PRODUCTOS O SERVICIOS QUE SE REPORTAN EN ESE DOCUMENTO ELECTRONICO
REFERENCIAS: DEPENDE DEL TIPO
AGREGADO COMERCIAL: CUAL ES METODO DE PAGO
AGREGADO MERCANTIL: 
NOTAS: DATOS LIBRES O CAMPOS QUE LA DIAN NO TIENE EN EL JSON PERO QUE PODEMOS ENVIAR (DATOS O REFENCIAS UNICAS QUE SOLO MANEJE ECOPCION)
TOTALES:
EXTENSIONESSMB: EXTENSIONES PROPIAS DE SIMBA
SALUD: SOLO PARA EL SECTOR SLUD
*/