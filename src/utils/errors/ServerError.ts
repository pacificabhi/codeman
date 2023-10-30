import BaseError from "./BaseError";

class ServerError extends BaseError {
    constructor(name: string, message: string, statusCode: number) {
        super(name, message, statusCode, false)
    }
}

export default ServerError