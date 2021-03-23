const Router = require('express').Router
const clientController = require('../controllers/clientController.js')
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')


router.get('/cheque', validate([
        query('id').isInt().optional(),
        query('secretKey').isString().optional()
    ]),
    clientController.get)

router.get('/cheque.all', validate([
        query('idPaymentOrder').isInt(),
        query('active').isInt().optional() //Дефолтно 0
    ]),
    clientController.getAll)


router.post('/cheque.create',validate([
        query('idPaymentOrder').isInt(),
        query('amount').isInt(),
        query('secretKey').isString()
    ]),
    clientController.create)


router.post('/cheque.del', validate([
        query('id').isInt()
    ]),
    clientController.del)

module.exports = router