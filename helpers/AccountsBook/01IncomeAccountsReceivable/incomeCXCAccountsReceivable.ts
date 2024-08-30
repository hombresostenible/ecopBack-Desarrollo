import AccountsReceivable from '../../../schema/User/accountsReceivable.schema';
import { IAccountsBook } from '../../../types/User/accountsBook.types';
import { IAccountsReceivable } from "../../../types/User/accountsReceivable.types";
import { ServiceError } from '../../../types/Responses/responses.types';

// SE CREA LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
export const incomeCXCAccountsReceivable = async (body: IAccountsBook, newTransactionId: string, userId: string): Promise<any> => {
    if (body.creditDescription) {
        //Buscamos la CXC
        const accountReceivableFound = await AccountsReceivable.findOne({ where: { creditDescription: body.creditDescription, transactionCounterpartId: body.transactionCounterpartId, userId: userId, stateAccount: 'Activo' } });
        if (accountReceivableFound) throw new ServiceError(400, `Ya hay una Cuenta por Cobrar con este mismo nombre, cambia el nombre`);
        //Si no se ecuentra la CXC, se crea en ACCOUNTSRECEIVABLE
        if (!accountReceivableFound) {
            const accountReceivable: IAccountsReceivable = {
                id: '',
                branchId: body.branchId,
                transactionDate: body.transactionDate,
                transactionCounterpartId: body.transactionCounterpartId,
                stateAccount: 'Activo',
                creditDescription: body.creditDescription,
                creditWithInterest: body.creditWithInterest,
                creditInterestRate: body.creditInterestRate,
                initialValue: body.totalValue,
                initialNumberOfPayments: body.numberOfPayments,
                paymentValue: body.paymentValue,
                pendingNumberOfPayments: body.numberOfPayments,                        
                currentBalance: body.totalValue,
                seller: body.seller,
                accountsBookId: newTransactionId,
                userId: userId,
            };
    
            // Asignar seller solo si no es undefined
            if (body.seller !== undefined) accountReceivable.seller = body.seller;

            //Relaciones con los modelos de Assets, Merchandise, Product, RawMaterial y Service
            // if (body.type === 'Assets') accountReceivable.assetId = body.itemId;
            // if (body.type === 'Merchandise') accountReceivable.merchandiseId = body.itemId;
            // if (body.type === 'Product') accountReceivable.productId = body.itemId;
            // if (body.type === 'RawMaterial') accountReceivable.rawMaterialId = body.itemId;
            // if (body.type === 'Service') accountReceivable.serviceId = body.itemId;
    
            const newAccountReceivableTransaction = new AccountsReceivable();
            Object.assign(newAccountReceivableTransaction, accountReceivable);
            await newAccountReceivableTransaction.save();
        };
    };
};