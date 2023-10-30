
class BaseError extends Error{
    public statusCode: number
    public name: string
    public isOperational: boolean
    
    constructor(name: string, message: string, statusCode: number, isOperational: boolean = true){
        super(message)
        this.statusCode = statusCode
        this.name = name
        this.isOperational = isOperational

        Error.captureStackTrace(this, this.constructor)
    }
}

export default BaseError