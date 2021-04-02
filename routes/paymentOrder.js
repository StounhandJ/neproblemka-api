const Router = require('express').Router
const paymentOrderController = require('../controllers/paymentOrderController.js')
const validate = require("../lib/Validation")
const { query } = require('express-validator')
const router = Router()

router.get('/paymentOrder', validate([
    query('id').isInt()
]), paymentOrderController.get)

router.get('/paymentOrder.all', validate([
    query('idOrder').isInt().optional(),
    query('promoCodeID').isInt().optional()
]), paymentOrderController.getAll)

router.post('/paymentOrder.del', validate([
    query('id').isInt()
]), paymentOrderController.del)
module.exports = router