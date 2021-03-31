const paymentOrderModel = require('../models/index.js').paymentOrderModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data){
    return {
        id: data.id,
        idOrder : data.idOrder,
        price: data.price,
        dateEnd: data.dateEnd??null,
        promoCodeID : data.promoCodeID??null,
        otherDiscount : data.otherDiscount??null,
    }
}

async function get(req, res){
    const paymentOrder = await paymentOrderModel.get_paymentOrder(req.query.id)
    await renderingJson(res, paymentOrder?200:404, paymentOrder?await makingResponse(paymentOrder):[])
}


async function getAll(req, res){
    const paymentOrder = await paymentOrderModel.get_paymentOrders(req.query.idOrder, req.query.promoCodeID)
    let result = []
    if (paymentOrder) {
        for (const val of paymentOrder) {
            result.push(await makingResponse(val))
        }
    }
    await renderingJson(res, paymentOrder?200:404,result)
}


async function create(req, res){
    const paymentOrder = await paymentOrderModel.create_paymentOrder(req.query.idOrder, req.query.price, req.query.promoCodeID??null,req.query.otherDiscount??null)
    await renderingJson(res, paymentOrder?200:400,paymentOrder?await makingResponse(paymentOrder):[])
}


async function del(req, res){
    await renderingJson(res, 200, await paymentOrderModel.delete_paymentOrder(req.query.id))
}

module.exports = {
    get: get,
    getAll: getAll,
    create: create,
    del: del
}