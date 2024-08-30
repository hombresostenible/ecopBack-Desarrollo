import Merchandise from "../../../schema/User/merchandise.schema";
import { IItemsAccountsBook } from '../../../types/User/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleMerchandises = async (item: IItemsAccountsBook, branchId: string, transactionType: string): Promise<any> => {
    const merchandiseFound = await Merchandise.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!merchandiseFound) throw new ServiceError(400, "La mercancía no existe en esta sede");
    
    if (transactionType === 'Ingreso') {
        if (item.quantity !== undefined) {
            // Validación de inventario suficiente
            if (merchandiseFound.inventory < item.quantity) {
                throw new ServiceError(400, `El inventario es insuficiente para la venta. Inventario actual: ${merchandiseFound.inventory}, Cantidad solicitada: ${item.quantity}`);
            }
            try {
                merchandiseFound.inventory -= item.quantity;
                merchandiseFound.salesCount += item.quantity;
                const currentDate = new Date().toISOString();
                const quantity = -item.quantity;
                merchandiseFound.setDataValue('inventoryChanges', merchandiseFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Salida' }));
                await merchandiseFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario de la mercancía");
        }
    }
};