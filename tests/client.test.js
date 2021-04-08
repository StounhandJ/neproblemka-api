const server = require("../index");
const request = require("supertest").agent(server);
const models = require("../models/index");
jest.mock("../models/index")

afterAll((done)=>{
        server.close();
        done();
    })

describe('ClientRequests: ', function() {

    let clientID = -1
    const mail = "frog@yamdex.ru"
    const mailUpdate = "dog@yamdex.ru"
    const telegramID = 2415844236
    const telegramIDUpdate = 7411248442
    let responseClient = {}

    beforeEach(()=>{
        responseClient = {id:723,mail:mail, telegramID:telegramID,phoneNumber:89096979578}
        // ----Заглушки---- //
        models.clientModel.create_client.mockReturnValue(responseClient)
        models.clientModel.delete_client.mockReturnValue(responseClient)
        models.clientModel.update_client.mockReturnValue((id, mail, telegramID, phoneNumber)=>{
            return id && (mail || telegramID || phoneNumber)? 1:0
        })
        models.clientModel.get_client_id.mockReturnValue((id)=>{
            return id>0?responseClient:null
        })
        models.clientModel.get_client_telegramID.mockReturnValue(((telegramID)=>{
            return telegramID>0?responseClient:null
        }))
        // ---------------- //
        }
    )

    it('defined', function(done) {
        request.get("/client").expect(200).end(done)
        request.get("/client.all").expect(200).end(done)
        request.post("/client.create").expect(200).end(done)
        request.post("/client.update").expect(200).end(done)
        request.post("/client.del").expect(200).end(done)
    })

    it('wrong one create', function(done) {
        request.post("/client.create")
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
    })

    it('create', function(done) {
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
        });


        it('wrong one update', function(done) {
            request.post("/client.update")
                .query({mail:mailUpdate})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request.post("/client.update")
                .query({id:clientID,telegramID:"Строка"})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request.post("/client.update")
                .query({id:clientID})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        })


        it('update', function(done) {
            request.post("/client.update")
                .query({id:clientID,mail:mailUpdate})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);

            request.post("/client.update")
                .query({id:clientID,telegramID:telegramIDUpdate})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);
        });

        it('wrong one get', function(done) {
            request.get("/client")
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

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

        it('get', function(done) {
            request.get("/client")
                .query({id:clientID})
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
                .query({id:clientID, telegramID:telegramID})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);
        });

        it('wrong one del', function(done) {
            request.post("/client.del")
                .query()
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request.post("/client.del")
                .query({id:"Строка"})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        });

        it('del', function(done) {
            request.post("/client.del")
                .query({id:clientID})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);
        });
});