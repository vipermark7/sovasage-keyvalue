
const app = require("../KeyValueRecorder")
const test = require("supertest")
const assert = require('assert')

describe('GET /',  function () {
    it('responds with plain text', async function () {
        const response = await test(app)
            .get('/');
            console.log(response.text)
            assert.equal(response.statusCode, 200)
    });
});

describe('GET /set?mynumber=12',  function () {
    it('gives us a key and a value to save', async function () {
        const response = await test(app)
            .get('/set?mynumber=12');
            console.log(`body for set: ${JSON.stringify(response.body)}`)
            assert.equal(response.body["value"], "12")
            assert.equal(response.statusCode, 200)
    });
});

describe('GET /get?mynumber',  function () {
    it('gives us a value when we provide a key', async function () {
        const response = await test(app)
            .get('/get?mynumber');
            console.log(`body for set: ${JSON.stringify(response.body)}`)
            assert.equal(response.body["value"], "12")
            assert.equal(response.statusCode, 200)
    });
});