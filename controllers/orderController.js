const orderModel = require('../models/index.js').orderModel
const typeOfWorkModel = require('../models/index.js').typeOfWorkModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data){
    data.typeWork = (await typeOfWorkModel.get_typeOfWork_id(data.typeWorkID)).type
    delete data.typeWorkID
    return data
}

async function get(req, res){
    const order = await orderModel.get_order(req.query.id)
    if (JSON.stringify(order) === JSON.stringify([]))
    {
        await renderingJson(res, 404,order)
        return
    }
    await makingResponse(order)
    await renderingJson(res, 200,order)
}


async function getAll(req, res){
    const orders = await orderModel.get_orders(req.query.idClient, req.query.typeWorkID, req.query.stateOfOrder)
    if (JSON.stringify(orders) === JSON.stringify([]))
    {
        await renderingJson(res, 404,orders)
        return
    }
    for (const val of orders) {
        await makingResponse(val)
    }
    await renderingJson(res, 200,orders)
}


async function create(req, res){
    const order = await orderModel.create_order(req.query.idClient, req.query.description, req.query.documentID, req.query.typeWorkID, req.query.stateOfOrder)
    await renderingJson(res, JSON.stringify(order) === JSON.stringify([])?400:200,order)
}

async function update(req, res){
    await renderingJson(res, 200, await orderModel.update_order(req.query.id, req.query.stateOfOrder))
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