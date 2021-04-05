const Sequelize = require("sequelize")

class chequeModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("cheque",{
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            idOrder  : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            amount : {
                type:Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            date : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            secretKey : {
                type:Sequelize.CHAR(255),
                allowNull: false
            },
            state:{
                type:Sequelize.TINYINT,
                allowNull: true
            }
        },{
            timestamps: false,
            tableName: "cheque"
        })
    }

    static async create_cheque(idOrder, amount, secretKey)
    {
        return await this.model.create({
            idOrder: idOrder,
            amount: amount,
            secretKey: secretKey,
            date: Date.now()/1000
        }).catch(() => {
            return null
        })
    }

    static async get_cheque_id(id)
    {
        return await this.model.findOne({
            where:{
                id: id
            }
        })
    }


    static async get_cheque_secretKey(secretKey)
    {
        return await this.model.findOne({
            where:{
                secretKey: secretKey
            }
        })
    }

    static async get_cheques(id, active)
    {
        let data = {}
        if (id!==undefined && id!==null) data["id"] = id
        if (active!==undefined && active!==null) data["active"] = active
        const result = Object.values(await this.model.findAll({where: {state:0,...data}}))
        return result.length<1?null:result;
    }

    static async delete_cheque(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }
}


module.exports = (sequelize)=>{
    chequeModel.connect(sequelize)
    return chequeModel
}