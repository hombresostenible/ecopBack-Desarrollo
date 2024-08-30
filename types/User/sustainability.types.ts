export interface ISustainability {
    id: string;
    registrationDate: Date;
    transactionDate: Date;
    otherExpenses?: 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos';
    initialDate?: Date;
    finalDate?: Date;
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