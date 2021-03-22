const Sequelize = require("sequelize")

class OrderModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("order",{
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            idClient : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            description : {
                type:Sequelize.TEXT,
                allowNull: false
            },
            documentID : {
                type:Sequelize.INTEGER,
                allowNull: true,
                default: null
            },
            typeWorkID : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            stateOfOrder : {
                type:Sequelize.INTEGER,
                allowNull: false
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

    static async create_order(idClient, description, documentID, typeWorkID, stateOfOrder)
    {
        return await this.model.create({
            idClient: idClient,
            description: description,
            documentID: documentID,
            typeWorkID: typeWorkID,
            stateOfOrder: stateOfOrder
        }).catch(() => {
            return null
        })
    }

    static async get_order(id)
    {
        return await this.model.findOne({
            where: {
                id: id
            }
        })
    }

    static async get_orders(idClient, typeWorkID, stateOfOrder)
    {
        let data = {}
        if (idClient!==undefined && idClient!==null) data["idClient"] = idClient
        if (typeWorkID!==undefined && typeWorkID!==null) data["typeWorkID"] = typeWorkID
        if (stateOfOrder!==undefined && stateOfOrder!==null) data["stateOfOrder"] = stateOfOrder
        const result = Object.values(await this.model.findAll({where: data}))
        return result.length<1?null:result;
    }

    static async update_order(id, stateOfOrder)
    {
        let data = {}
        if (stateOfOrder!==undefined && stateOfOrder!==null) data["stateOfOrder"] = stateOfOrder

        if (data!=={}){
            await this.model.update(
                data,
                { where: { id: id } }
            )
        }
    }

    static async delete_order(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }
}

module.exports = (sequelize)=>{
    OrderModel.connect(sequelize)
    return OrderModel
}
