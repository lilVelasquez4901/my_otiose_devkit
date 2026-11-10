const {fetchWrapper, configure} = require('../../fetchWrapper')
const test = require('node:test')
const assert = require('node:assert')
const {beforeEach} = test

beforeEach(() => {
    configure({ baseUrl: 'https://example.com/api'})
})
test('Returns parsed JSON on 200', async (t) => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ok: true, json: async () => ({ id: 1 })}))

    const data = await fetchWrapper('/users/1')
    assert.deepStrictEqual(data, { id: 1 })
    assert.strictEqual(fetchMock.mock.calls[0].arguments[0], 'https://example.com/api/users/1')
})

test('Returns successful request after stripping trailing slash', async (t) =>{
    configure({ baseUrl: 'https://example.com/api/' })
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ok: true, json: async () => ({ id: 1 })}))

    await fetchWrapper('/users/1')

    assert.strictEqual(fetchMock.mock.calls[0].arguments[0], 'https://example.com/api/users/1')
})

test('POST sends method, JSON body and content-type header', async (t) => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ id: 2 }) }))

    await fetchWrapper('/users', { method: 'POST', body: { name: 'Ada' } })

    const init = fetchMock.mock.calls[0].arguments[1]
    assert.strictEqual(init.method, 'POST')
    assert.strictEqual(init.body, JSON.stringify({ name: 'Ada' }))
    assert.strictEqual(init.headers['Content-Type'], 'application/json')
})

test('GET sends no body or headers', async (t) => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ id: 1 }) }))

    await fetchWrapper('/users/1')

    const init = fetchMock.mock.calls[0].arguments[1]
    assert.strictEqual(init.method, 'GET')
    assert.strictEqual(init.body, undefined)
    assert.strictEqual(init.headers, undefined)
})