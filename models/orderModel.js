import Sequelize from "sequelize"

module.exports = function (sequelize){
    return sequelize.define("order",{
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    })
}


// import {aModel} from "./aModel"
//
// class orderModelClass extends aModel{
//     id
//     idClient
//     description
//     document
//     typeWorkId
//     stateOfOrder
//     state
//     _update = false
//     _table = "orders"
//
//     save(){
//         console.log("F")
//     }
// }
//
// const orderModel = new orderModelClass()
//
// export default orderModel