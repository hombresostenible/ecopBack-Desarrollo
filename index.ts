import dotenv from 'dotenv';
import Server from './app';
dotenv.config();

const server = new Server();

server.listen();