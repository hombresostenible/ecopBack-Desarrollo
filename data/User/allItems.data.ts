import { QueryTypes } from 'sequelize';
import sequelize from '../../db';
import Assets from '../../schema/User/assets.schema';
import Merchandise from '../../schema/User/merchandise.schema';
import Product from '../../schema/User/product.schema';
import RawMaterial from '../../schema/User/rawMaterial.schema';
import Service from '../../schema/User/service.schema';

//BUSCA TODOS LOS ARTICULOS DEL USUARIO EN TODAS LAS TABLAS
export const getAllItemsByBranchData = async (idBranch: string, userId: string): Promise<any> => {
    try {
        const assets = await Assets.findAll({
            where: { branchId: idBranch, userId: userId },
        });
        
        const merchandises = await Merchandise.findAll({
            where: { branchId: idBranch, userId: userId },
        });
        
        const products = await Product.findAll({
            where: { branchId: idBranch, userId: userId },
        });

        const rawMaterials = await RawMaterial.findAll({
            where: { branchId: idBranch, userId: userId },
        });
        
        const services = await Service.findAll({
            where: { branchId: idBranch, userId: userId },
        });

        const allItems = [
            ...assets,
            ...merchandises,
            ...products,
            ...rawMaterials,
            ...services,
        ];

        // Ordenar los elementos por nameItem en orden ascendente
        allItems.sort((a, b) => {
            const nameA = a.nameItem.toUpperCase(); // Ignorar mayúsculas/minúsculas
            const nameB = b.nameItem.toUpperCase(); // Ignorar mayúsculas/minúsculas
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
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

            LIMIT 1
        `, {
            replacements: { barCode, userId },
            type: QueryTypes.SELECT
        });
        return itemFound[0] || null; // Devolver el primer registro encontrado o null si no se encuentra nada
    } catch (error) {
        throw error;
    }
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
