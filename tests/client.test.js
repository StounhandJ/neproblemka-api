const server = require("../index");
const request = require("supertest").agent(server);
const models = require("../models/index");
jest.mock("../models/index")

const id = 346
const mail = "frog@yamdex.ru"
const mailUpdate = "dog@yamdex.ru"
const telegramID = 2415844236
const telegramIDUpdate = 7411248442
const responseClient = {id:id,mail:mail, telegramID:telegramID,phoneNumber:89096979578}
// ----Заглушки---- //
models.clientModel.create_client.mockReturnValue(responseClient)
models.clientModel.delete_client.mockReturnValue(responseClient)
models.clientModel.update_client.mockReturnValue((id, mail, telegramID, phoneNumber)=>{
    return id && (mail || telegramID || phoneNumber)? 1:0
})
models.clientModel.get_client_id.mockImplementation(idIN=> idIN==id?responseClient:null)

models.clientModel.get_client_telegramID.mockImplementation(telegramIDIN=> telegramIDIN==telegramID?responseClient:null)
// ---------------- //

afterAll((done)=>{
        server.close();
        done();
    })

it('defined', function(done) {
    request.get("/client").expect(200).end(done)
    request.get("/client.all").expect(200).end(done)
    request.post("/client.create").expect(200).end(done)
    request.post("/client.update").expect(200).end(done)
    request.post("/client.del").expect(200).end(done)
})

describe('GET: ', function() {
    it('invalid count of values', function(done) {
        request.get("/client")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.get("/client")
            .query({id:"Строка",telegramID:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.get("/client")
            .query({telegramID:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing client', function(done) {
        request.get("/client")
            .query({id:id+1})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.get("/client")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.get("/client")
            .query({telegramID:telegramID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.get("/client")
            .query({id:id, telegramID:telegramID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})

describe('GET ALL: ', function() {
    it('correct there are clients', function(done) {
        models.clientModel.get_clients.mockReturnValueOnce(null)
        request.get("/client.all")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    });

    it('correct no customers', function(done) {
        models.clientModel.get_clients.mockReturnValueOnce([responseClient])

        request.get("/client.all")
            .query({telegramID:telegramID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})

describe('CREATE: ', function() {
    it('invalid count of values', function(done) {
        request.post("/client.create")
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
    })

    it('invalid values', function(done) {
        request.post("/client.create")
            .query({telegramID:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/client.create")
            .query({telegramID:telegramID,mail:mail})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/client.create")
            .query({telegramID:telegramID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/client.create")
            .query({mail:mail})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})


describe('UPDATE: ', function() {

    it('only the main parameter', function(done) {
        request.post("/client.update")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/client.update")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('main parameter is missing', function(done) {
        request.post("/client.update")
            .query({mail:mail, telegramID:telegramID})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid count of values', function(done) {
        request.post("/client.update")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.post("/client.update")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/client.update")
            .query({id:id, telegramID:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/client.update")
            .query({id:id,mail:mailUpdate})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/client.update")
            .query({id:id,telegramID:telegramIDUpdate})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/client.update")
            .query({id:id,mail:mailUpdate,telegramID:telegramIDUpdate})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})

describe('DEL: ', function() {
    it('main parameter is missing', function(done) {
        request.post("/client.del")
                .query()
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
    })

    it('invalid values', function(done) {
        request.post("/client.del")
                .query({id:"Строка"})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
    })

    it('correct', function(done) {
        request.post("/client.del")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})
