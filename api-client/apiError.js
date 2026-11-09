class ApiError extends Error { //Your personal copy of ApiError, change as needed
    constructor(statusCode, message, details = null){
        super(message)
        this.statusCode = statusCode
        this.details = details
        Error.captureStackTrace(this, this.constructor)
    }
    static serverError(message = 'Internal Server Error', details = null, statusCode = 500) {
        return new ApiError(statusCode, message, details)
    }
    static serviceUnavailable(message = 'Service Unavailable', details = null) {
        return new ApiError(503, message, details)
    }
}

module.exports = ApiError