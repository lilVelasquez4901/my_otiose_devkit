process.env.JWT_SECRET = 'test-secret'

const test = require('node:test')
const assert = require('node:assert')
const { beforeEach } = test
const express = require('express')
const request = require('supertest')

const { sendSuccess, sendNoContent } = require('../../responseEnvelope')

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

test('sendSuccess properly shapes the requests body', async(t)=>{
    const res = await request(app).get('/success')

    assert.strictEqual(res.status, 200)
    assert.deepStrictEqual(res.body, { success: true, data: { id: 1 }, page: 2 })
})

test('sendNoContent sends 204 with no body', async () => {
    const res = await request(app).get('/empty')

    assert.strictEqual(res.status, 204)
    assert.strictEqual(res.text, '')
})