import RawMaterial from "../../../schema/UserPanel/rawMaterial.schema";
import { IItemsAccountsBook } from '../../../types/UserPanel/04Accounts/accountsBook.types';
import { ServiceError } from '../../../types/Responses/responses.types';

export const expenseFromCashBuyRawMaterials = async (item: IItemsAccountsBook, branchId: string, transactionType: string): Promise<any> => {
    const rawMaterialFound = await RawMaterial.findOne({
        where: { id: item.id, nameItem: item.nameItem, branchId: branchId },
    });
    if (!rawMaterialFound) throw new ServiceError(400, "La materia prima no existe en esta sede");
    if (transactionType === 'Gasto') {
        if (item.quantity !== undefined) {
            try {
                rawMaterialFound.inventory += item.quantity;
                // ACTUAIZAR LA REFERENCIA DEL INVENTARIO PARA NOTIFICACIONES
                /*
                    lastInventoryUpload?: {     // VALOR DEL INVENTARIO DEREFERENCIA PARA ENVIAR LA NOTIFICACION
                        inventory: number;
                        date?: Date;
                    }[];
                */
                const currentDate = new Date().toISOString();
                const quantity = item.quantity;
                rawMaterialFound.setDataValue('inventoryChanges', rawMaterialFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Ingreso' }));
                await rawMaterialFound.save();
            } catch (error) {
                throw error;
            }
        } else {
            throw new ServiceError(400, "La cantidad no está definida para el ingreso en el inventario de la materia prima");
        }
    }
};