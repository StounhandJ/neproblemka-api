const promoCode = require('../models/index.js').promoCodeModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data) {
    return {
        id: data.id,
        name: data.name,
        code: data.code,
        codeName: data.codeName,
        discount: data.discount,
        typeOfCode: data.typeOfCode,
        limitUsing: data.limitUsing,
        state: data.state
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
    await renderingJson(res, promo ? 200 : 404, promo? await makingResponse(promo):[])
}

async function getAll(req, res) {
    const promos = await promoCode.get_promoCodes(req.query.typeOfCode, req.query.limitUsing)
    let result = []
    if (promos) {
        for (const val of promos) {
            result.push(await makingResponse(val))
        }
    }
    await renderingJson(res, promos ? 200 : 400, result) 
}
async function create(req, res) {
    let promo = await promoCode.create_promoCode(req.query.name, req.query.codeName, req.query.discount, req.query.typeOfCode, req.query.limitUsing)
   await renderingJson(res, promo ? 400 : 200, promo? await makingResponse(promo):[])
}

async function create(req, res){
    let promo = await promoCode.create_promoCode(req.query.name, req.query.codeName, req.query.discount, req.query.typeOfCode, req.query.limitUsing)
    await renderingJson(res, promo ? 200 : 400, promo? await makingResponse(promo):[])
}

async function update(req, res) {
    await renderingJson(res, 200, await promoCode.update_promoCode(req.query.id, req.query.name, req.query.codeName, req.query.discount, req.query.typeOfCode, req.query.limitUsing))
}

async function del(req, res) {
    await renderingJson(res, 200, await promoCode.delete_promoCode(req.query.id))
}

module.exports = {
    get: get,
    getAll: getAll,
    create: create,
    update: update,
    del: del
}