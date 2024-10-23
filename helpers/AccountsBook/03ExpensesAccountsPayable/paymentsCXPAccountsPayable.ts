import AccountsPayable from '../../../schema/UserPanel/accountsPayable.schema';
import { IAccountsBook } from "../../../types/UserPanel/04Accounts/accountsBook.types";

// SE HACE EL PAGO A LA CXP EN LA TABLA ACCOUNTSPAYABLE PARA USER
export const paymentsCXPAccountsPayable = async (body: IAccountsBook, userId: string): Promise<any> => {
    if (body.creditDescription) {
        //Busca la CXP
        const accountPayableFound = await AccountsPayable.findOne({ where: { creditDescription: body.creditDescription, transactionCounterpartId: body.transactionCounterpartId, userId: userId, stateAccount: 'Activo' } });
        //Si encuentra la CXP, debo de aplicar el pago
        if (accountPayableFound) {
            //Primero intentamos aplicar el pago total, sino, aplicamos un abono
            if (body.totalValue >=  accountPayableFound.currentBalance) {
                accountPayableFound.cancellationDate = body.transactionDate;
                accountPayableFound.currentBalance = 0;
                accountPayableFound.stateAccount = 'Pagado';
                accountPayableFound.pendingNumberOfPayments = 0;
                await accountPayableFound.save();
            } else if (body.totalValue <= accountPayableFound.currentBalance) {
                try {                            
                    accountPayableFound.currentBalance -= body.totalValue;                                                                      // Actualizar balance actual
                    accountPayableFound.pendingNumberOfPayments -= 1;                                                                           // Actualizar número de cuotas pendientes
                    accountPayableFound.paymentValue = accountPayableFound.currentBalance / accountPayableFound.pendingNumberOfPayments;        // Actualizar el valor de la cuota
                    // Verificar si body.seller es undefined antes de concatenarlo
                    const sellerToAdd = body.seller !== undefined ? body.seller : '';
                    accountPayableFound.creditPayments = accountPayableFound.creditPayments.concat({                                            // Actualizar creditPayments usando concat para crear un nuevo array
                        date: body.transactionDate,                 //Fecha del pago
                        value: body.totalValue,                     //Valor del pago
                        branchId: body.branchId,                    //Sede dónde se hizo el pago
                        seller: sellerToAdd,                        //Funcionario encargado de hacer el registro
                    });
                    await accountPayableFound.save();
                } catch (error) {
                    throw error;
                };
            };
        };
    };
};