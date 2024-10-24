import AccountsReceivable from '../../schema/UserPanel/accountsReceivable.schema';

// Función para generar el número consecutivo basado en la fecha
export const generateCreditNumber = async (date: string | Date): Promise<string> => {
    const transactionDate = typeof date === 'string' ? new Date(date) : date;
    const formattedDate = transactionDate.toISOString().slice(0, 10).replace(/-/g, ''); // AAAAMMDD

    // Contamos cuántas cuentas por cobrar ya se crearon en esta fecha
    const accountsCreatedToday = await AccountsReceivable.count({
        where: { transactionDate: transactionDate }
    });

    // Incrementamos el contador para generar el número consecutivo
    const consecutiveNumber = (accountsCreatedToday + 1).toString().padStart(4, '0'); // XXXX (rellena con ceros si es necesario)
    return `${formattedDate}-${consecutiveNumber}`;
};