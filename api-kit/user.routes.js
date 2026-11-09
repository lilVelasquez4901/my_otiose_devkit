'use strict'

const {login, me, register} = require('../auth-kit/index')
const {authValidator} = require('../guard-kit/validator')
const router = express.router()

router
    .post('/register', register)
    .post('/login', login)
    .post('/me', authValidator, me)

module.exports = router