import { QueryTypes } from 'sequelize';
import sequelize from '../../db';

//BUSCA TODOS LOS ARTICULOS DEL USUARIO EN TODAS LAS TABLAS
export const getAllItemsData = async (userId: string): Promise<any> => {
    try {
        const itemFound = await sequelize.query(`
            SELECT 
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Assets' as type, 
                userId
            FROM assets
            WHERE userId = :userId

            UNION ALL

            SELECT 
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Merchandise' as type, 
                userId
            FROM merchandises
            WHERE userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Product' as type, 
                userId
            FROM products
            WHERE userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'RawMaterial' as type, 
                userId
            FROM rawMaterials
            WHERE userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, NULL as inventory, IVA, sellingPrice,
                'Service' as type, 
                userId
            FROM services
            WHERE userId = :userId
        `, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });
        return itemFound;
    } catch (error) {
        throw error;
    }
};



//BUSCAR UN ITEM DE ASSETS, MERCHANDISE, PRODUCT O RAWMATERIAL POR CODIGO DE BARRAS
export const getItemBarCodeData = async (userId: string, barCode: string): Promise<any> => {
    try {
        const itemFound = await sequelize.query(`
            SELECT 
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Assets' as type, 
                userId
            FROM assets
            WHERE barCode = :barCode AND userId = :userId

            UNION ALL

            SELECT 
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Merchandise' as type, 
                userId
            FROM merchandises
            WHERE barCode = :barCode AND userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Product' as type, 
                userId
            FROM products
            WHERE barCode = :barCode AND userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'RawMaterial' as type, 
                userId
            FROM rawMaterials
            WHERE barCode = :barCode AND userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, NULL as inventory, IVA, sellingPrice,
                'Service' as type, 
                userId
            FROM services
            WHERE barCode = :barCode AND userId = :userId
        `, {
            replacements: { barCode, userId },
            type: QueryTypes.SELECT
        });
        return itemFound;
    } catch (error) {
        throw error;
    };
};



//BUSCAR UN ITEM DE ASSETS, MERCHANDISE, PRODUCT O RAWMATERIAL POR NOMBRE
export const getNameItemData = async (nameItem: string, userId: string): Promise<any> => {
    try {
        const itemFound = await sequelize.query(`
            SELECT 
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Assets' as type, 
                userId
            FROM assets
            WHERE nameItem LIKE :nameItem AND userId = :userId

            UNION ALL

            SELECT 
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Merchandise' as type, 
                userId
            FROM merchandises
            WHERE nameItem LIKE :nameItem AND userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'Product' as type, 
                userId
            FROM products
            WHERE nameItem LIKE :nameItem AND userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, inventory, IVA, sellingPrice,
                'RawMaterial' as type, 
                userId
            FROM rawMaterials
            WHERE nameItem LIKE :nameItem AND userId = :userId

            UNION ALL

            SELECT
                id, branchId, barCode, nameItem, NULL as inventory, IVA, sellingPrice,
                'Service' as type, 
                userId
            FROM services
            WHERE nameItem LIKE :nameItem AND userId = :userId
        `, {
            replacements: { nameItem: `%${nameItem}%`, userId },
            type: QueryTypes.SELECT
        });
        return itemFound;
    } catch (error) {
        throw error;
    };
};
