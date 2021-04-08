const request = require("supertest");
const models = require("../models/index");
const app = require("../index");
jest.mock("../models/index")
describe('Promo Code Requests: ', function (){

    let promoID = 1
    const name = "frog"
    const codeName = "frogCode"
    let discount = 10
    const typeOfCode = 1
    const limitUsing = 15
    const state = 0

    beforeEach(()=> {
        responseClient = {id: 1, name: "frog", code: "frogCode", discount: 10, typeOfCode: 1, limitUsing: 15, state: 0}
        // ----Заглушки---- //
        models.promoCodeModel.create_promoCode.mockReturnValue(responseClient)
        models.promoCodeModel.delete_promoCode.mockReturnValue(responseClient)
        models.promoCodeModel.update_promoCode.mockReturnValue(responseClient)
        models.promoCodeModel.get_promoCode_id.mockReturnValue(responseClient)
        models.promoCodeModel.get_promoCode_code.mockReturnValue(responseClient)
        // ---------------- //
        }
    )

    it('defined', function(done) {
        request(app).get("/promocode").expect(200).end(done)
        request(app).get("/promocode.all").expect(200).end(done)
        request(app).post("/promocode.create").expect(200).end(done)
        request(app).post("/promocode.update").expect(200).end(done)
        request(app).post("/promocode.del").expect(200).end(done)
    })

    it('create', function(done) {
        request(app).post("/promocode.create")
            .query({name:name,codeName:codeName,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });

     it('create err', function (done) {
         request(app).post("/promocode.create")
            .query({name:name,codeName:codeName,discount:discount,typeOfCode:typeOfCode})
             .expect((res) => {
                 expect(res.body.code).toEqual(400);
         })
            .end(done);

        request(app).post("/promocode.create")
            .query({name:name,codeName:codeName,discount:discount,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request(app).post("/promocode.create")
            .query({name:name,codeName:codeName,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request(app).post("/promocode.create")
            .query({name:name,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

         request(app).post("/promocode.create")
             .query({codeName:codeName,discount:discount,typeOfCode:typeOfCode,limitUsing:limitUsing})
             .expect((res) => {
                 expect(res.body.code).toEqual(400);
             })
             .end(done);
    });
});