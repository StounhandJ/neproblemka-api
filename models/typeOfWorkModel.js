const Sequelize = require("sequelize")

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
        return await this.model.create({
            type: type
        })
    }

    static async get_typeOfWork_id(id)
    {
        return await this.model.findOne({
            where:{
                id: id,
                state:0
            }
        })
    }


    static async get_typeOfWork_type(type)
    {
        return await this.model.findOne({
            where:{
                type: type,
                state:0
            }
        })
    }

    static async get_typeOfWorks()
    {
        const result = Object.values(await this.model.findAll())
        return result.length<1?null:result;
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

}


module.exports = (sequelize)=>{
        typeOfWorkModel.connect(sequelize)
        return typeOfWorkModel
    }