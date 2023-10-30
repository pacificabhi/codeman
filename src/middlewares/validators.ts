import { NextFunction, Request, Response } from "express"
import { AnySchema, ValidationResult } from "joi"
import ResponseError from "../utils/errors/BaseError"
import { errorCodes, errorNames } from "../utils/constants/error.constants"

const validateRequestBody = (schema: AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result: ValidationResult = schema.validate(req.body, {abortEarly: false})
        if(result.error) {
            throw new ResponseError(
                errorNames.VALIDATION_ERROR,
                result.error.message,
                errorCodes.VALIDATION_ERROR
            )
        } else {
            next()
        }
    }
}

const validatePath = (req: Request, res: Response, next: NextFunction) => {
    throw new ResponseError(
        errorNames.NOT_FOUND,
        `Cannot Get ${req.method} ${req.originalUrl}`,
        errorCodes.NOT_FOUND
    )
}

export {
    validateRequestBody,
    validatePath
}