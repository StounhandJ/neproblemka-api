const clientModel = require('../models/index.js').clientModel
const renderingJson = require('../lib/View').renderingJson

async function makingResponse(data){
    return {
        id: data.id,
        mail: data.mail,
        telegramID: data.telegramID,
        phoneNumber: data.phoneNumber
    }
}

async function get(req, res) {
    if (!req.query.id && !req.query.telegramID){
        await renderingJson(res, 400)
        return
    }
    const client = req.query.telegramID===undefined? await clientModel.get_client_id(req.query.id):await clientModel.get_client_telegramID(req.query.telegramID)
    await renderingJson(res, client?200:404, client?await makingResponse(client):[])
}


async function getAll(req, res){
    const clients = await clientModel.get_clients()
    let result = []
    if (clients) {
        for (const val of clients) {
            result.push(await makingResponse(val))
        }
    }
    await renderingJson(res, clients?200:404, result)
}


async function create(req, res){
    let client = null
    if (req.query.mail || req.query.telegramID || req.query.phoneNumber) {
        client = await clientModel.create_client(req.query.mail, req.query.telegramID, req.query.phoneNumber)
    }
    await renderingJson(res, client?200:400,client?await makingResponse(client):[])
}

async function update(req, res){
    let updateSuccess = null
    if (req.query.mail || req.query.telegramID || req.query.phoneNumber) {
        updateSuccess = await clientModel.update_client(req.query.id, req.query.mail, req.query.telegramID, req.query.phoneNumber)
    }
    await renderingJson(res, updateSuccess?200:updateSuccess===0?304:400)
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