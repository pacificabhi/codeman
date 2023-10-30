import BaseError from "./BaseError";

class ResponseError extends BaseError {
    constructor(name: string, message: string, statusCode: number) {
        super(name, message, statusCode, true)
    }
}

export default ResponseError