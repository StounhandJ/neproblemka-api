const promoCode = require('../models/index.js').promoCode
const renderingJson = require('../lib/View').renderingJson


async function get(req, res){
   let promo
    if (req.query.id !== undefined) {
        promo = await promoCode.get_promoCode_id(req.query.id)

    } 
    else if(req.query.codeName !== undefined)
    {
        promo = await promoCode.get_promoCode_code(req.query.codeName)
    }
    else{
        await renderingJson(res, 400)
        return
    }
    await renderingJson(res, JSON.stringify(promo) === JSON.stringify([])?404:200,promo)
}

module.exports = {
    get: get,
    // getAll: getAll,
    // create: create,
    // update: update,
    // del: del
}