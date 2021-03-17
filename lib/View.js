const mesStatusCode = require('../config').mesStatusCode


async function renderingJson(response,code ,data){
    response.status(200).json({
        code:code,
        mes:mesStatusCode[code],
        data:data===null? []: data
    })
}

module.exports ={
    renderingJson: renderingJson
}