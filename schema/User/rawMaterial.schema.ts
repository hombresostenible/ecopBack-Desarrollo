import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { IInventoryOffItem } from '../../types/User/rawMaterial.types';
import Branch from './branch.schema';
import User from './user.schema';

class RawMaterial extends Model {
    public id!: string;
    public barCode!: string;
    public nameItem!: string;
    public brandItem!: string;
    public packaged!: 'Si' | 'No';
    public primaryPackageType!: 'Ninguno' | 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    public individualPackaging!: 'Si' | 'No';
    public secondaryPackageType!: 'Ninguno' | 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    public quantityPerPackage!: number;
    public returnablePackaging!: 'Si' | 'No';
    public inventory!: number;
    public unitMeasure!: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
    public inventoryIncrease!: 'Si' | 'No';
    public periodicityAutomaticIncrease!: 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral';
    public automaticInventoryIncrease!: number;
    public purchasePriceBeforeTax!: number;
    public sellingPrice!: number;
    public isDiscounted!: 'Si' | 'No';
    public discountPercentag!: number;
    public salesCount!: number;
    public expirationDate!: Date;    
    public inventoryChanges!: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    public inventoryOff!: IInventoryOffItem[];
    public reasonManualDiscountingInventory!: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';
    public quantityManualDiscountingInventory!: number;
    // Retenciones
    public retentionType!: 'No tiene' | 'Retefuente' | 'Rete IVA' | 'Rete ICA';
    public retentionPercentageFeesConsulting!: '2' | '4' | '6' | '10' | '11';
    public retentionPercentageServices!: '1' | '2' | '3.5' | '4' | '6';
    public retentionPercentagePurchases!: '0.1' | '0.5' | '1' | '1.5' | '2.5' | '3' | '3.5';
    public retentionPercentageOthers!: '2' | '2.5' | '3' | '4' | '7' | '10' | '20';
    public retentionPercentageForeignPaymentsDividends!: '0' | '1' | '2' | '5' | '7' | '8' | '10' | '15' | '20' | '33' | '35' | '35 + Num. 51';
    public retentionPercentageIVA!: '15' | '100';
    public retentionPercentageICA!: '2' | '3.4' | '4.14' | '5' | '6.9' | '8' | '9.66' | '11.04' | '13.8';
    // Impuestos
    public IVA!: 0 | 5 | 19;
    public consumptionTax!: '4' | '8' | '16';
    public ivaAiu!: number;
    public taxesUltraProcessedSugarSweetenedBeverages!: number;
    public valueTaxesUltraProcessedSugarSweetenedBeverages!: '0' | '18' | '28' | '35' | '38' | '55' | '65';
    public taxesUltraProcessedFoodProducts!: '10' | '15' | '20';
    
    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string;
}

RawMaterial.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        barCode: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        nameItem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brandItem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        packaged: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Si', 'No' ]],
            },
            defaultValue: 'No',
        },
        primaryPackageType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Ninguno', 'Papel', 'Papel de archivo', 'Carton', 'Aluminio', 'Plegadiza', 'Vidrio', 'PET / PETE Polietileno Tereftalato', 'HDPE Polietileno de alta densidad', 'PVC Policloruro de Vinilo', 'LDPE Polietileno de baja densidad', 'PP Polipropileno', 'PS Poliestireno', 'Otros plasticos (Policarbonato, estireno, nylon)', 'Hierro', 'Icopor', 'Biodegradable', 'Plastico de burbujas' ]],
            },
            defaultValue: 'Ninguno',
        },
        individualPackaging: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'Si', 'No' ]],
            },
            defaultValue: 'No',
        },
        secondaryPackageType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Ninguno', 'Papel', 'Papel de archivo', 'Carton', 'Aluminio', 'Plegadiza', 'Vidrio', 'PET / PETE Polietileno Tereftalato', 'HDPE Polietileno de alta densidad', 'PVC Policloruro de Vinilo', 'LDPE Polietileno de baja densidad', 'PP Polipropileno', 'PS Poliestireno', 'Otros plasticos (Policarbonato, estireno, nylon)', 'Hierro', 'Icopor', 'Biodegradable', 'Plastico de burbujas' ]],
            },
            defaultValue: 'Ninguno',
        },
        quantityPerPackage: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        returnablePackaging: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'Si', 'No' ]],
            },
            defaultValue: 'No',
        },
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        unitMeasure: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'Unidades', 'Ristra', 'Decena', 'Docena', 'Miligramo', 'Gramo', 'Media libra', 'Libra', 'Kilogramo', 'Caja', 'Paca', 'Arroba', 'Bulto', 'Saco', 'Tonelada', 'Mililitro', 'Onza', 'Litro', 'Galon', 'Pimpina', 'Metro cubico', 'Milimetro', 'Centrimetro', 'Pulgada', 'Metro', 'Centimetro cuadrado', 'Metro cuadrado' ]],
            },
        },
        inventoryIncrease: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'Si', 'No' ]],
            },
            defaultValue: 'No',
        },
        periodicityAutomaticIncrease: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Diario', 'Semanal', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Semestral' ]],
            },
        },        
        automaticInventoryIncrease: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        purchasePriceBeforeTax: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        isDiscounted: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [['Si', 'No']],
            },
            defaultValue: 'No',
        },
        discountPercentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        salesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        inventoryChanges: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        reasonManualDiscountingInventory: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'Donado', 'Desechado', 'Caducado', 'Perdido', 'Hurtado' ]],
            },
        },        
        quantityManualDiscountingInventory: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        inventoryOff: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        
        // Retenciones
        retentionType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['No tiene', 'Retefuente', 'Rete IVA', 'Rete ICA']],
            },
        },
        retentionPercentageFeesConsulting: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['2', '4', '6', '10', '11']],
            },
        },
        retentionPercentageServices: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['1', '2', '3.5', '4', '6']],
            },
        },
        retentionPercentagePurchases: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0.1', '0.5', '1', '1.5', '2.5', '3', '3.5']],
            },
        },
        retentionPercentageOthers: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['2', '2.5', '3', '4', '7', '10', '20']],
            },
        },
        retentionPercentageForeignPaymentsDividends: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0', '1', '2', '5', '7', '8', '10', '15', '20', '33', '35', '35 + Num. 51']],
            },
        },
        retentionPercentageIVA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['15', '100']],
            },
        },
        retentionPercentageICA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['2', '3.4', '4.14', '5', '6.9', '8', '9.66', '11.04', '13.8']],
            },
        },
        
        // Impuestos
        IVA: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[ 0, 5, 19]],
            },
            defaultValue: 0,
        },
        consumptionTax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['4', '8', '16']],
            },
        },
        ivaAiu: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        taxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        valueTaxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['0', '18', '28', '35', '38', '55', '65']],
            },
        },
        taxesUltraProcessedFoodProducts: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['10', '15', '20']],
            },
        },

        //RELACION CON OTRAS TABLAS
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
        modelName: 'RawMaterial',
    }
);

RawMaterial.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

RawMaterial.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default RawMaterial;