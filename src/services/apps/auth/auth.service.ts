import User, { IUser } from '../../../models/apps/auth/user.model';
import UserToken, {
    IUserToken,
} from '../../../models/apps/auth/user.token.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    errorCodes,
    errorNames,
} from '../../../utils/constants/error.constants';
import ResponseError from '../../../utils/errors/ResponseError';
import authConfig from '../../../config/apps/auth/config';
import ServerError from '../../../utils/errors/ServerError';

const createUser = async (user: IUser) => {
    const newUser: IUser = await User.create(user);
    return newUser;
};

const createUserToken = async (token: string, userId: string) => {
    const userToken: IUserToken = await UserToken.create({
        userId: userId,
        token: token,
    });

    return userToken;
};

const getUser = async (username: string) => {
    const user: IUser| null = await User.findOne({
        $or: [{ email: username }, { username: username }],
    });
    return user;
};

const generateUsername = async (
    email: string,
    firstname: string,
    lastname: string
) => {
    return email.split('@')[0];
};

const encryptPassword = async (password: string) => {
    let salt: number = parseInt(authConfig.bcrypt_salt_rounds);
    if (!salt) {
        salt = 10;
    }
    return bcrypt.hash(password, salt);
};

const authenticateUser = async (user: IUser, password: string) => {
    const passwordMatch = await bcrypt.compare(
        password,
        user.password as string
    );
    if (passwordMatch) {
        return user;
    }
    return null;
};

const loginUser = async (user: IUser) => {
    const accessToken: string = generateAccessToken(user);

    const refreshToken: string = generateRefreshToken(user);

    const userToken = await createUserToken(refreshToken, user.id as string);

    if (!userToken) {
        throw new ServerError(
            errorNames.SERVER_ERROR,
            'Something went Wrong',
            errorCodes.SERVER_ERROR
        );
    }

    return { accessToken, refreshToken };
};

const verifyAccessToken = async (token: string) => {
    try {
        return jwt.verify(token, authConfig.jwt_access_token_secret);
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'Access Token Expired',
                errorCodes.UNAUTHORIZED
            );
        }

        throw new ResponseError(
            errorNames.UNAUTHORIZED,
            'Invalid Token',
            errorCodes.UNAUTHORIZED
        );
    }
};

const verifyRefreshToken = async (token: string) => {
    try {
        const validToken = await UserToken.findOne({ token: token });
        if (!validToken) {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'Invalid Token or Expired',
                errorCodes.UNAUTHORIZED
            );
        }
        return jwt.verify(token, authConfig.jwt_refresh_token_secret);
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            throw new ResponseError(
                errorNames.UNAUTHORIZED,
                'Refresh Token Expired',
                errorCodes.UNAUTHORIZED
            );
        }

        throw new ResponseError(
            errorNames.UNAUTHORIZED,
            'Invalid Token',
            errorCodes.UNAUTHORIZED
        );
    }
};

const deleteRefreshToken = async (token: string) => {
    const deleted = await UserToken.deleteOne({ token: token });
    
    if (!deleted) {
        throw new ServerError(
            errorNames.SERVER_ERROR,
            'Unable to delete Token from Database',
            errorCodes.SERVER_ERROR
        );
    }
    return true;
};

const generateRefreshToken = (user: IUser): string => {
    const payload = {
        user: {
            username: user.username,
        },
    };

    return jwt.sign(payload, authConfig.jwt_refresh_token_secret, {
        expiresIn: authConfig.jwt_refresh_token_expiry,
    });
};

const generateAccessToken = (user: IUser): string => {
    const payload = {
        user: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            email: user.email,
            lastname: user.lastname,
            role: user.role,
        },
    };

    return jwt.sign(payload, authConfig.jwt_access_token_secret, {
        expiresIn: authConfig.jwt_access_token_expiry,
    });
};

export {
    createUser,
    getUser,
    generateUsername,
    encryptPassword,
    authenticateUser,
    loginUser,
    verifyRefreshToken,
    deleteRefreshToken,
    verifyAccessToken,
};
