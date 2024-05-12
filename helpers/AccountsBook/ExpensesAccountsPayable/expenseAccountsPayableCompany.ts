import AccountsPayable from '../../../schema/User/accountsPayable.schema';
import { IAccountsBook } from "../../../types/User/accountsBook.types";
import { IAccountsPayable } from "../../../types/User/accountsPayable.types";
import { ServiceError } from '../../../types/Responses/responses.types';

// SE CREA LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA COMPANY
export const expenseAccountsPayableCompany = async (body: IAccountsBook, newTransactionId: string, userId: string): Promise<any> => {
    if (body.creditDescription) {
        //Buscamos la CXP
        const accountPayableFound = await AccountsPayable.findOne({ where: { creditDescription: body.creditDescription, transactionCounterpartId: body.transactionCounterpartId, userId: userId, stateAccount: 'Activo' } });
        if (accountPayableFound) throw new ServiceError(400, `Ya hay una Cuenta por Pagar con este mismo nombre, cámbia el nombre`);
        //Si no se ecuentra la CXP, se crea en ACCOUNTSPAYABLE
        if (!accountPayableFound) {
            const accountsPayable: IAccountsPayable = {
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
            };

            //Relaciones con los modelos de Assets, Merchandise, Product, RawMaterial y Service
            if (body.typeExpenses === 'Activo') accountsPayable.assetId = body.itemId;
            if (body.typeExpenses === 'Mercancía') accountsPayable.merchandiseId = body.itemId;
            if (body.typeExpenses === 'Materia Prima') accountsPayable.rawMaterialId = body.itemId;

            const newAccountPayableTransaction = new AccountsPayable();
            Object.assign(newAccountPayableTransaction, accountsPayable);
            await newAccountPayableTransaction.save();
        };
    };
};