const Sequelize = require("sequelize")

class ClientClass {
    id;
    mail;
    telegramID;
    phoneNumber;
    state;

    constructor(id, mail, telegramID, phoneNumber, state) {
        this.id = id
        this.mail = mail
        this.telegramID = telegramID
        this.phoneNumber = phoneNumber
        this.state = state
    }
}

class ClientModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("clients",{
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            mail : {
                type:Sequelize.CHAR(255),
                allowNull: true
            },
            telegramID : {
                type:Sequelize.INTEGER,
                allowNull: true
            },
            phoneNumber : {
                type:Sequelize.INTEGER,
                allowNull: true
            },
            state:{
                type:Sequelize.TINYINT,
                allowNull: true,
                default: 0
            }
        },{
            timestamps: false
        })
    }

    static async create_client(mail, telegramID, phoneNumber)
    {
        return await this.#create_class(await this.model.create({
            mail: mail,
            telegramID: telegramID,
            phoneNumber: phoneNumber
        }).catch(() => {
            return []
        }))
    }

    static async update_client(id, mail, telegramID, phoneNumber)
    {
        let data = {}
        if (mail!==undefined && mail!==null) data["mail"] = mail
        if (telegramID!==undefined && telegramID!==null) data["telegramID"] = telegramID
        if (phoneNumber!==undefined && phoneNumber!==null) data["phoneNumber"] = phoneNumber

        if (data!=={}){
            await this.model.update(
                data,
                { where: { id: id } }
            )
        }
    }

    static async get_client(id)
    {
        return await this.#create_class(await this.model.findOne({
            where:{
                id: id
            }
        }))
    }

    static async get_clients()
    {
        let result = []
        for (const val of Object.values(await this.model.findAll())) {
            result.push(await this.#create_class(val));
        }
        return result;
    }

    static async delete_client(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }

    static async #create_class(data)
    {
        return data?new ClientClass(data.id, data.mail, data.telegramID, data.phoneNumber, data.state):null
    }
}


module.exports = {
    ClientModel: (sequelize)=>{
        ClientModel.connect(sequelize)
        return ClientModel
    },
    ClientClass: ClientClass
}