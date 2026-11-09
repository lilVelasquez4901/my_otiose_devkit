const {fetchWrapper} = require('../../fetchWrapper')
const test = require('node:test')
const assert = require('node:assert')

test('returns 404 with a non-ok response', async(t)=>{
    t.mock.method(globalThis, 'fetch', async () => ({
        ok: false,
        status: 404,
        statusText: 'Not Found'
    }))
    await assert.rejects(
    () => fetchWrapper('/users/999999'),
    (err) => err.statusCode === 404
)
})

test('throws 503 when the network call fails', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => {
        throw new Error('connection refused')
    })

    await assert.rejects(
        () => fetchWrapper('/users/1'),
        (err) => err.statusCode === 503 && err.details.message === 'connection refused'
    )
})