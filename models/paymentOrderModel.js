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
            otherDiscount: {
                type:Sequelize.INTEGER,
                defaultValue: "0",
                allowNull: false
            },
            separate:{
                type:Sequelize.TINYINT,
                allowNull: false
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

    static async create_paymentOrder(idOrder, price, separate, promoCodeID=null, otherDiscount=null)
    {
        let data = {
            idOrder: idOrder,
            price: price,
            separate: separate
        }
        if (promoCodeID!==undefined && promoCodeID!==null) data["promoCodeID"] = promoCodeID
        if (otherDiscount!==undefined && otherDiscount!==null) data["otherDiscount"] = otherDiscount
        return await this.model.create(data).catch(() => {
            return null
        })
    }

    static async get_paymentOrder(idOrder)
    {
        return await this.model.findOne({
            where: {
                idOrder: idOrder,
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

    static async update_paymentOrder(id, price)
    {
        await this.model.update(
            {price: price},
            { where: { id: id } }
        )
    }

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
