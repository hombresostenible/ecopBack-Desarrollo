import { QueryTypes } from 'sequelize';
import sequelize from '../../db';

//BUSCA TODOS LOS ARTICULOS DEL USUARIO EN TODAS LAS TABLAS
export const getAllItemsData = async (userId: string): Promise<any> => {
    try {
        const assets = await sequelize.query('SELECT *, "Assets" as type FROM assets WHERE userId = :userId', {
            replacements: { userId },
            type: QueryTypes.SELECT,
        });

        const merchandises = await sequelize.query('SELECT *, "Merchandise" as type FROM merchandises WHERE userId = :userId', {
            replacements: { userId },
            type: QueryTypes.SELECT,
        });

        const products = await sequelize.query('SELECT *, "Product" as type FROM products WHERE userId = :userId', {
            replacements: { userId },
            type: QueryTypes.SELECT,
        });

        const rawMaterials = await sequelize.query('SELECT *, "RawMaterial" as type FROM rawMaterials WHERE userId = :userId', {
            replacements: { userId },
            type: QueryTypes.SELECT,
        });

        const services = await sequelize.query('SELECT *, "Service" as type FROM services WHERE userId = :userId', {
            replacements: { userId },
            type: QueryTypes.SELECT,
        });

        const allItems = [
            ...assets,
            ...merchandises,
            ...products,
            ...rawMaterials,
            ...services,
        ];
        console.log('allItems: ', allItems)
        return allItems;
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
