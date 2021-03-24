const mesStatusCode = require('../config').mesStatusCode


async function renderingJson(response,code ,data){
    response.status(200).json({
        code:code,
        mes:mesStatusCode[code],
        data:data===null? []: data
    })
}

async function renderingError404(req, response, next,mes=null){
    response.send(`${mes??"page not found"} <b>404</b><br>by StounhandJ`)
}

module.exports ={
    renderingJson: renderingJson,
    renderingError404: renderingError404
}