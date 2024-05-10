export interface IContactUs {
    id: string;
    email: string;
    nameUser: string | undefined;
    phone: string;
    helpDescription: string;
    selectedTopic: 'Indicadores' | 'Inventario' | 'Facturación electrónica' | 'Otro';
    acceptPersonalDataPolicy: boolean;
}