import Assets from "../../../schema/User/assets.schema";
// import { IAccountsBook } from "../../../types/User/accountsBook.types";
import { IItemsSold } from '../../../types/User/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleAssets = async (item: IItemsSold, branchId: string, transactionType: string): Promise<any> => {
    const assetFound = await Assets.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!assetFound) throw new ServiceError(400, "El activo no existe en esta sede");
    
    if (transactionType === 'Ingreso') {
        if (item.quantity !== undefined) {
            try {
                assetFound.inventory -= item.quantity;
                const currentDate = new Date();
                const quantity = -item.quantity;
                assetFound.setDataValue('inventoryOff', assetFound.inventoryOff.concat({ date: currentDate, quantity: quantity, reason: 'Vendido' }));
                await assetFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario de los activos");
        }
    } else if (transactionType === 'Gasto') {
        if (item.quantity !== undefined) {
            try {
                assetFound.inventory += item.quantity;
                await assetFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el ingreso en el inventario de los activos");
        }
    }
};