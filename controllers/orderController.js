const orderModel = require('../models/index.js').orderModel
const typeOfWorkModel = require('../models/index.js').typeOfWorkModel
const documentModel = require("../models/index.js").documentModel
const renderingJson = require('../lib/View').renderingJson
const multer  = require('multer')
const mkdir = require('mkdirp')
const mainDir = __dirname+"/.."
const {directory_store} = require("../config.js")


diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(`${mainDir}/${directory_store}/orderDocument`)
        cb(null, `${mainDir}/${directory_store}/orderDocument`)
    },
    filename: async function (req, file, cb) {
        mkdir(`${mainDir}/${directory_store}/orderDocument/${req.query.idClient}`)
        const doc = await documentModel.create_document(`orderDocument/${req.query.idClient}/${file.originalname}`,null,req.query.docTelegID)
        req.query.documentID = doc?doc.id:null
        cb(null, `${req.query.idClient}/${file.originalname}`)
    }
})

async function makingResponse(data){
    const typeWork = await typeOfWorkModel.get_typeOfWork_id(data.typeWorkID)
    const document = await documentModel.get_document(data.documentID)
    return {
        id: data.id,
        idClient: data.idClient,
        description: data.description,
        document: document??null,
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
    const typeOfWork = await typeOfWorkModel.get_typeOfWork_type(req.query.typeWork)?? await typeOfWorkModel.create_typeOfWork(req.query.typeWork)
    const order = await orderModel.create_order(req.query.idClient, req.query.description, req.query.documentID, typeOfWork.id, req.query.stateOfOrder)
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
    del: del,

    diskStorage: diskStorage
}