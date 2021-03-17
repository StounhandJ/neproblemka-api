const Router = require('express').Router
const clientController = require('../controllers/clientController.js')
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')


router.get('/client.get', validate([
    query('id').isInt()
]), clientController.get)

router.get('/client.getall', clientController.getAll)

router.post('/client.create', clientController.getAll)

// router.post('/api/server', create)
//
// router.delete('/api/server/:id', remove)

module.exports = router