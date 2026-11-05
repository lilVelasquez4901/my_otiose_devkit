'use strict'

const {asyncWrapper, sendSuccess, sendCreated} = require('../api-kit/index')
const {signToken} = require('./jwtWorker')
const User = require('./userSchema')
const ApiError = require('../guard-kit/errorClasser')

//All async functions below should have the request type and pathname to specifically guide to the use of these functions. 

// POST /auth/register
const register = asyncWrapper(async(req,res)=>{
    const {name, email, password} = req.body ?? {}

    const user = await User.create({name, email, password})

    sendCreated(res, {user, token: signToken(user)})
})

// POST /auth/login
const login = asyncWrapper(async(req,res)=>{
    const {email, password} = req.body ?? {}

    if(!email || !password)
        throw ApiError.badRequest('email and password are required')

    const user = await User.findOne({email: String(email).toLowerCase().trim()}).select(`+password`)

    if(!user || !(await user.comparePassword(password))){
        throw ApiError.unauthenticated('Invalid email or password')
    }

    if(user.needRehash()){
        user.password = password
        await user.save({validateBeforeSave: false})
    }
    sendSuccess(res, {user, token:signToken(user)})
})

// GET /auth/me
const me = asyncWrapper(async(req,res)=>{
    sendSuccess(res, req.user)
})

module.exports = {register, login, me}