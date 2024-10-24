import AccountsReceivable from '../../../schema/UserPanel/accountsReceivable.schema';
import { IAccountsBook } from '../../../types/UserPanel/04Accounts/accountsBook.types';
import { IAccountsReceivable } from "../../../types/UserPanel/accountsReceivable.types";
import { generateCreditNumber } from '../../../helpers/AccountsBook/generateCreditNumber';
import { ServiceError } from '../../../types/Responses/responses.types';

// SE CREA LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
export const incomeCXCAccountsReceivable = async (body: IAccountsBook, newAccountsBookId: string, userId: string): Promise<any> => {
    if (body.creditDescription) {
        //Buscamos la CXC
        const accountReceivableFound = await AccountsReceivable.findOne({ where: { creditDescription: body.creditDescription, transactionCounterpartId: body.transactionCounterpartId, userId: userId, stateAccount: 'Activo' } });
        if (accountReceivableFound) throw new ServiceError(400, `Ya hay una Cuenta por Cobrar con este mismo nombre, cambia el nombre`);
        //Si no se ecuentra la CXC, se crea en ACCOUNTSRECEIVABLE
        if (!accountReceivableFound) {
            const creditNumber = await generateCreditNumber(body.transactionDate);
            const accountReceivable: IAccountsReceivable = {
                id: '',
                branchId: body.branchId,
                transactionDate: body.transactionDate,
                transactionCounterpartId: body.transactionCounterpartId,
                stateAccount: 'Activo',
                creditDescription: body.creditDescription,
                creditWithInterest: body.creditWithInterest,
                creditInterestRate: body.creditInterestRate,
                numberAccountsReceivable: creditNumber,
                initialValue: body.totalValue,
                initialNumberOfPayments: body.numberOfPayments,
                paymentValue: body.paymentValue,
                pendingNumberOfPayments: body.numberOfPayments,                        
                currentBalance: body.totalValue,
                seller: body.seller,
                accountsBookId: newAccountsBookId,
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