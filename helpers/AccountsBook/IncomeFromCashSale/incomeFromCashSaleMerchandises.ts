import Merchandise from "../../../schema/User/merchandise.schema";
import { IItemsSold } from '../../../types/User/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleMerchandises = async (item: IItemsSold, branchId: string, transactionType: string): Promise<any> => {
    const merchandiseFound = await Merchandise.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!merchandiseFound) throw new ServiceError(400, "La mercancía no existe en esta sede");
    
    if (transactionType === 'Ingreso') {
        if (item.quantity !== undefined) {
            try {
                // Si se obtiene un 'Ingreso', la mercancía debió salir, así que restar la cantidad del inventario
                merchandiseFound.inventory -= item.quantity;
                merchandiseFound.salesCount += item.quantity;

                // Obtener la fecha actual
                const currentDate = new Date().toISOString();
                const quantity = -item.quantity;

                // Agregar el objeto al array para la trazabilidad del inventario
                merchandiseFound.setDataValue('inventoryChanges', merchandiseFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Salida' }));
                await merchandiseFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario de la mercancía");
        }
    } else if (transactionType === 'Gasto') {
        if (item.quantity !== undefined) {
            try {
                // Si se obtiene un 'Gasto', la mercancía debió salir, así que restar la cantidad del inventario
                merchandiseFound.inventory += item.quantity;

                // Obtener la fecha actual
                const currentDate = new Date().toISOString();
                const quantity = item.quantity;

                // Agregar el objeto al array para la trazabilidad del inventario
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