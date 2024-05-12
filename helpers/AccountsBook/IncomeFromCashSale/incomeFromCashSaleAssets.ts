import Assets from "../../../schema/User/assets.schema";
import { IAccountsBook } from "../../../types/User/accountsBook.types";
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleAssets = async (body: IAccountsBook): Promise<any> => {
    const assetFound = await Assets.findOne({
        where: { id: body.itemId, nameItem: body.nameItem, branchId: body.branchId },
    });
    if (!assetFound) throw new ServiceError(400, "El activo no existe en esta sede");
    if (assetFound) {
        if (body.transactionType === 'Ingreso') {
            try {
                if (body.quantity !== undefined) {
                    assetFound.inventory -= body.quantity;
                    const currentDate = new Date();
                    const quantity = -body.quantity;
                    assetFound.setDataValue('inventoryOff', assetFound.inventoryOff.concat({ date: currentDate, quantity: quantity, reason: 'Vendido' }));
                    await assetFound.save();
                } else throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario de los activos");
            } catch (error) {
                throw error;
            };
        } else if (body.transactionType === 'Gasto') {
            try {
                if (body.quantity !== undefined) {
                    assetFound.inventory  += body.quantity;
                    await assetFound.save();
                } else throw new ServiceError(400, "La cantidad no está definida para el ingreso en el inventario de los activos");                      
            } catch (error) {
                throw error;
            };
        };
    };
};