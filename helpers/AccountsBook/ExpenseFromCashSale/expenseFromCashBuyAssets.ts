import Assets from "../../../schema/UserPanel/assets.schema";
import { IItemsAccountsBook } from '../../../types/UserPanel/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const expenseFromCashBuyAssets = async (item: IItemsAccountsBook, branchId: string, transactionType: string): Promise<any> => {
    const assetFound = await Assets.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!assetFound) throw new ServiceError(400, "El activo no existe en esta sede");
    if (transactionType === 'Gasto') {
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