const Sequelize = require("sequelize")

class typeOfWorkClass {
    id;
    type;
    state;

    constructor(id, type, state) {
        this.id = id
        this.type = type
        this.state = state
    }
}

class typeOfWorkModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("typeofwork",{
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            type : {
                type:Sequelize.CHAR(255),
                allowNull: false
            },
            state:{
                type:Sequelize.TINYINT,
                allowNull: true,
                default: 0
            }
        },{
            timestamps: false,
            tableName: "typeofwork"
        })
    }

    static async create_typeOfWork(type)
    {
        return await this.#create_class(await this.model.create({
            type: type
        }))
    }

    static async get_typeOfWork_id(id)
    {
        return await this.#create_class(await this.model.findOne({
            where:{
                id: id
            }
        }))
    }


    static async get_typeOfWork_type(type)
    {
        return await this.#create_class(await this.model.findOne({
            where:{
                type: type
            }
        }))
    }

    static async get_typeOfWorks()
    {
        let result = []
        for (const val of Object.values(await this.model.findAll())) {
            result.push(await this.#create_class(val));
        }
        return result;
    }

    static async update_typeOfWork(id, type)
    {
        let data = {}
        if (type!==undefined && type!==null) data["type"] = type
        if (data!=={}){
            await this.model.update(
                data,
                { where: { id: id } }
            )
        }
    }

    static async delete_typeOfWork(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }

    static async #create_class(data)
    {
        return data?new typeOfWorkClass(data.id, data.type, data.state):null
    }
}


module.exports = {
    typeOfWorkModel: (sequelize)=>{
        typeOfWorkModel.connect(sequelize)
        return typeOfWorkModel
    },
    typeOfWorkClass: typeOfWorkClass
}