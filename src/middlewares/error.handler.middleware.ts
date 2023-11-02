import logger from '../logger';
import { responseError } from '../utils/response.wrappers';
import { NextFunction, Request, Response } from 'express';
import BaseError from '../utils/errors/BaseError';

const errorHandler = (
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    logger.error(err.message);
    logger.debug(err.stack);
    if (!err.isOperational) {
        err.message = 'Something went wrong';
    }
    res.status(err.statusCode).json(responseError(err));
};

export default errorHandler;
