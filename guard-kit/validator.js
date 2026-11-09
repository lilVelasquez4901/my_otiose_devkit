'use strict'
const asyncHandler = require('../api-kit/asyncWrapper')
const ApiError = require('./errorClasser')
const {AUTH} = require('../auth-kit/storage')
const {verifyToken} = require('../auth-kit/jwtWorker')
const {User} = require('../auth-kit/userSchema')

const authValidator = asyncHandler(async(req,res,next)=>{
    const header = req.get('authorization')

    if(!header || !header.startsWith(AUTH.BEARER_PREFIX)){
        throw ApiError.unauthorized('Missing or malformed Authorized header')
    }

    const token = header.slice(AUTH.BEARER_PREFIX.length).trim()
    if(!token) throw ApiError.unauthenticated('Missing or malformed Authorization header')
        // Error 401 thrown for forged, expired or garbage tokens
    const payload = verifyToken(token)

    const user = await User.findById(payload.sub)
    if (!user) throw ApiError.unauthorized('This account no longer exists')
        /**Don't take the user at their word, check they exist still before granting service
         * Meant to stop deleted users, users with their roles changed and to see a still-valid token
         */
    req.user = user
    next()
})
module.exports = {authValidator}