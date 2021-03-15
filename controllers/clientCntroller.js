const clientModel = require('../models/index.js').clientModel


exports.getAll = async (req, res) => {
    const user = await clientModel.get_user(1)
    console.log(user)
    res.status(200).json([{id:342,name:"FF",date:2342234}])
}