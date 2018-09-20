import API, { DEFAULT_HEADERS } from './API'

describe('API', () => {
    beforeEach(function() {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _reject) => {
              resolve({
                json: function() { 
                  return [{'word': 'Mi', 'value': 'pronoun'}]
                }
              })
            })
        }); 
    });

    describe('#request', () => {
        it('should receive the path and append the base HOST to url', async () => {
            await API.request('/endpoint')

            expect(global.fetch.mock.calls.length).toEqual(1)
            expect(global.fetch.mock.calls[0][0]).toEqual("http://127.0.0.1:5000/endpoint")
        })

        it('Should send all the `DEFAULT_HEADERS`', async () => {
            await API.request('/endpoint')

            expect(global.fetch.mock.calls[0][1].headers).toEqual(DEFAULT_HEADERS)
        })

        it('Sould send the provided `options` to `fetch`', async () => {
            await API.request('/endpoint', { hello: 'word', ping: 'pong' })

            expect(global.fetch.mock.calls[0][1].hello).toEqual('word')
            expect(global.fetch.mock.calls[0][1].ping).toEqual('pong')
        })
    })

    describe('#get', () => {
        it("Should call `request` with `method: 'GET'", () => {
            API.request = jest.fn() // mock the current implementation
            API.get('/endpoint') // dispatch the request

            expect(API.request.mock.calls.length).toEqual(1)
            expect(API.request.mock.calls[0][0]).toEqual('/endpoint')
            expect(API.request.mock.calls[0][1]).toEqual({  method: 'GET' })
        })

        it('Should send the provided `options` to `request` fn', () => {
            API.request = jest.fn() // mock the current implementation
            API.get('/endpoint', { hello: 'world', ping: 'pong'}) // dispatch the request

            expect(API.request.mock.calls[0][1].hello).toEqual('world')
            expect(API.request.mock.calls[0][1].ping).toEqual('pong')            
        })
    })

    describe('#post', () => {
        it("Should call `request` with `method: 'POST'", () => {
            API.request = jest.fn() // mock the current implementation
            API.post('/post_endpoint') // dispatch the request

            expect(API.request.mock.calls.length).toEqual(1)
            expect(API.request.mock.calls[0][0]).toEqual('/post_endpoint')
            expect(API.request.mock.calls[0][1]).toEqual({  method: 'POST' })
        })

        it('Should send the provided `options` to `request` fn', () => {
            API.request = jest.fn() // mock the current implementation
            API.post('/post_endpoint', { hello: 'world', ping: 'pong'}) // dispatch the request

            expect(API.request.mock.calls[0][1].hello).toEqual('world')
            expect(API.request.mock.calls[0][1].ping).toEqual('pong')            
        })
    })

    describe('#analyzeSentence', () => {
        it("Should call `request` with `method: 'GET'", () => {
            API.request = jest.fn() // mock the current implementation
            API.analyzeSentence('Mia')

            expect(API.request.mock.calls[0][1].method).toEqual('GET')
        })

        it("Should call the proper endpoint in remote API", () => {
            API.request = jest.fn() // mock the current implementation
            API.analyzeSentence('Mia')

            expect(API.request.mock.calls[0][0]).toEqual('/analyze?sentence=Mia')
        })
    })
})
