import { DataTypes, Model, Optional } from 'sequelize';
import db from '../../../db';
import User from '../user.schema';

// Definición de los enums para frecuencia, prioridad, y tipo
export enum Frequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    BIMONTHLY = 'bimonthly'
}

export enum Priority {
    LOW = 'low',
    NORMAL = 'normal',
    HIGH = 'high',
}

export enum NotificationType {
    TRIBUTARIAS = 'Tributarias y/o legales',
    CUENTAS = 'Cuentas',
    INVENTARIOS = 'Inventarios',
    FACTURACION_POS = 'Facturación y POS',
    MERCADO = 'Mercado',
}

// Definir la interfaz de los atributos de Notification
interface NotificationAttributes {
    id: string;
    title: string;
    message: string;
    isTemporary: boolean;
    frequency: Frequency;
    startDate: Date | null;
    endDate: Date;
    executionDate: Date;
    userId: string;
    isRead: boolean;
    isDelete: boolean;
    isPending: boolean;
    priority: Priority;
    actionCall: string;
    type: NotificationType;
    idDescription:number
}

// Atributos opcionales para la creación de una nueva notificación
export interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id' | 'startDate'> {}

// Modelo Notification con Sequelize y tipado TypeScript
class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> 
    implements NotificationAttributes {
    public id!: string;
    public title!: string;
    public message!: string;
    public isTemporary!: boolean;
    public frequency!: Frequency;
    public startDate!: Date | null;
    public endDate!: Date;
    public executionDate!: Date;
    public userId!: string;
    public isRead!: boolean;
    public isDelete!: boolean;
    public isPending!: boolean;
    public priority!: Priority;
    public actionCall!: string;
    public type!: NotificationType;
    public idDescription!:number
};

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,  // No puede ser nulo, es obligatorio
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,  // Campo obligatorio
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,  // Campo obligatorio
        },
        isTemporary: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,  // Campo obligatorio
        },
        frequency: {
            type: DataTypes.ENUM(...Object.values(Frequency)),
            allowNull: false,  // Campo obligatorio, el valor debe estar en el enum
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,  // Campo opcional, puede ser nulo
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,  // Campo opcional, puede ser nulo
        },
        executionDate: {
            type: DataTypes.DATE,
            allowNull: false, 
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,  // Campo obligatorio, debe estar asociado a un usuario
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,  // Campo obligatorio
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,  // Campo obligatorio
        },
        isPending: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,  // Campo obligatorio
        },
        priority: {
            type: DataTypes.ENUM(...Object.values(Priority)),
            defaultValue: Priority.NORMAL,
            allowNull: false,  // Campo obligatorio, debe ser uno de los valores del enum
        },
        actionCall: {
            type: DataTypes.STRING,
            allowNull: false,  
        },
        type: {
            type: DataTypes.ENUM(...Object.values(NotificationType)),
            allowNull: false,  
        },
        idDescription: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
    },
    {
        sequelize: db,
        modelName: 'Notification',
        tableName: 'Notification', 
    }
);

// Relación con el modelo User
Notification.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Notification;
