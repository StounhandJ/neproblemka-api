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
    const cheque = req.query.id===undefined? await chequeModel.get_cheque_secretKey(req.query.secretKey): await chequeModel.get_cheque_id(req.query.id)
    await renderingJson(res, cheque?200:404, cheque?await makingResponse(cheque):[])
}

async function del(req, res){
    const cheque = await chequeModel.delete_cheque(req.query.id)
    await renderingJson(res, cheque?200:400,cheque?await makingResponse(cheque):[])
}

module.exports = {
    get: get,
    del: del
}