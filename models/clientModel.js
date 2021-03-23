const Sequelize = require("sequelize")

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
        return await this.model.create({
            mail: mail,
            telegramID: telegramID,
            phoneNumber: phoneNumber
        }).catch(() => {
            return null
        })
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

    static async get_client_id(id)
    {
        return await this.model.findOne({
            where:{
                id: id
            }
        })
    }

    static async get_client_telegramID(telegramID)
    {
        return await this.model.findOne({
            where:{
                telegramID: telegramID
            }
        })
    }

    static async get_clients()
    {
        let result = Object.values(await this.model.findAll())
        return result.length<1?null:result;
    }

    static async delete_client(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }
}


module.exports = (sequelize)=> {
    ClientModel.connect(sequelize)
    return ClientModel
}