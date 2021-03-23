const chequeModel = require('../models/index.js').chequeModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data){
    return {
        id: data.id,
        idPaymentOrder: data.idPaymentOrder,
        amount: data.amount,
        date: data.date,
        secretKey: data.secretKey
    }
}

async function get(req, res) {
    if (req.query.id===undefined && req.query.secretKey===undefined){
        await renderingJson(res, 400)
        return
    }
    const cheque = req.query.id===undefined? await chequeModel.get_cheque_id(req.query.id):await chequeModel.get_cheque_secretKey(req.query.secretKey)
    await renderingJson(res, cheque?200:404, cheque?await makingResponse(cheque):[])
}

async function getAll(req, res){
    const cheques = await chequeModel.get_cheques(req.query.id, req.query.active??0)
    let result = []
    if (cheques) {
        for (const val of cheques) {
            result.push(await makingResponse(val))
        }
    }
    await renderingJson(res, cheques?200:404, result)
}

async function create(req, res){
    const client = await chequeModel.create_cheque(req.query.idPaymentOrder, req.query.amount, req.query.secretKey)
    await renderingJson(res, client?200:400,client?await makingResponse(client):[])
}


async function del(req, res){
    await renderingJson(res, 200, await chequeModel.delete_cheque(req.query.id))
}

module.exports = {
    get: get,
    create: create,
    del: del
}