const Sequelize = require("sequelize")

class promoCodeModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("promocodes",{
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name : {
                type:Sequelize.CHAR(255),
                allowNull: false
            },
            code : {
                type:Sequelize.CHAR(255),
                allowNull: false,
                unique: true
            },
            discount : {
                type:Sequelize.INTEGER,
                allowNull: false
            },
            typeOfCode : {
                type:Sequelize.TINYINT,
                allowNull: false
            },
            limitUsing : {
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

    static async create_promoCode(name, code, discount, typeOfCode, limitUsing)
    {
        return await this.model.create({
            name: name,
            code: code,
            discount: discount,
            typeOfCode: typeOfCode,
            limitUsing: limitUsing
        }).catch(() => {
            return null
        })
    }

    static async get_promoCode_id(id)
    {
        return await this.model.findOne({
            where:{
                id: id
            }
        })
    }


    static async get_promoCode_code(code)
    {
        return await this.model.findOne({
            where:{
                code: code
            }
        })
    }

    static async get_promoCodes(typeOfCode=null, limitUsing=null)
    {
        let data = {}
        if (typeOfCode!==undefined && typeOfCode!==null) data["typeOfCode"] = typeOfCode
        if (limitUsing!==undefined && limitUsing!==null) data["limitUsing"] = limitUsing
        const result = Object.values(await this.model.findAll({where: {state:0,...data}}))
        return result.length<1?null:result;
    }

    static async update_promoCode(id, name, code, discount, typeOfCode, limitUsing)
    {
        let data = {}
        if (name!==undefined && name!==null) data["name"] = name
        if (code!==undefined && code!==null) data["code"] = code
        if (discount!==undefined && discount!==null) data["discount"] = discount
        if (typeOfCode!==undefined && typeOfCode!==null) data["typeOfCode"] = typeOfCode
        if (limitUsing!==undefined && limitUsing!==null) data["limitUsing"] = limitUsing
        if (data!=={}){
            await this.model.update(
                data,
                { where: { id: id } }
            )
        }
    }

    static async delete_promoCode(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }
}


module.exports = (sequelize)=>{
        promoCodeModel.connect(sequelize)
        return promoCodeModel
    }