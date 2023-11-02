import { verifyAccessToken } from '../../../services/apps/auth/auth.service';
import { IUser } from '../../../models/apps/auth/user.model';
import { NextFunction, Request, Response } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser
    }
}

const addAuthUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader: string = (req.headers.authorization ||
        req.headers.Authorization) as string;
    if (authHeader) {
        const token: string = authHeader.split(' ')[1];
        try {
            const decoded: any = await verifyAccessToken(token);

            if (decoded?.user) {
                req.user = decoded.user;
            }
        } catch (err: any) {

        }
    }
    next();
};

export { addAuthUserMiddleware };
