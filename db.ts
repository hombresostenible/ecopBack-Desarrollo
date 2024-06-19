import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME || 'default_db_name';
const dbUser = process.env.DB_USER || 'default_user_db';
const dbPasword = process.env.DB_PASSWORD || 'default_DB_PASSWORD';

// Convertir process.env.DB_PORT a un número usando parseInt
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

const db = new Sequelize(dbName, dbUser, dbPasword, {
    host: process.env.DB_HOST || 'localhost',       // Cambia 'localhost' por el nombre del servicio del contenedor MySQL
    dialect: 'mysql',
    port: dbPort,
    pool: {
        max: 20,                                    // ajusta según sea necesario para tu entorno de desarrollo
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    // logging: false,
});

export default db;