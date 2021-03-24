const Sequelize = require("sequelize")
const sequelize = new Sequelize("neproblemka","mysql","mysql",{
    dialect: "mysql",
    host: "localhost",
    operatorsAliases: false
})

module.exports = {
    sequelize: sequelize,
    clientModel: require("./clientModel.js")(sequelize),
    orderModel: require("./orderModel.js")(sequelize),
    promoCodeModel: require("./promoCodeModel.js")(sequelize),
    typeOfWorkModel: require("./typeOfWorkModel.js")(sequelize),
    paymentOrderModel: require("./paymentOrderModel.js")(sequelize),
    documentModel: require("./documentModel.js")(sequelize),
    chequeModel: require("./chequeModel.js")(sequelize)
}