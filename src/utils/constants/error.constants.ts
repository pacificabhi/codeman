const errorCodes = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    REFERENCE_ERROR: 500,
}

const errorNames = {
    VALIDATION_ERROR: 'ValidationError',
    UNAUTHORIZED: 'AuthorizationError',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'NotFound',
    SERVER_ERROR: 'ServerError',
    REFERENCE_ERROR: 'ReferenceError'
}

export {
    errorCodes,
    errorNames
}