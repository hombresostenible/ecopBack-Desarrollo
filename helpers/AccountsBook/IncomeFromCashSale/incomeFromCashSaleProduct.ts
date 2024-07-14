import Product from "../../../schema/User/product.schema";
import RawMaterial from "../../../schema/User/rawMaterial.schema";
import { IItemsAccountsBook } from '../../../types/User/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleProduct = async (item: IItemsAccountsBook, branchId: string, transactionType: string): Promise<any> => {
    const productFound = await Product.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!productFound) throw new ServiceError(400, "El producto no existe en esta sede");
    
    if (transactionType === 'Ingreso') {
        if (item.quantity !== undefined) {
            try {
                productFound.inventory -= item.quantity;
                productFound.salesCount += item.quantity;

                const currentDate = new Date().toISOString();
                const quantity = -item.quantity;

                productFound.setDataValue('inventoryChanges', productFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Salida' }));
                await productFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario del producto");
        }
    }

    // RELACION DE LA TABLA PRODUCTO CON RAWMATERIAL
    if (productFound.productRawMaterials && productFound.productRawMaterials.length > 0) {
        await Promise.all(productFound.productRawMaterials.map(async (rawMaterial) => {
            const { rawMaterialId, quantity } = rawMaterial;
            // Buscar la materia prima por ID
            const rawMaterialRecord = await RawMaterial.findOne({
                where: { id: rawMaterialId },
            });
            // Verificar si se encontró la materia prima
            if (rawMaterialRecord) {
                // Convertir quantity a número antes de restar
                const quantityAsNumber = parseInt(quantity, 10);
                // Verificar si la conversión fue exitosa
                if (!isNaN(quantityAsNumber)) {
                    // Restar la cantidad del inventario
                    rawMaterialRecord.inventory -= quantityAsNumber;
                    // Guardar los cambios en la base de datos
                    await rawMaterialRecord.save();
                } else {
                    throw new ServiceError(400, `La cantidad "${quantity}" no es un número válido para la materia prima con ID ${rawMaterialId}`);
                }
            } else {
                throw new ServiceError(400, `La materia prima con ID ${rawMaterialId} no fue encontrada`);
            }
        }));
    }
};