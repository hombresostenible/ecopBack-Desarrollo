import RawMaterial from "../../../schema/User/rawMaterial.schema";
import { IAccountsBook } from "../../../types/User/accountsBook.types";
import { ServiceError } from '../../../types/Responses/responses.types';

export const incomeFromCashSaleRawMaterials = async (body: IAccountsBook): Promise<any> => {
    const rawMaterialFound = await RawMaterial.findOne({
        where: { id: body.itemId, nameItem: body.nameItem, branchId: body.branchId },
    });
    if (!rawMaterialFound) throw new ServiceError(400, "La materia prima no existe en esta sede");
    if (rawMaterialFound) {
        if (body.transactionType === 'Ingreso') {
            try {
                if (body.quantity !== undefined) {
                    rawMaterialFound.inventory -= body.quantity;
                    rawMaterialFound.salesCount += body.quantity;

                    const currentDate = new Date().toISOString();
                    const quantity = -body.quantity;

                    rawMaterialFound.setDataValue('inventoryChanges', rawMaterialFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Salida' }));
                    await rawMaterialFound.save();
                } else throw new ServiceError(400, "La cantidad no está definida para el descuento en el inventario de la materia prima");                    
            } catch (error) {
                throw error;
            };
        } else if (body.transactionType === 'Gasto') {
            try {
                if (body.quantity !== undefined) {
                    rawMaterialFound.inventory  += body.quantity;
                    
                    const currentDate = new Date().toISOString();
                    const quantity = body.quantity
            
                    rawMaterialFound.setDataValue('inventoryChanges', rawMaterialFound.inventoryChanges.concat({ date: currentDate, quantity: quantity, type: 'Ingreso' }));
                    await rawMaterialFound.save();
                } else throw new ServiceError(400, "La cantidad no está definida para el ingreso en el inventario de la materia prima");                     
            } catch (error) {
                throw error;
            };
        };
    };
};