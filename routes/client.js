const Router = require('express').Router
const clientController = require('../controllers/clientController.js')
const router = Router()

router.get('/client.get/:id', clientController.get)

router.get('/client.getall', clientController.getAll)

router.post('/client.create', clientController.getAll)

// router.post('/api/server', create)
//
// router.delete('/api/server/:id', remove)

module.exports = router