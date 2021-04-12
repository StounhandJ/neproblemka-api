const orderModel = require('../models/index.js').orderModel
const typeOfWorkModel = require('../models/index.js').typeOfWorkModel
const documentModel = require("../models/index.js").documentModel
const clientModel = require("../models/index.js").clientModel
const chequeModel = require("../models/index.js").chequeModel
const promoCodeModel = require("../models/index.js").promoCodeModel

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
    const client = await clientModel.get_client_id(data.idClient)
    const typeWork = await typeOfWorkModel.get_typeOfWork_id(data.typeWorkID)
    const document = await documentModel.get_document(data.documentID)
    return {
        id: data.id,
        Client: client,
        description: data.description,
        document: document??null,
        typeWork:typeWork?typeWork.type:null,
        price: data.price,
        promoCodeID: data.promoCodeID,
        otherDiscount: data.otherDiscount,
        separate: data.separate,
        date: data.date,
        stateOfOrder: data.stateOfOrder
    }
}

async function get(req, res){
    const order = await orderModel.get_order(req.query.id)
    await renderingJson(res, order?200:404, order?await makingResponse(order):[])
}


async function getAll(req, res){
    const orders = await orderModel.get_orders(req.query.idClient, req.query.typeWorkID, req.query.stateOfOrder,req.query.offset,req.query.limit)
    let result = []
    if (orders) {
        for (const val of orders) {
            result.push(await makingResponse(val))
        }
    }
    await renderingJson(res, orders?200:404,result)
}


async function create(req, res){
    if (!req.query.documentID) req.query.documentID = (await documentModel.create_document(null,null, req.query.docTelegID)).id
    const typeOfWork = await typeOfWorkModel.get_typeOfWork_type(req.query.typeWork)?? await typeOfWorkModel.create_typeOfWork(req.query.typeWork)
    const order = await orderModel.create_order(req.query.idClient, req.query.description, req.query.documentID, typeOfWork.id, req.query.separate, req.query.promoCodeID??null,req.query.otherDiscount??null)
    await renderingJson(res, order?200:400,order?await makingResponse(order):[])
}

async function priceSet(req, res){
    const order = await orderModel.get_order(req.query.id)
    if (!order) {await renderingJson(res, 404, []); return;}
    let price = req.query.price
    const otherDiscount = order.otherDiscount
    let typeOfCode = 0;
    let discount = 0;
    if (order.promoCodeID){
        const promoCode = await promoCodeModel.get_promoCode_id(order.promoCodeID)
        typeOfCode = promoCode.typeOfCode
        discount = promoCode.discount
    }
    // Скидка от промокода
    price = price - (typeOfCode && discount !== 0?price / 100 * discount : discount*100)
    // Дополнительная скидка
    price = price - (otherDiscount !== 0?price / 100 * otherDiscount : 0)
    if (price>=1000) {
        await orderModel.update_order(req.query.id, null, price)
        order.price = price
        await renderingJson(res, 200,await makingResponse(order))
    }
    else
    {
        await renderingJson(res, 400,[])
    }

}

async function chequeCreate(req, res){
    const order = await orderModel.get_order(req.query.id)
    if (!order) {await renderingJson(res, 404, []); return;}

    await chequeModel.create_cheque(order.id, order.separate?order.price/2:order.price, req.query.secretKey)
    let stateOfOrder;
    if (order.stateOfOrder<11) stateOfOrder = order.separate?2:1
    else stateOfOrder = order.stateOfOrder===12?1:-1;
    await orderModel.update_order(req.query.id, stateOfOrder)
    await renderingJson(res, 200, order.separate?Math.round(order.price/2):order.price)
}

async function chequeCompleted(req, res){
    const cheque = await chequeModel.get_cheque_secretKey(req.query.secretKey)
    if (!cheque) {await renderingJson(res, 404, []); return;}

    const order = await orderModel.get_order(cheque.idOrder)
    let stateOfOrder = -1

    if (order.stateOfOrder===1) stateOfOrder=11
    if (order.stateOfOrder===2) stateOfOrder=12

    order.stateOfOrder = stateOfOrder
    await orderModel.update_order(order.id, stateOfOrder)
    await chequeModel.delete_cheque(cheque.id)

    await renderingJson(res, cheque?200:404, await makingResponse(order))
}

async function pass(req, res){
    await renderingJson(res, 400)
}

async function update(req, res){
    await renderingJson(res, await orderModel.update_order(req.query.id, req.query.stateOfOrder)?200:404, [])
}

async function del(req, res){
    await renderingJson(res, await orderModel.delete_order(req.query.id)?200:404, [])
}

module.exports = {
    get: get,
    getAll: getAll,
    create: create,
    priceSet: priceSet,
    update: update,
    del: del,
    pass: pass,
    chequeCreate: chequeCreate,
    chequeCompleted: chequeCompleted,

    diskStorage: diskStorage
}