class ApiError extends Error { //This is needed so your code doesn't ask you "what the hell is an ApiError?"
    constructor(statusCode, message, details = null){
        super(message)
        this.statusCode = statusCode
        this.details = details
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
    //The lines below are what error you want to give such as this being a error on the users behalf
    static badRequest(message = 'Bad Request', details = null){
        return new ApiError(400, message, details)
    }

    //401: we do not know who you are-- Login and try again
    static unauthenticated(message = 'Unauthenticated', details = null){
        return new ApiError(401, message, details)
    }
    //403: We know who you are, and still may not do this
    static unauthorized(message = 'Unauthorized', details = null){
        return new ApiError(403, message, details)
    }
    // Basic 404 not found.
    static notFound(message = 'Not Found', details = null){
        return new ApiError(404, message, details)
    }
    // 409: the request is a valid one, but there is already one record of what you're making
    static conflict(message = 'Conflict', details = null){
        return new ApiError(409, message, details)
    }
    //Errors reserved for api-client
    static serverError(message = 'Internal Server Error', details = null, statusCode = 500) {
        return new ApiError(statusCode, message, details)
    }
    static serviceUnavailable(message = 'Service Unavailable', details = null) {
        return new ApiError(503, message, details)
    }
}

module.exports = ApiError