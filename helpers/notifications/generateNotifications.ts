import { NotificationType } from "../../schema/User/notifications/notification.schema";


// Interfaz que define la estructura de `notificationTitlesByType`
interface NotificationTitlesByType {
    'Tributarias y/o legales': string[];
    'Cuentas': string[];
    'Inventarios': string[];
    'Facturación y POS': string[];
    'Mercado': string[];
}

// Crear el objeto con la estructura tipada
const notificationTitlesByType: NotificationTitlesByType = {
    'Tributarias y/o legales': [
        'Notificación sobre tus impuestos.',
        'Actualización de obligaciones fiscales.',
        'Información importante sobre tus impuestos.',
        'Mantente al día con tus obligaciones fiscales.'
    ],
    'Cuentas': [
        'Revisión de cuentas y finanzas.',
        'Actualización sobre tu cuenta.',
        'Notificación sobre tus cuentas financieras.',
        'Información relevante sobre tus finanzas.'
    ],
    'Inventarios': [
        'Actualización de inventarios.',
        'Revisión de inventarios actualizada.',
        'Información sobre la gestión de tus inventarios.',
        'Mantén tu inventario actualizado.'
    ],
    'Facturación y POS': [
        'Notificación sobre facturación y POS.',
        'Actualización sobre tus procesos de facturación.',
        'Información sobre el sistema POS.',
        'Mantén al día tu sistema de facturación.'
    ],
    'Mercado': [
        'Notificación sobre el mercado.',
        'Actualización de datos del mercado.',
        'Información sobre tus oportunidades de mercado.',
        'Mantente informado sobre las condiciones del mercado.'
    ]
};


//----------------------- GENERACION DE NOTIFICACIONES ESTRATEGICAS------------------------

// 01: Notificar calendarios de presentación y pago de IVA BIMESTRAL 
interface NotificationData {
    title: string;
    message: string;
    actionCall: string;
    executionDate: Date;
    endDate: Date;
}

// Función para restar días a una fecha
const subtractDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
};

// Función para obtener la fecha de fin de año
const getEndOfYear = (): Date => {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, 11, 31); // Diciembre es el mes 11, día 31
};

// Función para seleccionar un título aleatorio
function getRandomTitle(notificationType: NotificationType): string {
    const titles = notificationTitlesByType[notificationType];
    return titles[Math.floor(Math.random() * titles.length)];
}

// 01 Función para generar la notificación en base al NIT del usuario
export const generateTaxBimestralNotification = (user: any, notificationType: NotificationType): NotificationData | null => {
    // Obtener el último dígito del NIT del usuario
    const lastDigitNIT = user.documentId.slice(-1);

    // Mapear el último dígito del NIT a las fechas correctas basadas en el dictado proporcionado
    const nitDayMapping: { [key: string]: { day: number; month: string; period: string }[] } = {
        "0": [
            { day: 22, month: "Marzo", period: "Enero-Febrero" },
            { day: 24, month: "Mayo", period: "Marzo-Abril" },
            { day: 23, month: "Julio", period: "Mayo-Junio" },
            { day: 23, month: "Septiembre", period: "Julio-Agosto" },
            { day: 26, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 24, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "1": [
            { day: 11, month: "Marzo", period: "Enero-Febrero" },
            { day: 10, month: "Mayo", period: "Marzo-Abril" },
            { day: 10, month: "Julio", period: "Mayo-Junio" },
            { day: 10, month: "Septiembre", period: "Julio-Agosto" },
            { day: 13, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 13, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "2": [
            { day: 12, month: "Marzo", period: "Enero-Febrero" },
            { day: 14, month: "Mayo", period: "Marzo-Abril" },
            { day: 11, month: "Julio", period: "Mayo-Junio" },
            { day: 11, month: "Septiembre", period: "Julio-Agosto" },
            { day: 14, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 14, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "3": [
            { day: 13, month: "Marzo", period: "Enero-Febrero" },
            { day: 15, month: "Mayo", period: "Marzo-Abril" },
            { day: 12, month: "Julio", period: "Mayo-Junio" },
            { day: 12, month: "Septiembre", period: "Julio-Agosto" },
            { day: 15, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 15, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "4": [
            { day: 14, month: "Marzo", period: "Enero-Febrero" },
            { day: 16, month: "Mayo", period: "Marzo-Abril" },
            { day: 15, month: "Julio", period: "Mayo-Junio" },
            { day: 13, month: "Septiembre", period: "Julio-Agosto" },
            { day: 18, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 16, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "5": [
            { day: 15, month: "Marzo", period: "Enero-Febrero" },
            { day: 17, month: "Mayo", period: "Marzo-Abril" },
            { day: 16, month: "Julio", period: "Mayo-Junio" },
            { day: 16, month: "Septiembre", period: "Julio-Agosto" },
            { day: 19, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 17, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "6": [
            { day: 18, month: "Marzo", period: "Enero-Febrero" },
            { day: 20, month: "Mayo", period: "Marzo-Abril" },
            { day: 17, month: "Julio", period: "Mayo-Junio" },
            { day: 17, month: "Septiembre", period: "Julio-Agosto" },
            { day: 20, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 20, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "7": [
            { day: 19, month: "Marzo", period: "Enero-Febrero" },
            { day: 21, month: "Mayo", period: "Marzo-Abril" },
            { day: 18, month: "Julio", period: "Mayo-Junio" },
            { day: 18, month: "Septiembre", period: "Julio-Agosto" },
            { day: 21, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 21, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "8": [
            { day: 20, month: "Marzo", period: "Enero-Febrero" },
            { day: 22, month: "Mayo", period: "Marzo-Abril" },
            { day: 19, month: "Julio", period: "Mayo-Junio" },
            { day: 19, month: "Septiembre", period: "Julio-Agosto" },
            { day: 22, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 22, month: "Enero", period: "Noviembre-Diciembre" }
        ],
        "9": [
            { day: 21, month: "Marzo", period: "Enero-Febrero" },
            { day: 23, month: "Mayo", period: "Marzo-Abril" },
            { day: 22, month: "Julio", period: "Mayo-Junio" },
            { day: 20, month: "Septiembre", period: "Julio-Agosto" },
            { day: 25, month: "Noviembre", period: "Septiembre-Octubre" },
            { day: 23, month: "Enero", period: "Noviembre-Diciembre" }
        ]
    };

    const taxInfo = nitDayMapping[lastDigitNIT];

    if (!taxInfo) {
        console.error(`No se encontró el mapeo del día para el NIT ${user.documentId}`);
        return null;
    }

    // Obtener la información del próximo vencimiento
    const nextTaxInfo = taxInfo.find((tax) => new Date(`${tax.month} ${tax.day}, ${new Date().getFullYear()}`) > new Date());

    if (!nextTaxInfo) {
        console.error(`No se encontró una fecha de vencimiento futura para el NIT ${user.documentId}`);
        return null;
    }

    // Calcular la fecha límite de pago
    const deadline = new Date(`${nextTaxInfo.month} ${nextTaxInfo.day}, ${new Date().getFullYear()}`);
    const notificationDate = subtractDays(deadline, 7); // Notificación 1 semana antes

    // Calcular endDate al final del año
    const endDate = new Date(new Date().getFullYear(), 11, 31); // 31 de diciembre del año actual

    // Mensaje personalizado basado en el NIT y la fecha límite
    const message = `En ecopcion te ayudamos a estar al día. 
        SI tu producto, servicio o mercancía tiene IVA, dado que el último número de tu NIT es ${lastDigitNIT}, 
        el día ${nextTaxInfo.day} de "${nextTaxInfo.month}" es el último día de plazo para la declaración y pago del IVA BIMESTRAL 
        del periodo "${nextTaxInfo.period}". No olvides pagar a tiempo.`;

    const actionCall = "¿Tienes alguna duda? Agenda una asesoría.";

    const title = getRandomTitle(notificationType);

    // Retornar la estructura de la notificación
    return {
        title,
        message,
        actionCall,
        executionDate: notificationDate,
        endDate
    };
};
