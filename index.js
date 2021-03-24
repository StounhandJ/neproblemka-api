const express = require('express')
const path = require('path')
const requestTime = require('./middlewares.js').requestTime
const logger = require('./middlewares.js').logger
const orderRoutes = require('./routes/order.js')
const clientRoutes = require('./routes/client.js')
const promoCodesRoutes = require('./routes/promocode.js')
const paymentOrderRoutes = require('./routes/paymentOrder.js')
const chequeRoutes = require('./routes/cheque.js')
const documentController = require("./controllers/documentController.js")
const renderingError404 = require("./lib/View.js").renderingError404

// const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

// app.use(requestTime)
// app.use(logger)

app.use(orderRoutes)
app.use(clientRoutes)
app.use(promoCodesRoutes)
app.use(paymentOrderRoutes)
app.use(chequeRoutes)

app.get("/download/*",documentController.download)
app.use(renderingError404)

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})