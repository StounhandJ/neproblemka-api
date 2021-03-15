const Router = require('express').Router
const getAll = require('../controllers/clientCntroller.js').getAll
const router = Router()

router.get('/api/client', getAll)

// router.post('/api/server', create)
//
// router.delete('/api/server/:id', remove)

module.exports = router