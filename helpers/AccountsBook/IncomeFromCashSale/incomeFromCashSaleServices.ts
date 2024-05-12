import Product from "../../../schema/User/product.schema";
import RawMaterial from "../../../schema/User/rawMaterial.schema";
import Service from "../../../schema/User/service.schema";
import { IAccountsBook } from "../../../types/User/accountsBook.types";
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleServices = async (body: IAccountsBook): Promise<any> => {
    const serviceFound = await Service.findOne({
        where: { id: body.itemId, branchId: body.branchId },
    });
    if (!serviceFound) throw new ServiceError(400, "El servicio no existe en esta sede");
    if (serviceFound) {
        if (body.transactionType === 'Ingreso') if (body.quantity !== undefined) serviceFound.salesCount += body.quantity;
        await serviceFound.save();
    };
    if (serviceFound.serviceProducts && serviceFound.serviceProducts.length > 0) {
        await Promise.all(serviceFound.serviceProducts.map(async (product) => {
          const { productlId, quantity } = product;
            const productRecord = await Product.findOne({
                where: { id: productlId },
            });
            if (productRecord) {
                const quantityAsNumber = parseInt(quantity, 10);
                if (!isNaN(quantityAsNumber)) {
                    productRecord.inventory  -= quantityAsNumber;
                    await productRecord.save();
                } else throw new ServiceError(400, `La cantidad "${quantity}" no es un número válido para la materia prima con ID ${productlId}`);
            } else throw new ServiceError(400, `La materia prima con ID ${productlId} no fue encontrada`);
        }));
    };
    if (serviceFound.serviceRawMaterials && serviceFound.serviceRawMaterials.length > 0) {
        await Promise.all(serviceFound.serviceRawMaterials.map(async (rawMaterial) => {
          const { rawMaterialId, quantity } = rawMaterial;
            const rawMaterialRecord = await RawMaterial.findOne({
                where: { id: rawMaterialId },
            });
            if (rawMaterialRecord) {
                const quantityAsNumber = parseInt(quantity, 10);
                if (!isNaN(quantityAsNumber)) {
                    rawMaterialRecord.inventory  -= quantityAsNumber;
                    await rawMaterialRecord.save();
                } else throw new ServiceError(400, `La cantidad "${quantity}" no es un número válido para la materia prima con ID ${rawMaterialId}`);
            } else throw new ServiceError(400, `La materia prima con ID ${rawMaterialId} no fue encontrada`);
        }));
    };
};