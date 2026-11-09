const {fetchWrapper} = require('../../fetchWrapper')
const test = require('node:test')
const assert = require('node:assert')

test('returns parsed JSON on 200', async (t) => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ok: true, json: async () => ({ id: 1 })}))

    const data = await fetchWrapper('/users/1')
    assert.deepStrictEqual(data, { id: 1 })
    assert.strictEqual(fetchMock.mock.calls[0].arguments[0], 'https://example.com/api/users/1')
})

