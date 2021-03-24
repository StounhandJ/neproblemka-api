const mainDir = __dirname+"/../"
const fs = require("fs")
const renderingJson = require('../lib/View').renderingJson


async function download(req, res){
    console.log(req.urlencoded)
    let path = ""
    let mas = req.url.split('/')
    delete mas[0]
    delete mas[1]
    mas.forEach((val)=>{
        path+=val!==""?val+"/":""
    })
    path = path.substring(0, path.length - 1)
    console.log(mainDir + '/public/'+path)
    fs.stat(mainDir + '/public/'+path, async function(err) {
        if (err==null) {
            res.download(mainDir + '/public/'+path)
        }
        else {
            await renderingJson(res, 404)
        }
    })
}


module.exports = {
    download: download
}