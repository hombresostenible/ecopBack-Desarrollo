// src/schema/User/quotation.schema.ts
import { DataTypes, Model, Optional } from 'sequelize';
import db from '../../db';
import Branch from './branch.schema';
import User from './user.schema';
import CrmClient from './crmClients.schema';

interface QuotationAttributes {
  id: string;
  quotationNumber?: number | null;
  quotationDate: Date;
  expirationDate?: Date | null;
  customerId?: string | null;
  itemsQuoted?: any;
  totalAmount: number;
  status?: string;
  notes?: string | null;
  branchId: string;
  userId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuotationCreationAttributes extends Optional<QuotationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Quotation extends Model<QuotationAttributes, QuotationCreationAttributes> implements QuotationAttributes {
  public id!: string;
  public quotationNumber!: number | null;
  public quotationDate!: Date;
  public expirationDate!: Date | null;
  public customerId!: string | null;
  public itemsQuoted!: any;
  public totalAmount!: number;
  public status!: string;
  public notes!: string | null;
  public branchId!: string;
  public userId!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Si tienes timestamps automáticos, puedes declarar los campos readonly
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

Quotation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quotationNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quotationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    itemsQuoted: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    branchId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: 'Quotation',
    tableName: 'Quotations', 
  }
);

// Definir asociaciones
Quotation.belongsTo(CrmClient, { foreignKey: 'customerId', as: 'customer' });
Quotation.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
Quotation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Quotation;
