'use strict'

const jwt = require('jsonwebtoken')
const ApiError = require('../guard-kit/errorClasser')
const jwtSecret = "SuperSecretLoginCodeForAuthorizing"
const jwtExpiresIn = "7d"
//Always, ALWAYS make jwtSecrets an environmental variable. It is to never be seen or used by anyone but you and co-developers.
//Additionally, jwtExpiresIn should also be a secret
function signtoken(user){
    const payload = {sub: String(user._id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiresIn})
}

function verifyToken(token){
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
       throw ApiError.unauthorized('Invalid Token')
    }
}
module.exports = {verifyToken, signToken}