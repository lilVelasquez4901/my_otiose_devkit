'use strict'

const ApiError = require('./apiError')

let baseUrl = "https://example.com/api";

async function fetchWrapper(path) {
    let response

    try {
        response = await fetch(baseUrl + path)
    } catch (error) {
        throw ApiError.serviceUnavailable ('Network Error', error)
    }
    if(!response.ok) {
        throw new ApiError(response.status, response.statusText)
    }
    return response.json()
}

module.exports = {fetchWrapper}