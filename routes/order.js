const Router = require('express').Router
const getAll = require('../controllers/orderController.js').getAll
const router = Router()

router.get('/api/order', getAll)

// router.post('/api/server', create)
//
// router.delete('/api/server/:id', remove)

module.exports = router