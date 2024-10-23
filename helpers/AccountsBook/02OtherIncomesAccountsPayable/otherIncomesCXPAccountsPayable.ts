import AccountsPayable from '../../../schema/UserPanel/accountsPayable.schema';
import { IAccountsBook } from '../../../types/UserPanel/04Accounts/accountsBook.types';
import { IAccountsPayable } from "../../../types/UserPanel/accountsPayable.types";
import { ServiceError } from '../../../types/Responses/responses.types';

// SE CREA LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA USER
export const otherIncomesCXPAccountsPayable = async (body: IAccountsBook, newTransactionId: string, userId: string): Promise<any> => {
    if (body.creditDescription) {
        //Buscamos la CXP
        const accountReceivableFound = await AccountsPayable.findOne({ where: { creditDescription: body.creditDescription, transactionCounterpartId: body.transactionCounterpartId, userId: userId, stateAccount: 'Activo' } });
        if (accountReceivableFound) throw new ServiceError(400, `Ya hay una Cuenta por Pagar con este mismo nombre, cambia el nombre`);
        //Si no se ecuentra la CXP, se crea en AccountsPayable
        if (!accountReceivableFound) {
            const accountReceivable: IAccountsPayable = {
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
    
            const newAccountReceivableTransaction = new AccountsPayable();
            Object.assign(newAccountReceivableTransaction, accountReceivable);
            await newAccountReceivableTransaction.save();
        };
    };
};