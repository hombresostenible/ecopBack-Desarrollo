import dotenv from 'dotenv';
import Server from './app';
dotenv.config();

const server = new Server();

server.listen();


// import app from "./app";
// import dotenv from 'dotenv';
// import db from "./db";
// import { routerApi } from './controllers/routes'; // Importa routerApi desde routes.js
// dotenv.config();

// const PORT = process.env.PORT || '8000';
// console.log('Segundo')
// console.log('BBBBBB')
// const dbConnection = async () => {
//     try {
//         await db.authenticate();
//         console.log('Base de datos conectada');
//         await db.sync();
//         // await db.sync({ force: true }); // En producción, puedes usar `await db.sync();` en lugar de `{ force: true }`,Esto elimina y recrea las tablas en cada reinicio
//         console.log('Modelos sincronizados con la base de datos');
//     } catch (error) {
//         console.error('Error al conectar la base de datos:', error);
//         throw new Error('No se pudo conectar a la base de datos');
//     }
// };

// const startServer = () => {
//     app.listen(PORT, () => {
//         console.log('SERVER ON PORT ' + PORT);
//     }).on('error', (error: NodeJS.ErrnoException) => {
//         console.error('Error al iniciar el servidor:', error);
//         process.exit(1);
//     });
// };

// dbConnection()
//   .then(() => {
//     // Llama a routerApi y pasa app como argumento
//     routerApi(app);
//     startServer();
//   })
//   .catch((error) => {
//     console.error('Error al conectar la base de datos:', error);
//     process.exit(1);
//   });

