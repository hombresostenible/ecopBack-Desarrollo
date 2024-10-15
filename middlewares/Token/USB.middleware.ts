import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

// Obtener el secreto del token desde el archivo .env
const TOKEN_SECRET = `${process.env.TOKEN_SECRET}`;

// Middleware de autenticación
export const USBAuthRequired = (req: Request, res: Response, next: NextFunction) => {
   
    const token =  (req.session as any).token;  
    const userId =  (req.session as any).userId
    
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'User not found authRequired' });
        req.user = user;
        req.user.userId = userId
        next();
    });
};
