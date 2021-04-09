const Router = require('express').Router
const chequeController = require('../controllers/chequeController.js')
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')


router.get('/cheque', validate([
        query('id').isInt().optional(),
        query('secretKey').isString().optional()
    ]),
    chequeController.get)


router.post('/cheque.del', validate([
        query('id').isInt()
    ]),
    chequeController.del)

module.exports = router