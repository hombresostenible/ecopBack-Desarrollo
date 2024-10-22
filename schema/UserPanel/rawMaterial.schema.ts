import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { IInventoryOffItem } from '../../types/UserPanel/InventoryOffItem/iInventoryOffItem.types';
import { IIvaAiu } from '../../types/UserPanel/RetentonAndTaxes/ivaAiu.types';
import Branch from './branch.schema';
import User from './user.schema';

class RawMaterial extends Model {
    public id!: string;
    public barCode!: string;
    public nameItem!: string;
    public type!: 'RawMaterial';
    public brandItem!: string;
    public packaged!: 'Si' | 'No';
    public primaryPackageType!: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    public individualPackaging!: 'Si' | 'No';
    public secondaryPackageType!: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    public quantityPerPackage!: number;
    public returnablePackaging!: 'Si' | 'No';
    public inventory!: number;
    public unitMeasure!: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bolsa' | 'Bulto' | 'Caneca' | 'Frasco' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Botella' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
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
    // Impuestos y rentenciones
    public IVA!: 'No aplica' | 0 | 5 | 19;
    public ivaAiu!: IIvaAiu;
    public consumptionTax!: 'No aplica' | 4 | 8 | 16;
    public retentionType!: 'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
    public withholdingTax!: 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
    public withholdingIVA!: 'No aplica' | 15 | 100;
    public withholdingICA!: 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;
    public sugarDrinksTax!: number;
    public ultraprocessedGroceriesTax!: number;  
    // RELACION CON OTRAS TABLAS
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
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'RawMaterial',
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
                isIn: [[ 'Papel', 'Papel de archivo', 'Carton', 'Aluminio', 'Plegadiza', 'Vidrio', 'PET / PETE Polietileno Tereftalato', 'HDPE Polietileno de alta densidad', 'PVC Policloruro de Vinilo', 'LDPE Polietileno de baja densidad', 'PP Polipropileno', 'PS Poliestireno', 'Otros plasticos (Policarbonato, estireno, nylon)', 'Hierro', 'Icopor', 'Biodegradable', 'Plastico de burbujas' ]],
            },
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
                isIn: [[ 'Papel', 'Papel de archivo', 'Carton', 'Aluminio', 'Plegadiza', 'Vidrio', 'PET / PETE Polietileno Tereftalato', 'HDPE Polietileno de alta densidad', 'PVC Policloruro de Vinilo', 'LDPE Polietileno de baja densidad', 'PP Polipropileno', 'PS Poliestireno', 'Otros plasticos (Policarbonato, estireno, nylon)', 'Hierro', 'Icopor', 'Biodegradable', 'Plastico de burbujas' ]],
            },
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
                isIn: [[ 'Unidades', 'Ristra', 'Decena', 'Docena', 'Miligramo', 'Gramo', 'Media libra', 'Libra', 'Kilogramo', 'Caja', 'Paca', 'Arroba', 'Bolsa', 'Bulto', 'Caneca', 'Frasco', 'Saco', 'Tonelada', 'Mililitro', 'Onza', 'Botella', 'Litro', 'Galon', 'Pimpina', 'Metro cubico', 'Milimetro', 'Centrimetro', 'Pulgada', 'Metro', 'Centimetro cuadrado', 'Metro cuadrado' ]],
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
        
        // Impuestos y rentenciones
        IVA: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[ 'No aplica', 0, 5, 19 ]],
            },
            defaultValue: 0,
        },
        ivaAiu: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'No aplica', 0, 1 ]],
            },
            defaultValue: 'No aplica',
        },
        consumptionTax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [[ 'No aplica', 4, 8, 16 ]],
            },
            defaultValue: 'No aplica',
        },
        retentionType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 'Honorarios y consultoria', 'Servicios', 'Compras', 'Otros', 'Pagos al exterior y dividendos' ]],
            },
        },
        withholdingTax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 0.1, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6, 7, 8, 10, 11, 15, 20, 33, 35 ]],
            },
            defaultValue: 'No aplica',
        },
        withholdingIVA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 15, 100 ]],
            },
            defaultValue: 'No aplica',
        },
        withholdingICA: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [[ 'No aplica', 2, 3.4, 4.14, 5, 6.9, 8, 9.66, 11.04, 13.8 ]],
            },
            defaultValue: 'No aplica',
        },
        sugarDrinksTax: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ultraprocessedGroceriesTax: {
            type: DataTypes.INTEGER,
            allowNull: true,
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