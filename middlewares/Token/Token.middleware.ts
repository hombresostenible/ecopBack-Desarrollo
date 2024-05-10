import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
};

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_token_secret';

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'User not found authRequired' });
        req.user = user;
        next();
    });
};