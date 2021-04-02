const request = require("supertest");

const app = require("../index");

describe('ClientRequests: ', function() {

    let clientID = -1
    const mail = "frog@yamdex.ru"
    const mailTest = "dog@yamdex.ru"
    const telegramID = Math.round(Date.now()/1000)
    const telegramIDTest = Math.round(Date.now()/1000)+32

    it('defined', function(done) {
        request(app).get("/client").expect(200).end(done)
        request(app).get("/client.all").expect(200).end(done)
        request(app).post("/client.create").expect(200).end(done)
        request(app).post("/client.update").expect(200).end(done)
        request(app).post("/client.del").expect(200).end(done)
    })

    it('create', function(done) {
        request(app).post("/client.create")
            .query({telegramID:telegramID,mail:mail})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
                clientID = res.body.data.id
            })
            .end(done);

        request(app).post("/client.create")
            .query({telegramID:telegramID+1})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);

        request(app).post("/client.create")
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });

        it('wrong one update', function(done) {
            request(app).post("/client.update")
                .query({mail:mailTest})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request(app).post("/client.update")
                .query({id:clientID,telegramID:"Строка"})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);
        })

        it('update', function(done) {
            request(app).post("/client.update")
                .query({id:clientID,mail:mailTest})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);

            request(app).post("/client.update")
                .query({id:clientID,telegramID:telegramIDTest})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                    // Проверка изменений
                    request(app).get("/client")
                        .query({id:clientID})
                        .expect((res) => {
                            expect(res.body.data.telegramID).toBe(telegramIDTest);
                            expect(res.body.data.mail).toEqual(mailTest);
                        })
                        .end(done);
                })
                .end(done);
        });

        it('wrong one get', function(done) {
            request(app).get("/client")
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request(app).get("/client")
                .query({id:"Строка",telegramID:"Строка"})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request(app).get("/client")
                .query({telegramID:"Строка"})
                .expect((res) => {
                    expect(res.body.code).toEqual(400);
                })
                .end(done);

            request(app).get("/client")
                .query({id:-1})
                .expect((res) => {
                    expect(res.body.code).toEqual(404);
                })
                .end(done);

            request(app).get("/client")
                .query({telegramID:-1})
                .expect((res) => {
                    expect(res.body.code).toEqual(404);
                })
                .end(done);
        })

        it('get', function(done) {
            request(app).get("/client")
                .query({id:clientID})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);

            request(app).get("/client")
                .query({telegramID:telegramIDTest})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);

            request(app).get("/client")
                .query({id:clientID, telegramID:telegramIDTest})
                .expect((res) => {
                    expect(res.body.code).toEqual(200);
                })
                .end(done);
        });

    it('wrong one del', function(done) {
        request(app).post("/client.del")
            .query()
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);

        request(app).post("/client.del")
            .query({id:"Строка"})
            .expect((res) => {
                expect(res.body.code).toEqual(400);
            })
            .end(done);
    });

    it('del', function(done) {
        request(app).post("/client.del")
            .query({id:clientID})
            .expect((res) => {
                expect(res.body.code).toEqual(200);
            })
            .end(done);
    });
});