const {fetchWrapper, configure} = require('../../fetchWrapper')
const test = require('node:test')
const assert = require('node:assert')
const {beforeEach} = test

beforeEach(() => {
    configure({ baseUrl: 'https://example.com/api'})
})

test('Returns 404 with a non-ok response', async(t)=>{
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

test('Throws 503 when the network call fails', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => {
        throw new Error('connection refused')
    })

    await assert.rejects(
        () => fetchWrapper('/users/1'),
        (err) => err.statusCode === 503 && err.details.message === 'connection refused'
    )
})

test('Config throws typeError when baseUrl is missing or not a string', ()=>{
    const expected = { name: 'TypeError', message: /baseUrl must be a string/ }

    assert.throws(() => configure({}), expected),
    assert.throws(() => configure(), expected),
    assert.throws(() => configure({ baseUrl: 123 }), expected)
})

test('Config throws TypeError when getToken is not a function', () => {
    assert.throws(() => configure({ baseUrl: 'https://example.com/api', getToken: 'nope' }),
    { name: 'TypeError', message: /getToken must be a function/ })
})