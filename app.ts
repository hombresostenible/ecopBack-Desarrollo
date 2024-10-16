import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import xml2js from 'xml2js';
import db from './db';
import { routerApi } from './controllers/routes';

class Server {
    private app: Application;
    private port: string;
    static listen: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    private async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
            await db.sync();
            // await db.sync({ force: true });
            console.log('Modelos sincronizados con la base de datos');
        } catch (error) {
            console.error('Error al conectar la base de datos:', error);
            throw new Error('No se pudo conectar a la base de datos');
        }
    };

    private routes() {
        routerApi(this.app);
    };

    private middlewares() {
        this.app.set('trust proxy', true);
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            next();
        });

        const allowedOrigins = [
            process.env.CORS_ALLOWED_ORIGIN,
            process.env.CORS_ALLOWED_ORIGIN2
        ];

        this.app.use(cors({
            origin: (origin, callback) => {
                console.log('Solicitud desde el origen:', origin);
                if (origin && allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(fileUpload());

        // Middleware para procesar solicitudes XML
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.is('application/xml')) {
                let data = '';
                req.setEncoding('utf8');
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    xml2js.parseString(data, { explicitArray: false }, (err: any, result: any) => {
                        if (err) {
                            return next(err);
                        }
                        req.body = result;
                        next();
                    });
                });
            } else {
                next();
            }
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('SERVER ON PORT ' + this.port);
        }).on('error', (error: NodeJS.ErrnoException) => {
            console.error('Error al iniciar el servidor:', error);
            process.exit(1);
        });
    };
}

export default Server;


// import express, { Application, Request, Response, NextFunction } from 'express';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import fileUpload from 'express-fileupload';
// import morgan from 'morgan';
// import xml2js from 'xml2js';
// import db from './db';
// import { routerApi } from './controllers/routes';

// class Server {
//     private app: Application;
//     private port: string;
//     static listen: any;

//     constructor() {
//         this.app = express();
//         this.port = process.env.PORT || '8000';

//         this.dbConnection();
//         this.middlewares();
//         this.routes();
//     }

//     private async dbConnection() {
//         try {
//             await db.authenticate();
//             console.log('Base de datos conectada');
//             await db.sync();
//             console.log('Modelos sincronizados con la base de datos');
//         } catch (error) {
//             console.error('Error al conectar la base de datos:', error);
//             throw new Error('No se pudo conectar a la base de datos');
//         }
//     }

//     private routes() {
//         routerApi(this.app);
//     }

//     private middlewares() {
//         this.app.set('trust proxy', true);
//         this.app.use((req: Request, res: Response, next: NextFunction) => {
//             req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//             next();
//         });

//         const allowedOrigins = [
//             process.env.CORS_ALLOWED_ORIGIN,
//             process.env.CORS_ALLOWED_ORIGIN2
//         ];

//         // Middleware para verificar las cookies antes de CORS
//         this.app.use((req: Request, res: Response, next: NextFunction) => {
//             console.log('Cookies recibidas:', req.headers.cookie);
//             next();
//         });

//         // Middleware para establecer la propiedad isSecure
//         this.app.use((req: Request, res: Response, next: NextFunction) => {
//             req.isSecure = req.headers['x-forwarded-proto'] === 'https' || req.protocol === 'https';
//             next();
//         });

//         this.app.use(cors({
//             origin: (origin, callback) => {
//                 if (origin && allowedOrigins.includes(origin)) {
//                     // Si el origen está en la lista permitida
//                     callback(null, true);
//                 } else {
//                     // Si el origen no está en la lista, bloquear la solicitud
//                     callback(new Error('Not allowed by CORS'));
//                 }
//             },
//             credentials: true, // Habilita el uso de cookies y headers de autenticación
//             allowedHeaders: ['Content-Type', 'Authorization'], // Define qué headers se permiten
//         }));

//         this.app.use(express.json());
//         this.app.use(morgan('dev'));
//         this.app.use(cookieParser());
//         this.app.use(bodyParser.json({ limit: "50mb" }));
//         this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//         this.app.use(fileUpload());

//         // Middleware para procesar solicitudes XML
//         this.app.use((req: Request, res: Response, next: NextFunction) => {
//             if (req.is('application/xml')) {
//                 let data = '';
//                 req.setEncoding('utf8');
//                 req.on('data', (chunk) => {
//                     data += chunk;
//                 });
//                 req.on('end', () => {
//                     xml2js.parseString(data, { explicitArray: false }, (err: any, result: any) => {
//                         if (err) {
//                             return next(err);
//                         }
//                         req.body = result;
//                         next();
//                     });
//                 });
//             } else {
//                 next();
//             }
//         });
//     }

//     public listen() {
//         this.app.listen(this.port, () => {
//             console.log('SERVER ON PORT ' + this.port);
//         }).on('error', (error: NodeJS.ErrnoException) => {
//             console.error('Error al iniciar el servidor:', error);
//             process.exit(1);
//         });
//     }
// }

// export default Server;
