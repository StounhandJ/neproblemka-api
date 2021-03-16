const clientModel = require('../models/index.js').clientModel

async function getAll(req, res){
    // const user = await clientModel.create_client("FFFF",543,34634)
    // const user = await clientModel.get_client(1)
    const user = await clientModel.get_client(2)

    await user.delete()
    // console.log(user)
    res.status(200).json([{id:342,name:"FF",date:2342234}])
}

async function get(req, res){
    // const user = await clientModel.create_client("FFFF",543,34634)
    // const user = await clientModel.get_client(1)
    // const user = await clientModel.get_client(2)
    //
    // await user.delete()
    console.log(req.params.header)
    res.status(200).json([{id:342,name:"FF",date:2342234}])
}


async function create(req, res){
    // const user = await clientModel.create_client("FFFF",543,34634)
    // const user = await clientModel.get_client(1)
    const user = await clientModel.get_client(2)

    await user.delete()
    // console.log(user)
    res.status(200).json([{id:342,name:"FF",date:2342234}])
}

module.exports = {
    getAll: getAll,
    get: get,
    create: create,
}