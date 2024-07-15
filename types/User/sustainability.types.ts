export interface ISustainability {
    id: string;
    registrationDate: Date;
    transactionDate: Date;
    otherExpenses?: 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos';
    periodicityPayService?: 'Mensual' | 'Bimestral';
    periodPayService?: 'Enero de 2024' | 'Febrero de 2024' | 'Marzo de 2024' | 'Abril de 2024' | 'Mayo de 2024' | 'Junio de 2024' | 'Julio de 2024' | 'Agosto de 2024' | 'Septiembre de 2024' | 'Octubre de 2024' | 'Noviembre de 2024' | 'Diciembre de 2024' | 'Julio - Agosto de 2024' | 'Marzo - Abril de 2024' | 'Mayo - Junio de 2024' | 'Julio - Agosto de 2024' | 'Septiembre - Octubre de 2024' | 'Noviembre - Diciembre de 2024';
    energyConsumption?: number;
    waterConsumption?: number;
    totalValue: number;
    waterReuse?: number;
    rainWaterQuantity?: number;
    sustainabilityStrategy?: string;
    sustainabilityProgramsNumber?: string;
    sustainabilityProgramName?: string;
    sustainabilityProgramStartingDate?: string;
    sustainabilityTopics?: string;
    numberSustainabilityReports?: number;
    numberManagersInvolvedInSustainability?: number;
    managerName?: string;
    managerRole?: string;
    numberEmployeesInvolvedInSustainability?: number;
    numberSustainabilityTrainings?: number;
    
    //RELACION CON OTRAS TABLAS
    accountsBookId?: string;
    branchId: string;
    userId?: string;
}