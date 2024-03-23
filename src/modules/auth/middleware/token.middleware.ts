import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../../utils/jwt.js";

interface IUserToken {
    email: string;
    role: string;
}

class TokenChecker {
    async checkToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.headers['authorization'];
            if (!token) {
                res.status(401).json({ msg: 'NO TOKEN', data: null, error: true });
                return;
            }
            const user = jwtHelper.verify(token) as IUserToken;
            req.user = user;
            next();
        } catch (err: any) {
            res.status(500).json({ msg: err.message, data: null, error: true });
        }
    }
}

export const tokenChecker = new TokenChecker();
