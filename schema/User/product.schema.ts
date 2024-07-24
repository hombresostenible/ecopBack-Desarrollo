import { DataTypes, Model } from 'sequelize';
import db from '../../db';
import { IInventoryOffItem, IWithholdingTax } from '../../types/User/products.types';
import Branch from './branch.schema';
import User from './user.schema';

class Product extends Model {
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
    public productionPrice!: number;
    public sellingPrice!: number;
    public isDiscounted!: 'Si' | 'No';
    public discountPercentage!: number;
    public expirationDate!: Date;
    public inventoryChanges!: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    public salesCount!: number;
    public inventoryOff!: IInventoryOffItem[];
    public reasonManualDiscountingInventory!: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';
    public quantityManualDiscountingInventory!: number;
    public productAccesory!: 'Si' | 'No';
    public productAccesories!: { accesory: string; productAccesoryPackageType?: string | null }[];
    public productAsset!: 'Si' | 'No';
    public productAssets!: { nameAssets: string; assetId?: string | null}[];    
    public productRawMaterials!: { nameItem: string; rawMaterialId?: string | null; quantity: string}[];
    // Retenciones
    public retentions!: IWithholdingTax[];
    // Impuestos
    public IVA!: 0 | 5 | 19;
    public consumptionTax!: 4 | 8 | 16;
    public ivaAiu!: 0 | 1;
    public taxesUltraProcessedSugarSweetenedBeverages!: number;
    public valueTaxesUltraProcessedSugarSweetenedBeverages!: 0 | 18 | 28 | 35 | 38 | 55 | 65;
    public taxesUltraProcessedFoodProducts!: 10 | 15 | 20;
    //RELACION CON OTRAS TABLAS
    public branchId!: string;
    public userId!: string;
};

Product.init(
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
            defaultValue: 0,
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
        productionPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sellingPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        inventoryChanges: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        inventoryOff: {
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
        productAccesory: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [['Si', 'No']],
            },
            defaultValue: 'No',
        },
        productAccesories: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        productAsset: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [['Si', 'No']],
            },
            defaultValue: 'No',
        },
        productAssets: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        productRawMaterials: {
            type: DataTypes.JSON,
            allowNull: true,
        },

        // Retenciones
        retentions: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
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
                isIn: [[4, 8, 16]],
            },
        },
        ivaAiu: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[0, 1]],
            },
        },
        taxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        valueTaxesUltraProcessedSugarSweetenedBeverages: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[0, 18, 28, 35, 38, 55, 65]],
            },
        },
        taxesUltraProcessedFoodProducts: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[10, 15, 20]],
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
        modelName: 'Product',
    }
);

Product.belongsTo(Branch, {
    foreignKey: 'branchId',
    as: 'branch',
});

Product.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Product;