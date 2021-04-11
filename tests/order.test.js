const server = require("../index");
const request = require("supertest").agent(server);
const models = require("../models/index");
jest.mock("../models/index")

const id = 684
const idClient = 45
const description = "description order"
const documentID = 89
const typeWorkID = 3
const stateOfOrder = 0
const price = 780000
const promoCodeID = 46
const otherDiscount = 5
const separate = 1
const date = 1923502352

const Client = {}
const document= {}
const typeWork = "Diplom"

let responseOrder = {
    id: id, idClient: idClient,
    description: description, documentID: documentID,
    typeWorkID: typeWorkID, stateOfOrder: stateOfOrder,
    price: price, promoCodeID: promoCodeID,
    otherDiscount: otherDiscount, separate: separate,
    date: date
}
// ----Заглушки---- //
models.orderModel.get_order.mockImplementation(idIN=> idIN==id?responseOrder:null)
models.orderModel.get_order.mockImplementation(idIN=> idIN==id?responseOrder:null)
models.orderModel.get_orders.mockImplementation((idClientIN, typeWorkIDIN, stateOfOrderIN, offsetIN, limitIN)=> !offsetIN || offsetIN<15?[responseOrder]:null)
models.orderModel.delete_order.mockReturnValue(responseOrder)

// ---------------- //

afterAll((done)=>{
    server.close();
    done();
})

it('defined', function(done) {
    request.get("/order").expect(200).end(done)
    request.get("/order.all").expect(200).end(done)
    request.post("/order.create").expect(200).end(done)
    request.post("/order.priceSet").expect(200).end(done)
    request.post("/order.chequeCreate").expect(200).end(done)
    request.post("/order.chequeCompleted").expect(200).end(done)
    request.post("/order.del").expect(200).end(done)
})

describe('GET: ', function() {
    it('invalid count of values', function(done) {
        request.get("/order")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.get("/order")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing cheque', function(done) {
        request.get("/order")
            .query({id:id+1})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.get("/order")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})


describe('GET ALL: ', function() {
    it('invalid values', function(done) {
        request.get("/order.all")
            .query({idClient:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.get("/order.all")
            .query({typeWorkID:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.get("/order.all")
            .query({stateOfOrder:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.get("/order.all")
            .query({offset:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.get("/order.all")
            .query({limit:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing cheque', function(done) {
        request.get("/order.all")
            .query({offset:20})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.get("/order.all")
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})


describe('DEL: ', function() {
    it('main parameter is missing', function(done) {
        request.post("/order.del")
            .query()
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.post("/order.del")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/order.del")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})