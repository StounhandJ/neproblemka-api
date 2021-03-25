const mainDir = __dirname+"/../"
const fs = require("fs")
const renderingError404 = require('../lib/View').renderingError404
const {directory_store} = require("../config.js")
const documentModel = require("../models/index.js").documentModel
const renderingJson = require('../lib/View').renderingJson

async function download(req, res, next){
    req.url = req.url.substring(req.url.indexOf("/",1),req.url.length)
    fs.stat(`${mainDir}/${directory_store}/${req.url}`, async function(err) {
        if (err==null) {
            res.download(`${mainDir}/${directory_store}/${req.url}`)
        }
        else {
            await renderingError404(null,res,null, "document not found")
        }
    })
}

async function update(req, res, next){
    await renderingJson(res, 200, await documentModel.update_document(req.query.id, req.query.docTelegID)
    )
}

module.exports = {
    download: download,
    update: update
}