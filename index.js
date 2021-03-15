const express = require('express')
const path = require('path')
const requestTime = require('./middlewares.js').requestTime
const logger = require('./middlewares.js').logger
const orderRoutes = require('./routes/order.js')
const clientRoutes = require('./routes/client.js')

// const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

// app.use(requestTime)
// app.use(logger)

app.use(orderRoutes)
app.use(clientRoutes)
console.log()
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})