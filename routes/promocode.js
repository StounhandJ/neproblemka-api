const Router = require('express').Router
const promoCodeController = require('../controllers/promoCodeController.js')
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
    query('discount').isInt().optional(),
    query('limitUsing').isInt().optional()
]), promoCodeController.getAll)

router.get('/promocode.create', validate([
    query('name').isString(),
    query('codeName').isString(),
    query('discount').isInt(),
    query('typeOfCode').isInt(),
    query('limitUsing').isInt()   
]), promoCodeController.create)

router.get('/promocode.update', validate([
    query('id').isInt(),
    query('name').isString().optional(),
    query('codeName').isString().optional(),
    query('discount').isInt().optional(),
    query('typeOfCode').isInt().optional(),
    query('limitUsing').isInt().optional() 

]), promoCodeController.update)

router.get('/promocode.del',  validate([
    query('id').isInt()
]), promoCodeController.del)

module.exports = router