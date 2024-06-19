import AccountsReceivable from '../../../schema/User/accountsReceivable.schema';
import { IAccountsBook } from "../../../types/User/accountsBook.types";

// SE HACE EL PAGO A LA CXC EN LA TABLA ACCOUNTSRECEIVABLE PARA USER
export const paymentsAccountsReceivable = async (body: IAccountsBook, userId: string): Promise<any> => {
    if (body.creditDescription) {
        //Busca la CXC
        const accountReceivableFound = await AccountsReceivable.findOne({ where: { creditDescription: body.creditDescription, transactionCounterpartId: body.transactionCounterpartId, userId: userId, stateAccount: 'Activo' } });
        //Si encuentra la CXC, debo de aplicar el pago
        if (accountReceivableFound) {
            //Primero intentamos aplicar el pago total, sino, aplicamos un abono
            if (body.totalValue >=  accountReceivableFound.currentBalance) {
                accountReceivableFound.cancellationDate = body.transactionDate;
                accountReceivableFound.currentBalance = 0;
                accountReceivableFound.stateAccount = 'Pagado';
                accountReceivableFound.pendingNumberOfPayments = 0;
                await accountReceivableFound.save();
            } else if (body.totalValue <= accountReceivableFound.currentBalance) {
                try {                            
                    accountReceivableFound.currentBalance -= body.totalValue;                                                                           // Actualizar balance actual
                    accountReceivableFound.pendingNumberOfPayments -= 1;                                                                                // Actualizar número de cuotas pendientes
                    accountReceivableFound.paymentValue = accountReceivableFound.currentBalance / accountReceivableFound.pendingNumberOfPayments;       // Actualizar el valor de la cuota
                    // Verificar si body.seller es undefined antes de concatenarlo
                    const sellerToAdd = body.seller !== undefined ? body.seller : '';
                    accountReceivableFound.creditPayments = accountReceivableFound.creditPayments.concat({                                              // Agregamos la trazabilidad de cada uno de los pagos
                        date: body.transactionDate,                 //Fecha del pago
                        value: body.totalValue,                     //Valor del pago
                        branchId: body.branchId,                    //Sede dónde se hizo el pago
                        seller: sellerToAdd,                        //Funcionario encargado de hacer el registro
                    });
                    await accountReceivableFound.save();
                } catch (error) {
                    throw error;
                };
            };
        };
    };
};