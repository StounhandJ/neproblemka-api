const server = require("../index");
const request = require("supertest").agent(server);
const models = require("../models/index");
jest.mock("../models/index")

afterAll((done)=>{
    server.close();
    done();
})

describe('Promo Code Requests: ', function (){

    let promoID = 1
    const name = "frog"
    const codeName = "frogCode"
    let discount = 10
    const typeOfCode = 1
    const limitUsing = 15

    beforeEach(()=> {
        const responsePromoCode = {id: 1, name: "frog", code: "frogCode", discount: 10, typeOfCode: 1, limitUsing: 15, state: 0}
        // ----Заглушки---- //
        models.promoCodeModel.create_promoCode.mockReturnValue(responsePromoCode)
        models.promoCodeModel.delete_promoCode.mockReturnValue(responsePromoCode)
        models.promoCodeModel.update_promoCode.mockReturnValue(responsePromoCode)
        models.promoCodeModel.get_promoCode_id.mockReturnValue(responsePromoCode)
        models.promoCodeModel.get_promoCode_code.mockReturnValue(responsePromoCode)
        models.promoCodeModel.get_promoCodes.mockReturnValue([responsePromoCode])
        // ---------------- //

    }
    )

    it('defined', function(done) {
        request.get("/promocode").expect(200).end(done)
        request.get("/promocode.all").expect(200).end(done)
        request.post("/promocode.create").expect(200).end(done)
        request.post("/promocode.update").expect(200).end(done)
        request.post("/promocode.del").expect(200).end(done)
    })

    it('create', function(done) {
        request.post("/promocode.create")
            .query({name:name,codeName:codeName,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });

    it('create err', function (done) {
        request.post("/promocode.create")
            .query({name:name,codeName:codeName,discount:discount,typeOfCode:typeOfCode})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({name:name,codeName:codeName,discount:discount,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({name:name,codeName:codeName,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({name:name,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({codeName:codeName,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    });

    it('create err type', function (done) {
        request.post("/promocode.create")
            .query({name:name,codeName:codeName,discount:"Строка",typeOfCode:"Строка",limitUsing:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({name:name,discount:"Строка",limitUsing:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({codeName:codeName,typeOfCode:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.create")
            .query({discount:"Строка",typeOfCode:"Строка",limitUsing:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    });

    it('update', function(done) {
        request.post("/promocode.update")
            .query({id:promoID,name:name,codeName:codeName,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/promocode.update")
            .query({id:promoID,name:name,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.post("/promocode.update")
            .query({id:promoID,codeName:codeName,typeOfCode:typeOfCode})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });

    it('wrong one update', function(done) {
        request.post("/promocode.update")
            .query({codeName:codeName})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.update")
            .query({id:promoID,limitUsing:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.update")
            .query({id:promoID,discount:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.update")
            .query({id:promoID})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    });

    it('get', function(done) {
        request.get("/promocode")
            .query({id:promoID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.get("/promocode")
            .query({codeName:codeName})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request.get("/promocode")
            .query({id:promoID, codeName:codeName})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });


    it('wrong one get', function(done) {
        request.get("/promocode")
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.get("/promocode")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    });

    it('del', function(done) {
        request.post("/promocode.del")
            .query({id:promoID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });

    it('wrong one del', function(done) {
        request.post("/promocode.del")
            .query()
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request.post("/promocode.del")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    });

    it('all', function (done){
       request.get("/promocode.all")
           .query({limitUsing:limitUsing, limit:5,  offset:5})
           .expect((res) => {
               expect(res.body.code).toEqual(200);
           })
           .end(done);

       request.get("/promocode.all")
           .query({offset:5})
           .expect((res) => {
               expect(res.body.code).toEqual(200);
           })
           .end(done);

       request.get("/promocode.all")
           .query({limitUsing:limitUsing, limit:5})
           .expect((res) => {
               expect(res.body.code).toEqual(200);
           })
           .end(done);
    });

    it('all err', function (done){
       request.get("/promocode.all")
           .query({offset:"Строка"})
           .expect((res) => {
               expect(res.body.code).toEqual(400);
           })
           .end(done);

       request.get("/promocode.all")
           .query({limitUsing:"Строка"})
           .expect((res) => {
               expect(res.body.code).toEqual(400);
           })
           .end(done);

       request.get("/promocode.all")
           .query({limit:"Строка"})
           .expect((res) => {
               expect(res.body.code).toEqual(400);
           })
           .end(done);
    });
});