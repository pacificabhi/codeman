import expressAsyncHandler from 'express-async-handler';
import ResponseError from '../../../utils/errors/BaseError';
import {
    createUser,
    getUser,
    generateUsername,
    encryptPassword,
    authenticateUser,
    loginUser,
    verifyRefreshToken,
    deleteRefreshToken,
} from '../../../services/apps/auth/auth.service';

import { responseError, responseOk } from '../../../utils/response.wrappers';
import { IUser } from '../../../models/apps/auth/user.model';
import {
    errorCodes,
    errorNames,
} from '../../../utils/constants/error.constants';
import ServerError from '../../../utils/errors/ServerError';
import { Request, Response } from 'express';

const registerUserHandler = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { firstname, lastname, email, password } = req.body;
        const userAvailable = await getUser(email);

        if (userAvailable) {
            throw new ResponseError(
                errorNames.VALIDATION_ERROR,
                'Email already Registered',
                errorCodes.VALIDATION_ERROR
            );
        }
        // generating username for new user
        const username = await generateUsername(email, firstname, lastname);

        // hash password
        const hashedPassword = await encryptPassword(password);

        // create User
        const newUser: IUser = {
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
        };

        const user: IUser = await createUser(newUser);
        if (!user) {
            throw new ResponseError(
                errorNames.SERVER_ERROR,
                'Something went wrong',
                errorCodes.SERVER_ERROR
            );
        }
        res.status(201).json(
            responseOk({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                },
            })
        );
    }
);

const loginUserHandler = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const user = await getUser(username);
        if (!user) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                `No account is linked with ${username}`,
                errorCodes.UNAUTHORIZED
            );
        }

        if (!user.active) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                `Account is deactivated`,
                errorCodes.UNAUTHORIZED
            );
        }

        const authenticatedUser = await authenticateUser(user, password);

        if (!authenticatedUser) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'Wrong Password',
                errorCodes.UNAUTHORIZED
            );
        }

        const { accessToken, refreshToken } = await loginUser(
            authenticatedUser
        );

        res.json(
            responseOk({
                message: 'Logged in Success',
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        );
    }
);

const refreshAccessTokenHandler = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const oldRefreshToken = req.body.refreshToken;

        const decoded: any = await verifyRefreshToken(oldRefreshToken);

        if (!decoded?.user?.username) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'Invalid Token',
                errorCodes.UNAUTHORIZED
            );
        }

        const username = decoded.user.username;

        const user = await getUser(username);
        if (!user) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'User not found',
                errorCodes.UNAUTHORIZED
            );
        }
        const deletedOld = await deleteRefreshToken(oldRefreshToken);
        if (!deletedOld) {
            throw new ServerError(
                errorNames.SERVER_ERROR,
                'Unable to delete Token from Database',
                errorCodes.SERVER_ERROR
            );
        }
        const { accessToken, refreshToken } = await loginUser(user);

        res.json(
            responseOk({
                message: 'Token Refreshed',
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        );
    }
);

const logoutUserHandler = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const refreshToken: string = req.body.refreshToken;
        if (!refreshToken) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'No Refresh token found',
                errorCodes.UNAUTHORIZED
            );
        }
        const deleted = await deleteRefreshToken(refreshToken);
        if (!deleted) {
            throw new ServerError(
                errorNames.SERVER_ERROR,
                'Cannot delete token',
                errorCodes.SERVER_ERROR
            );
        }
        res.json(
            responseOk({
                message: 'Logged Out Successfully',
            })
        );
    }
);

const getCurrentUserHandler = expressAsyncHandler(
    async (req: Request, res: Response) => {
        res.json({
            message: 'Get User',
        });
    }
);

export {
    registerUserHandler,
    getCurrentUserHandler,
    loginUserHandler,
    refreshAccessTokenHandler,
    logoutUserHandler,
};
