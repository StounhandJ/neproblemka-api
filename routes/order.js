const Router = require('express').Router
const orderController = require('../controllers/orderController.js')
const validate = require("../lib/Validation")
const { query } = require('express-validator')
const router = Router()
const multer  = require('multer')
let upload = multer({ storage:orderController.diskStorage })

router.get('/order', validate([
    query('id').isInt()
]), orderController.get)

router.get('/order.all', validate([
    query('idClient').isInt().optional(),
    query('typeWorkID').isInt().optional(),
    query('stateOfOrder').isInt().optional(),
    query('offset').isInt().optional(),
    query('limit').isInt().optional(),
]), orderController.getAll)

router.post('/order.create', validate([
    query('idClient').isInt(),
    query('description').isString(),
    query('typeWork').isString(),
    query('promoCodeID').isInt().optional(),
    query('otherDiscount').isInt(),
    query('separate').isInt(),
    query('docTelegID').isString().optional(),
]), upload.any(), orderController.create)

router.post('/order.priceSet', validate([
    query('id').isInt(),
    query('price').isInt()
]), orderController.priceSet)

router.post('/order.chequeCreate', validate([
    query('id').isInt(),
    query('secretKey').isString(),
]), orderController.chequeCreate)

router.post('/order.payment', validate([
    query('id').isInt(),
]), orderController.payment)

router.post('/order.chequeCompleted', validate([
    query('secretKey').isString(),
]), orderController.chequeCompleted)

// router.post('/order.update', validate([
//     query('id').isInt(),
//     query('stateOfOrder').isInt()
// ]), orderController.update)

router.post('/order.del', validate([
    query('id').isInt()
]), orderController.del)

module.exports = router