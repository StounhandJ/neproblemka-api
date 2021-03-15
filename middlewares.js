const colors = require('colors')

exports.requestTime = (req, res, next) => {
    req.requestTime = Date.now()
    next()
}

exports.logger = (req, res, next) => {
    console.log(colors.bgGreen.black(`Req.time: ${req.requestTime}`))
    next()
}
