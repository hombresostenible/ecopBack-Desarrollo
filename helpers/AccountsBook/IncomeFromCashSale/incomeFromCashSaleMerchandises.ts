import Merchandise from "../../../schema/User/merchandise.schema";
import { IAccountsBook } from "../../../types/User/accountsBook.types";
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleMerchandises = async (body: IAccountsBook): Promise<any> => {
    const merchandiseFound = await Merchandise.findOne({
        where: { id: body.itemId, nameItem: body.nameItem, branchId: body.branchId },
    });
    if (!merchandiseFound) throw new ServiceError(400, "La mercancía no existe en esta sede");
    if (merchandiseFound) {
        if (body.transactionType === 'Ingreso') {
            try {
                if (body.quantity !== undefined) {
                    // Si se obtiene un 'Ingreso', la mercancía debió salir, así que restar la cantidad del inventario
                    merchandiseFound.inventory -= body.quantity;
                    merchandiseFound.salesCount += body.quantity;

                    // Obtener la fecha actual
                    const currentDate = new Date().toISOString();
                    const quantity = -body.quantity;

                    // Agregar el objeto al array para la trazabilidad del inventario
                    merchandiseFound.setDataValue('inventoryChanges', merchandiseFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Salida' }));
                    await merchandiseFound.save();
                } else throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario de la mercancía");
            } catch (error) {
                throw error;
            };
        } else if (body.transactionType === 'Gasto') {
            try {
                if (body.quantity !== undefined) {
                    // Si se obtiene un 'Gasto', la mercancía debió salir, así que restar la cantidad del inventario
                    merchandiseFound.inventory  += body.quantity;

                    // Obtener la fecha actual
                    const currentDate = new Date().toISOString();
                    const quantity = body.quantity;
                
                    // Agregar el objeto al array para la trazabilidad del inventario
                    merchandiseFound.setDataValue('inventoryChanges', merchandiseFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Ingreso' }));
                    await merchandiseFound.save();
                } else throw new ServiceError(400, "La cantidad no está definida para el ingreso en el inventario de la mercancía");                      
            } catch (error) {
                throw error;
            };
        };
    };
};