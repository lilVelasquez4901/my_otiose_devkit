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

test('Give token to a user upon creation', async(t)=>{
    t.mock.method(User, 'findById', async () => ({
        id:'abc123'
    }))
    const token = signToken({_id:'abc123', role:'user'})

    const res = await request(app).get('/protected').set('Authorization', `${AUTH.BEARER_PREFIX}${token}`)
    
    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.body.id, 'abc123')
})