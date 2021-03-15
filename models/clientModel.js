const Sequelize = require("sequelize")

class clientModel{
    id
    mail
    telegramID
    phoneNumber
    state
    constructor(id, mail, telegramID, phoneNumber, state)
    {
        this.id = id
        this.mail = mail
        this.telegramID = telegramID
        this.phoneNumber = phoneNumber
        this.state = state
    }

    save(){console.log("save")}
}

class Model{
    static model

    static test(sequelize){
        this.model = sequelize.define("client",{
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            mail : {
                type:Sequelize.CHAR(255),
                allowNull: false
            },
            telegramID : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            phoneNumber : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            state:{
                type:Sequelize.TINYINT,
                allowNull: true,
                default: 0
            }
        },{
            timestamps: false,
            tableName: "clients"
        })
    }

    static async get_user(id)
    {
        const response = await this.model.findOne({
            where:{
                id: id
            }
        })
        return new clientModel(response.id, response.mail, response.telegramID, response.phoneNumber, response.state)
    }
}


module.exports = (sequelize) =>{
    Model.test(sequelize)
    return Model
}