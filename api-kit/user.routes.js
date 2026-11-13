'use strict'

const {login, me, register} = require('../auth-kit/index')
const {authValidator} = require('../guard-kit/validator')
const express = require('express')
const router = express.Router()

router
    .post('/register', register)
    .post('/login', login)
    .get('/me', authValidator, me)

module.exports = router