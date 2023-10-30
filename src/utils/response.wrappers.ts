import ResponseError from "./errors/BaseError"

const responseOk = (respData: Object) => {
    return {
        ok: true,
        data: respData
    }
}

const responseError = (err: ResponseError) => {
    return {
        ok: false,
        error: {
            message: err.message
        }
    }
}

export {
    responseOk,
    responseError
}