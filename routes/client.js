const Router = require('express').Router
const clientController = require('../controllers/clientController.js')
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')


router.get('/client', validate([
    query('id').isInt()
]),
    clientController.get)


router.get('/client.all', clientController.getAll)


router.post('/client.create',validate([
    query('mail').isString().optional(),
    query('telegramID').isInt().optional(),
    query('phoneNumber').isNumeric({no_symbols: true, locale: "ru-RU"}).optional()
]),
    clientController.create)

router.post('/client.update',validate([
        query('id').isInt(),
        query('mail').isString().optional(),
        query('telegramID').isInt().optional(),
        query('phoneNumber').isNumeric({no_symbols: true, locale: "ru-RU"}).optional()
    ]),
    clientController.update)

router.post('/client.del', validate([
        query('id').isInt()
    ]),
    clientController.del)

// router.post('/api/server', create)
//
// router.delete('/api/server/:id', remove)

module.exports = router