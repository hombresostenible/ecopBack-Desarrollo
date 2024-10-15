const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');  // Usa ReadlineParser
const axios = require('axios');

const SERIAL_PORT = process.env.SERIAL_PORT;
const BAUD_RATE = parseInt(process.env.BAUD_RATE || '9600', 10);
const API_ENDPOINT = process.env.SERVER_URL;


if (!SERIAL_PORT) {
    console.error('El puerto serial no está definido. Asegúrate de que SERIAL_PORT esté en el archivo .env');
    process.exit(1); 
}

const port = new SerialPort({
    path: SERIAL_PORT,
    baudRate: BAUD_RATE,
    autoOpen: false,
});

// Configura el parser correctamente
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Escuchar por datos entrantes
parser.on('data', (data: string) => {
    axios.post(`${API_ENDPOINT}/api/device/usb`, { data }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
});

port.open((err: Error) => {
    if (err) {
        return console.error('Error al abrir el puerto serial:', err.message);
    }
    console.log(`Puerto serial ${SERIAL_PORT} abierto a ${BAUD_RATE} baudios.`);
});

export default port;
