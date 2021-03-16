const Sequelize = require("sequelize")

class ClientClass{
    id;
    mail;
    telegramID;
    phoneNumber;
    state;

    #example;
    constructor(id, mail, telegramID, phoneNumber, state, example)
    {
        this.id = id
        this.mail = mail
        this.telegramID = telegramID
        this.phoneNumber = phoneNumber
        this.state = state
        this.#example = example
    }

    async delete()
    {
        this.state = 1
        await ClientModel.SequelizeUpdateAll(this.#example, {state: this.state})
    }

    async save(){
        await ClientModel.SequelizeUpdateAll(this.#example, {
            id: this.id,
            mail: this.mail,
            telegramID: this.telegramID,
            phoneNumber: this.phoneNumber,
            state: this.state,
        })
    }
}

class ClientModel{
    static model

    static connect(sequelize){
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

    static async SequelizeUpdateAll(sequelize, data)
    {
        if (data["mail"]!==undefined) sequelize.mail = data["mail"]
        if (data["telegramID"]!==undefined) sequelize.telegramID = data["telegramID"]
        if (data["phoneNumber"]!==undefined) sequelize.phoneNumber = data["phoneNumber"]
        if (data["state"]!==undefined) sequelize.state = data["state"]
        await sequelize.save()
    }

    static async create_client(mail, telegramID, phoneNumber)
    {
        return this.#create_class(await this.model.create({
            mail: mail,
            telegramID: telegramID,
            phoneNumber: phoneNumber
        }))
    }


    static async get_client(id)
    {
        return this.#create_class(await this.model.findOne({
            where:{
                id: id
            }
        }))
    }

    static async delete_client(id)
    {
        const client = this.#create_class(await this.get_client(id))
        if (client!==null)await client.delete()
        return client
    }

    static async #create_class(data)
    {
        return data?new ClientClass(data.id, data.mail, data.telegramID, data.phoneNumber, data.state, data):null
    }
}


module.exports = {
    ClientModel: (sequelize)=>{
        ClientModel.connect(sequelize)
        return ClientModel
    },
    ClientClass: ClientClass
}