// import all from "./clientModel.js"
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
}