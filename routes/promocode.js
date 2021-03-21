const Router = require('express').Router
const promoCodeController = require('../controllers/promocodeController.js')
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')

router.get("/promocode",validate([
    query('id').isInt().optional(),
    query('codeName').isString().optional()
]), promoCodeController.get)

router.get('/promocode.all', validate([
    query('id').isInt().optional(), 
    query('codeName').isString().optional(),
    query('name').isString().optional(),
    query('discount').isString().optional(),
    query('limitUsing').isInt().optional()
]), promoCodeController.getAll)

module.exports = router