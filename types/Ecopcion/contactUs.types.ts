export interface IContactUs {
    id: string;
    email: string;
    nameUser: string;
    phone: string;
    helpDescription: string;
    selectedTopic: 'Indicadores' | 'Inventario' | 'Facturacion electronica' | 'Otro';
    acceptPersonalDataPolicy: boolean;
}