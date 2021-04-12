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
const price = 780000 // В копейках
const promoCodeID = 46
const otherDiscount = 0
const separate = 1
const date = 1923502352
const docTelegID = "fghoihoinoi345nibdfg"
const secretKey = "sdnlk1234nipvp23jdsvj"

const discount0 = 1500
const discount1 = 15

const Client = {}
const responseDocument= {id:89,path:"/fg/gh.txt",pathDisk:"disk/fg/gh.txt",documentTelegramId:docTelegID,state:0}
const responsePromoCodeType0= {id:promoCodeID,name:"тестовый",code:"Lord",discount:discount0,typeOfCode:0,limitUsing:0,state:0}
const responsePromoCodeType1= {id:promoCodeID,name:"тестовый",code:"Lord",discount:discount1,typeOfCode:1,limitUsing:0,state:0}

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
models.orderModel.create_order.mockReturnValue(responseOrder)
models.orderModel.delete_order.mockReturnValue(responseOrder)

models.documentModel.get_document.mockImplementation(idIN=> idIN==documentID?responseDocument:null)
models.documentModel.create_document.mockReturnValue(responseDocument)

models.typeOfWorkModel.get_typeOfWork_type.mockImplementation(typeWorkIN => typeWorkIN==typeWork?{typeWork:typeWork}:null)
models.typeOfWorkModel.create_typeOfWork.mockReturnValue({typeWork:typeWork})

models.promoCodeModel.get_promoCode_id.mockImplementationOnce(promoCodeIDIN=> promoCodeIDIN==promoCodeID?responsePromoCodeType0:null).mockImplementationOnce(promoCodeIDIN=> promoCodeIDIN==promoCodeID?responsePromoCodeType1:null)

models.chequeModel.get_cheque_secretKey.mockImplementation(secretKeyIN=>secretKeyIN==secretKey?{id:34,idOrder:id}:null)
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


describe('CREATE: ', function() {
    it('invalid count of values', function(done) {
        request.post("/order.create")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.create")
            .query({idClient:idClient, description:description, otherDiscount:otherDiscount})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.create")
            .query({otherDiscount:otherDiscount,typeWork:typeWork})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    describe('invalid values:', function() {
        it('separate', function(done) {
            request.post("/order.create")
                .query({
                    idClient: idClient, description: description, typeWork: typeWork, promoCodeID: promoCodeID,
                    otherDiscount: otherDiscount, separate: "Строка"
                })
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request.post("/order.create")
                .query({
                    idClient: idClient, description: description, typeWork: typeWork, promoCodeID: promoCodeID,
                    otherDiscount: otherDiscount, separate: 10
                })
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request.post("/order.create")
                .query({
                    idClient: idClient, description: description, typeWork: typeWork, promoCodeID: promoCodeID,
                    otherDiscount: otherDiscount, separate: -10
                })
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        })

        it('otherDiscount', function(done) {
            request.post("/order.create")
                .query({
                    idClient: idClient, description: description, typeWork: typeWork, promoCodeID: promoCodeID,
                    otherDiscount: "Строка", separate: separate
                })
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        })

        it('promoCodeID', function(done) {
            request.post("/order.create")
                .query({
                    idClient: idClient, description: description, typeWork: typeWork, promoCodeID: "Строка",
                    otherDiscount: otherDiscount, separate: separate
                })
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        })

        it('idClient', function(done) {
            request.post("/order.create")
                .query({
                    idClient: "Строка", description: description, typeWork: typeWork, promoCodeID: promoCodeID,
                    otherDiscount: otherDiscount, separate: separate
                })
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        })
    })

    it('correct', function(done) {
        request.post("/order.create")
            .query({
                idClient: idClient, description: description, typeWork: typeWork, promoCodeID: promoCodeID,
                otherDiscount: otherDiscount, separate: separate
            })
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/order.create")
            .query({
                idClient: idClient, description: description, typeWork: "Другой тип", promoCodeID: promoCodeID,
                otherDiscount: otherDiscount, separate: separate
            })
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/order.create")
            .query({
                idClient: idClient, description: description, typeWork: typeWork,
                otherDiscount: otherDiscount, separate: separate
            })
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/order.create")
            .query({
                idClient: idClient, description: description, otherDiscount:otherDiscount,
                typeWork: typeWork, promoCodeID: promoCodeID, separate: separate
            })
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
})


describe('PRICE SET: ', function() {
    it('invalid count of values', function(done) {
        request.post("/order.priceSet")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.priceSet")
            .query({price:price})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.priceSet")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.post("/order.priceSet")
            .query({id:id,price:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.priceSet")
            .query({id:"Строка",price:price})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing order', function(done) {
        request.post("/order.priceSet")
            .query({id:id+1,price:price})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/order.priceSet")
            .query({id:id,price:price})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
                expect(res.body.data.price).toEqual(price-(discount0*100));

                request.post("/order.priceSet")
                    .query({id:id,price:price})
                    .expect((res) => {
                        expect(res.body.code).toEqual(200);
                        expect(res.body.data.price).toEqual(price-price*(discount1/100));
                    })
                    .end(done);

            })
            .end(done);


    });
})


describe('CHEQUE CREATE: ', function() {
    it('invalid count of values', function(done) {
        request.post("/order.chequeCreate")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.chequeCreate")
            .query({secretKey:secretKey})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/order.chequeCreate")
            .query({id:id})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('invalid values', function(done) {
        request.post("/order.chequeCreate")
            .query({id:"Строка",secretKey:secretKey})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing order', function(done) {
        request.post("/order.chequeCreate")
            .query({id:id+1,secretKey:secretKey})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/order.chequeCreate")
            .query({id:id,secretKey:secretKey})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);


    });
})


describe('CHEQUE COMPLETED: ', function() {
    it('invalid count of values', function(done) {
        request.post("/order.chequeCompleted")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    })

    it('well an existing order', function(done) {
        request.post("/order.chequeCompleted")
            .query({secretKey:secretKey+"F"})
            .expect((res) => {
                expect(res.body.code).toEqual(404);
            })
            .end(done);
    })

    it('correct', function(done) {
        request.post("/order.chequeCompleted")
            .query({secretKey:secretKey})
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