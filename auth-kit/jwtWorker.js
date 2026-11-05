'use strict'

const jwt = require('jsonwebtoken')
const {ApiError} = require('../guard-kit/index')
const {AUTH} = require('./storage')
const jwtSecret =  process.env.JWT_SECRET || "SuperSecretLoginCodeForAuthorizing"
//Always, ALWAYS make jwtSecrets an environmental variable. It is to never be seen or used by anyone but you and co-developers.
//Moreover, the value should be a strong one, involving special characters and numbers with letters.

if (jwtSecret === 'SuperSecretLoginCodeForAuthorizing') {
  throw new Error('Set a real JWT secret in jwtWorker.js or the JWT_SECRET env variable')
}
function signToken(user){
    const payload = {sub: String(user._id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: process.env.JWT_EXPIRES_IN || AUTH.DEFAULT_JWT_EXPIRES_IN})
}

function verifyToken(token){
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
       throw ApiError.unauthenticated('Invalid Token')
    }
}
module.exports = {verifyToken, signToken}