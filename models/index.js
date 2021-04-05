const Sequelize = require("sequelize")
const {DB_login, DB_password, DB_name, DB_host} = require("../config.js")
const sequelize = new Sequelize(DB_name,DB_login,DB_password,{
    dialect: "mysql",
    host: DB_host,
    operatorsAliases: false,
    logging: false
})

module.exports = {
    sequelize: sequelize,
    clientModel: require("./clientModel.js")(sequelize),
    orderModel: require("./orderModel.js")(sequelize),
    promoCodeModel: require("./promoCodeModel.js")(sequelize),
    typeOfWorkModel: require("./typeOfWorkModel.js")(sequelize),
    documentModel: require("./documentModel.js")(sequelize),
    chequeModel: require("./chequeModel.js")(sequelize)
}