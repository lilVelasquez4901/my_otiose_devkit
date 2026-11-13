process.env.JWT_SECRET = 'test-secret'
const test = require('node:test')
const assert = require('node:assert')
const { beforeEach } = test
const express = require('express')
const request = require('supertest')

const { authValidator } = require('../../validator')
 
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

test('missing header returns 401', async()=>{
    const res = await request(app).get('/protected')

    assert.strictEqual(res.status, 401)
    assert.strictEqual(res.body.message, 'Missing or malformed Authorized header')
})