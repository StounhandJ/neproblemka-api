const Sequelize = require("sequelize")

class OrderClass{
    id
    idClient
    description
    document
    typeWorkID
    stateOfOrder
    state

    #example
    constructor(id, idClient, description, document,typeWorkID,stateOfOrder, state, example)
    {
        this.id = id
        this.idClient = idClient
        this.description = description
        this.document = document
        this.typeWorkID = typeWorkID
        this.stateOfOrder = stateOfOrder
        this.state = state
        this.#example = example
    }

    async delete()
    {
        this.state = 1
        await OrderModel.SequelizeUpdateAll(this.#example, {state: this.state})
    }

    async save(){
        await OrderModel.SequelizeUpdateAll(this.#example, {
            idClient: this.idClient,
            description: this.description,
            typeWorkID: this.typeWorkID,
            stateOfOrder: this.stateOfOrder
        })
    }
}

class OrderModel{
    static model

    static test(sequelize){
        this.model = sequelize.define("client",{
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
            document : {
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
            timestamps: false,
            tableName: "orders"
        })
    }

    static async SequelizeUpdateAll(sequelize, data)
    {
        if (data["idClient"]!==undefined) sequelize.idClient = data["idClient"]
        if (data["description"]!==undefined) sequelize.description = data["description"]
        if (data["document"]!==undefined) sequelize.document = data["document"]
        if (data["typeWorkID"]!==undefined) sequelize.typeWorkID = data["typeWorkID"]
        if (data["stateOfOrder"]!==undefined) sequelize.stateOfOrder = data["stateOfOrder"]
        if (data["state"]!==undefined) sequelize.state = data["state"]
        await sequelize.save()
    }

    static async create_order(idClient, description, typeWorkID, stateOfOrder)
    {
        return this.#create_class(await this.model.create({
            idClient: idClient,
            description: description,
            typeWorkID: typeWorkID,
            stateOfOrder: stateOfOrder
        }))
    }

    static async get_order(id)
    {
        return this.#create_class(await this.model.findOne({
            where:{
                id: id
            }
        }))
    }

    static async #create_class(data)
    {
        return data?new OrderClass(data.id, data.idClient, data.description, data.document,data.typeWorkID,data.stateOfOrder, data.state, data):null
    }
}


module.exports = {
    OrderModel: (sequelize)=>{
        OrderModel.test(sequelize)
        return OrderModel
    },
    OrderClass: OrderClass
}