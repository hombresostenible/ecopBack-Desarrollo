import Product from "../../../schema/User/product.schema";
import RawMaterial from "../../../schema/User/rawMaterial.schema";
import Service from "../../../schema/User/service.schema";
import { IItemsAccountsBook } from '../../../types/User/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleServices = async (item: IItemsAccountsBook, branchId: string, transactionType: string): Promise<any> => {
    const serviceFound = await Service.findOne({
        where: { userId: item.id, branchId: branchId },
    });
    if (!serviceFound) throw new ServiceError(400, "El servicio no existe en esta sede");

    if (transactionType === 'Ingreso') {
        if (item.quantity !== undefined) {
            try {
                serviceFound.salesCount += item.quantity;
                await serviceFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el servicio");
        }
    }

    //DESCUENTO DEL PRODUCTO DEL INVENTARIO POR LA VENTA DEL SERVICIO
    if (serviceFound.serviceProducts && serviceFound.serviceProducts.length > 0) {
        await Promise.all(serviceFound.serviceProducts.map(async (product) => {
            const { productId, quantity } = product;
            const productRecord = await Product.findOne({
                where: { userId: productId },
            });
            // Validación de inventario suficiente de Producto
            if (productRecord) {
                if (productRecord?.inventory < item.quantity) {
                    throw new ServiceError(400, `El inventario es insuficiente para la venta. Inventario actual: ${productRecord.inventory}, Cantidad solicitada: ${item.quantity}`);
                }
            }
            if (productRecord) {
                const quantityAsNumber = parseInt(quantity, 10);
                if (!isNaN(quantityAsNumber)) {
                    productRecord.inventory -= quantityAsNumber;
                    await productRecord.save();
                } else {
                    throw new ServiceError(400, `La cantidad "${quantity}" no es un número válido para el producto con ID ${productId}`);
                }
            } else {
                throw new ServiceError(400, `El producto con ID ${productId} no fue encontrado`);
            }
        }));
    }

    //DESCUENTO DE LA MATERIA PRIMA DEL INVENTARIO POR LA VENTA DEL SERVICIO
    if (serviceFound.serviceRawMaterials && serviceFound.serviceRawMaterials.length > 0) {
        await Promise.all(serviceFound.serviceRawMaterials.map(async (rawMaterial) => {
            const { rawMaterialId, quantity } = rawMaterial;
            const rawMaterialRecord = await RawMaterial.findOne({
                where: { userId: rawMaterialId },
            });
            // Validación de inventario suficiente de Producto
            if (rawMaterialRecord) {
                if (rawMaterialRecord?.inventory < item.quantity) {
                    throw new ServiceError(400, `El inventario es insuficiente para la venta. Inventario actual: ${rawMaterialRecord.inventory}, Cantidad solicitada: ${item.quantity}`);
                }
            }
            if (rawMaterialRecord) {
                const quantityAsNumber = parseInt(quantity, 10);
                if (!isNaN(quantityAsNumber)) {
                    rawMaterialRecord.inventory -= quantityAsNumber;
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