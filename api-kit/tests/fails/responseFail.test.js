process.env.JWT_SECRET = 'test-secret'

const test = require('node:test')
const assert = require('node:assert')
const { beforeEach } = test
const express = require('express')

const asyncWrapper = require('../../asyncWrapper')

let app

beforeEach(() => {
    app = express()
    app.get('/success', (req, res) => {
        sendSuccess(res, { id: 1 }, 200, { page: 2 })
    })
    app.get('/empty', (req, res) => {
        sendNoContent(res)
    })
})

test('Rejecting async handler goes to next', async(t)=>{
    const err = new Error('boom')
    const next = t.mock.fn()

    await asyncWrapper(async () => { throw err })({}, {}, next)
    
    assert.strictEqual(next.mock.calls.length, 1)
    assert.strictEqual(next.mock.calls[0].arguments[0], err)
})

test('Synchronous throw reaches next', async(t)=>{
    const err = new Error('boom')
    const next = t.mock.fn()

    await asyncWrapper(() => { throw err })({}, {}, next)
    
})