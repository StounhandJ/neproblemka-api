const Sequelize = require("sequelize")

class DocumentModel{
    static model

    static connect(sequelize){
        this.model = sequelize.define("documents",{
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            path: {
                type:Sequelize.CHAR(255),
                allowNull: true
            },
            pathDisk: {
                type:Sequelize.CHAR(255),
                allowNull: true
            },
            documentTelegramId: {
                type:Sequelize.CHAR(255),
                allowNull: true
            },
            state:{
                type:Sequelize.TINYINT,
                allowNull: true
            }
        },{
            timestamps: false
        })
    }

    static async create_document(path, pathDisk, documentTelegramId)
    {
        return await this.model.create({
            path: path,
            pathDisk: pathDisk,
            documentTelegramId: documentTelegramId
        }).catch(() => {
            return null
        })
    }

    static async get_document(id)
    {
        return await this.model.findOne({
            where: {
                id: id??null,
                state: 0
            },
            attributes:{exclude:["state"]}
        })
    }

    static async get_documents()
    {
        const result = Object.values(await this.model.findAll({where: {state:0}, }))
        return result.length<1?null:result;
    }

    static async update_document(id, documentTelegramId)
    {
        let data = {}
        if (documentTelegramId!==undefined && documentTelegramId!==null) data["documentTelegramId"] = documentTelegramId

        if (data!=={}){
            await this.model.update(
                data,
                { where: { id: id } }
            )
        }
    }

    static async delete_document(id)
    {
        await this.model.update(
            { state: 1 },
            { where: { id: id } }
        )
    }
}

module.exports = (sequelize)=>{
    DocumentModel.connect(sequelize)
    return DocumentModel
}
