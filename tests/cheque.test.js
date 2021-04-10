const server = require("../index");
const request = require("supertest").agent(server);
const models = require("../models/index");
jest.mock("../models/index")

const id = 546
const idOrder = 90
const amount = 5800
const date = 1923502352
const secretKey = "fdgi234kjgs0b9h435gb9"
const responseCheque = {id:id, idOrder:idOrder, amount:amount, date:date, secretKey:secretKey}
// ----Заглушки---- //
models.chequeModel.get_cheque_secretKey.mockImplementation(secretKeyIN=> secretKeyIN==secretKey?responseCheque:null)
models.chequeModel.get_cheque_id.mockImplementation(idIN=> idIN==id?responseCheque:null)
models.chequeModel.delete_cheque.mockReturnValue(idIN=> idIN==id?1:0)
// ---------------- //
afterAll((done)=>{
    server.close();
    done();
})

it('defined', function(done) {
    request.get("/cheque").expect(200).end(done)
    request.post("/cheque.del").expect(200).end(done)
})

describe('GET: ', function() {
    it('invalid count of values', function(done) {
        request.get("/cheque")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.get("/cheque")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing cheque', function(done) {
        request.get("/cheque")
            .query({id:id+1})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.get("/cheque")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.get("/cheque")
            .query({secretKey:secretKey})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.get("/cheque")
            .query({id:id, secretKey:secretKey})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})


describe('DEL: ', function() {
    it('main parameter is missing', function(done) {
        request.post("/cheque.del")
            .query()
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.post("/cheque.del")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/cheque.del")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})