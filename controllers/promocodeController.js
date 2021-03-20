const promoCode = require('../models/index.js').promoCode
const renderingJson = require('../lib/View').renderingJson


async function get(req, res){
    const promo = await promoCode.get_promoCode_id(req.query.id)
    await renderingJson(res, JSON.stringify(promo) === JSON.stringify([])?404:200,promo)
}

module.exports = {
    get: get,
    // getAll: getAll,
    // create: create,
    // update: update,
    // del: del
}