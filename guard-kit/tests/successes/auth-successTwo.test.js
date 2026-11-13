process.env.JWT_SECRET = 'test-secret'
const test = require('node:test')
const assert = require('node:assert')
const { beforeEach } = test
const express = require('express')
const request = require('supertest')

const { authValidator } = require('../../validator')
const { signToken } = require('../../../auth-kit/jwtWorker')
const User = require('../../../auth-kit/userSchema')
const { AUTH } = require('../../../auth-kit/storage')

let app

beforeEach(() => {
    app = express()
    app.get('/protected', authValidator, (req, res) => {
        res.json({ id: req.user.id })
    })
    app.use((err, req, res, next) => {
        res.status(err.statusCode ?? 500).json({ message: err.message })
    })
})

test('looks up the user by the sub in the token', async (t) => {
    const findMock = t.mock.method(User, 'findById', async () => ({ id: 'heabriff' }))
    const token = signToken({ _id: 'heabriff', role: 'user' })

    const res = await request(app).get('/protected').set('Authorization', `${AUTH.BEARER_PREFIX}${token}`)
    console.log(res.status, res.body)
    assert.strictEqual(res.status, 200)
    assert.strictEqual(findMock.mock.calls.length, 1)
    assert.strictEqual(findMock.mock.calls[0].arguments[0], 'heabriff')
})