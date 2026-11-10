'use strict'

const ApiError = require('./apiError')

let baseUrl = null
let getToken = null

function configure(options){
    if(typeof options?.baseUrl !== "string"){
        throw new TypeError('configure: baseUrl must be a string')
    }
    if(options.getToken !== undefined && typeof options.getToken !== 'function'){
        throw new TypeError('configure: getToken must be a function')
    }
    getToken = options.getToken ?? null
    baseUrl = options.baseUrl.replace(/\/+$/, '')
}

async function fetchWrapper(path, { method = 'GET', body, headers: callerHeaders} = {}) {
    let response
    if(baseUrl === null){
        throw new Error('fetchWrapper: call configure({baseUrl}) before making requests')
    }
    const init = { method }
    const headers = {}
    if (body !== undefined) {
        init.body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
    }
    const token = getToken ? getToken() : null
    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    Object.assign(headers, callerHeaders)
    if (Object.keys(headers).length > 0) {
    init.headers = headers
    }
    try {
        response = await fetch(baseUrl + path, init)
    } catch (error) {
        throw ApiError.serviceUnavailable ('Network Error', error)
    }
    if(!response.ok) {
        throw new ApiError(response.status, response.statusText)
    }
    if (response.status === 204) {
    return null
    }
    return response.json()
}

module.exports = {fetchWrapper, configure}