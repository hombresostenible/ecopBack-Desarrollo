import { QueryTypes } from 'sequelize';
import sequelize from '../../db';
import Assets from '../../schema/User/assets.schema';
import Merchandise from '../../schema/User/merchandise.schema';
import Product from '../../schema/User/product.schema';
import RawMaterial from '../../schema/User/rawMaterial.schema';
import Service from '../../schema/User/service.schema';

//BUSCA TODOS LOS ARTICULOS DEL USUARIO EN TODAS LAS TABLAS
export const getAllItemsData = async (userId: string): Promise<any> => {
    console.log('userId: ', userId)
    try {
        console.log('userId: ', userId)
        const assets = await Assets.findAll({
            where: { userId: userId },
        });
        
        const merchandises = await Merchandise.findAll({
            where: { userId: userId },
        });
        
        const products = await Product.findAll({
            where: { userId: userId },
        });
        const rawMaterials = await RawMaterial.findAll({
            where: { userId: userId },
        });
        const services = await Service.findAll({
            where: { userId: userId },
        });
        console.log('assets: ', assets)
        console.log('merchandises: ', merchandises)
        console.log('products: ', products)
        console.log('rawMaterials: ', rawMaterials)
        console.log('services: ', services)

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
