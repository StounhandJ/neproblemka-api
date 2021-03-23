const orderModel = require('../models/index.js').orderModel
const typeOfWorkModel = require('../models/index.js').typeOfWorkModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data){
    const typeWork = await typeOfWorkModel.get_typeOfWork_id(data.typeWorkID)
    return {
        id: data.id,
        idClient: data.idClient,
        description: data.description,
        document: data.document??null,
        typeWork:typeWork?typeWork.type:null,
        stateOfOrder: data.stateOfOrder
    }
}

async function get(req, res){
    const order = await orderModel.get_order(req.query.id)
    await renderingJson(res, order?200:404, order?await makingResponse(order):[])
}


async function getAll(req, res){
    const orders = await orderModel.get_orders(req.query.idClient, req.query.typeWorkID, req.query.stateOfOrder)
    let result = []
    if (orders) {
        for (const val of orders) {
            result.push(await makingResponse(val))
        }
    }
    await renderingJson(res, orders?200:404,result)
}


async function create(req, res){
    const order = await orderModel.create_order(req.query.idClient, req.query.description, req.query.documentID, req.query.typeWorkID, req.query.stateOfOrder)
    await renderingJson(res, order?200:400,order?await makingResponse(order):[])
}

async function update(req, res){
    await renderingJson(res, 200, await makingResponse(await orderModel.update_order(req.query.id, req.query.stateOfOrder)))
}

async function del(req, res){
    await renderingJson(res, 200, await orderModel.delete_order(req.query.id))
}

module.exports = {
    get: get,
    getAll: getAll,
    create: create,
    update: update,
    del: del
}