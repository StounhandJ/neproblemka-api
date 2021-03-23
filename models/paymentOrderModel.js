const Sequelize = require("sequelize")

class PaymentOrderModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("paymentorder",{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            idOrder: {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            dateEnd: {
                type:Sequelize.INTEGER,
                allowNull: true
            },
            promoCodeID: {
                type:Sequelize.INTEGER,
                allowNull: true
            },
            state:{
                type:Sequelize.TINYINT,
                allowNull: true
            }
        },{
            timestamps: false,
            tableName: "paymentorder"
        })
    }

    static async create_paymentOrder(idOrder, price, promoCodeID=null)
    {
        return await this.model.create({
            idOrder: idOrder,
            price: price,
            promoCodeID: promoCodeID
        }).catch(() => {
            return null
        })
    }

    static async get_paymentOrder(id)
    {
        return await this.model.findOne({
            where: {
                id: id,
                state: 0
            }
        })
    }

    static async get_paymentOrders(idOrder, promoCodeID)
    {
        let data = {}
        if (idOrder!==undefined && idOrder!==null) data["idOrder"] = idOrder
        if (promoCodeID!==undefined && promoCodeID!==null) data["promoCodeID"] = promoCodeID
        const result = Object.values(await this.model.findAll({where: {state:0,...data}, }))
        return result.length<1?null:result;
    }

    // static async update_paymentOrder(id, stateOfOrder)
    // {
    //     let data = {}
    //     if (stateOfOrder!==undefined && stateOfOrder!==null) data["stateOfOrder"] = stateOfOrder
    //
    //     if (data!=={}){
    //         await this.model.update(
    //             data,
    //             { where: { id: id } }
    //         )
    //     }
    // }

    static async delete_paymentOrder(id)
    {
        await this.model.update(
            { state: 1,dateEnd: Date.now()/1000 },
            { where: { id: id } }
        )
    }
}

module.exports = (sequelize)=>{
    PaymentOrderModel.connect(sequelize)
    return PaymentOrderModel
}
