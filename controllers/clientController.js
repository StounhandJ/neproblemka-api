const clientModel = require('../models/index.js').clientModel
const renderingJson = require('../lib/View').renderingJson

async function get(req, res) {
    const client = await clientModel.get_client(req.query.id)
    await renderingJson(res, JSON.stringify(client) === JSON.stringify([])?200:404, client)
}


async function getAll(req, res){
    const clients = await clientModel.get_clients()
    await renderingJson(res, JSON.stringify(clients) === JSON.stringify([])?200:404, clients)
}


async function create(req, res){
    await renderingJson(res, 200, await clientModel.create_client(req.query.mail, req.query.telegramID, req.query.phoneNumber))
}

async function update(req, res){
    await renderingJson(res, 200, await clientModel.update_client(req.query.id, req.query.mail, req.query.telegramID, req.query.phoneNumber))
}

async function del(req, res){
    await renderingJson(res, 200, await clientModel.delete_client(req.query.id))
}

module.exports = {
    getAll: getAll,
    get: get,
    create: create,
    update: update,
    del: del
}