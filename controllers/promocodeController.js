const promoCode = require('../models/index.js').promoCodeModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data) {
    return {
        id: data.id,
        name: data.name,
        codeName: data.codeName,
        discount: data.discount,
        typeOfCode: data.typeOfCode,
        limitUsing: data.limitUsing,
        typeWork: (await typeOfWorkModel.get_typeOfWorkModel_id(data.typeWorkID)).type,
    }
}
async function get(req, res) {
    let promo
    if (req.query.id !== undefined) {
        promo = await promoCode.get_promoCode_id(req.query.id)

    }
    else if (req.query.codeName !== undefined) {
        promo = await promoCode.get_promoCode_code(req.query.codeName)
    }
    else {
        await renderingJson(res, 400)
        return
    }
    await renderingJson(res, promo ? 404 : 200, promo? await makingResponse(promo):[])
}

async function getAll(req, res) {
    const promos = await promoCode.get_promoCodes(req.query.getAll)
    await renderingJson(res, promos ? 404 : 200, promo? await makingResponse(promos):[])
}
async function create(req, res) {
    const promo = await promoCode.create_promoCode(req.query.name, req.query.codeName, req.query.discount, req.query.typeOfCode, req.query.limitUsing)
    await renderingJson(res, promo ? 400 : 200, promo? await makingResponse(promo):[])

async function getAll(req, res){
    let promos = await promoCode.get_promoCodes(req.query.getAll)
    await renderingJson(res, promo ? 200 : 404, promo? await makingResponse(promo):[])
}

async function create(req, res){
    let promos = await promoCode.create_promoCode(req.query.name, req.query.codeName, req.query.discount, req.query.typeOfCode, req.query.limitUsing)
    await renderingJson(res, promo ? 404 : 200, promo? await makingResponse(promo):[])
}

async function update(req, res) {
    await renderingJson(res, 200, await promoCode.update_promoCode(req.query.id, req.query.name, req.query.codeName, req.query.discount, req.query.typeOfCode, req.query.limitUsing))
}

async function del(req, res) {
    await renderingJson(res, 200, await promoCode.delete_promoCode(req.query.id))
}
}
module.exports = {
    get: get,
    getAll: getAll,
    create: create,
    update: update,
    del: del
}