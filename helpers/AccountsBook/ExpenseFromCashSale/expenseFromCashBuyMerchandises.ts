import Merchandise from "../../../schema/UserPanel/merchandise.schema";
import { IItemsAccountsBook } from '../../../types/UserPanel/04Accounts/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const expenseFromCashBuyMerchandises = async (item: IItemsAccountsBook, branchId: string, transactionType: string): Promise<any> => {
    const merchandiseFound = await Merchandise.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!merchandiseFound) throw new ServiceError(400, "La mercancía no existe en esta sede");
    if (transactionType === 'Gasto') {
        if (item.quantity !== undefined) {
            try {
                merchandiseFound.inventory += item.quantity;
                // ACTUAIZAR LA REFERENCIA DEL INVENTARIO PARA NOTIFICACIONES
                /*
                    lastInventoryUpload?: {     // VALOR DEL INVENTARIO DEREFERENCIA PARA ENVIAR LA NOTIFICACION
                        inventory: number;
                        date?: Date;
                    }[];
                */
                const currentDate = new Date().toISOString();
                const quantity = item.quantity;
                merchandiseFound.setDataValue('inventoryChanges', merchandiseFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Ingreso' }));
                await merchandiseFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el ingreso en el inventario de la mercancía");
        }
    }
};