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
    PaymentOrderModel: require("./paymentOrderModel.js")(sequelize),
    DocumentModel: require("./documentModel.js")(sequelize)
}