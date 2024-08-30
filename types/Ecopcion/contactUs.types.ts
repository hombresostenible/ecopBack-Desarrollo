export interface IContactUs {
    id: string;
    email: string;
    nameUser: string;
    phone: string;
    selectedTopic: 'Indicadores' | 'Inventario' | 'Facturacion electronica' | 'Otro';
    helpDescription: string;
    isAceptedConditions: boolean;
}