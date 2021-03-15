// import all from "./clientModel.js"
const Sequelize = require("sequelize")
const sequelize = new Sequelize("neproblemka","mysql","mysql",{
    dialect: "mysql",
    host: "localhost",
    operatorsAliases: false
})

const client = require("./clientModel.js")(sequelize)
// export default require("./clientModel.js")(sequelize)

// module.exports = client
module.exports = {
    sequelize: sequelize,
    clientModel: client
}