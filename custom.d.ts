import express from 'express';

declare global {
    namespace Express {
        interface Request {
            isSecure?: boolean;  // Agregamos la propiedad personalizada
        }
    }
}