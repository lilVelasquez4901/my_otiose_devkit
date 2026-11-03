'use strict'

const jwt = require('jsonwebtoken')
const jwtSecret = "SuperSecretLoginCodeForAuthorizing"
//Always, ALWAYS make jwtSecrets an environmental variable. It is to never be seen or used by anyone but you and co-developers.

function signtoken(user){
    const payload = {sub: String(user._id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: '7d'})
}

function verifyToken(token){
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
       throw new Error('Invalid Token')
    }
}
module.exports = {verifyToken, signToken}