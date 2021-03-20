const Router = require('express').Router
const promoCodeController = require('../controllers/promocodeController.js')
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')

router.get("/promocode",validate([
    query('id').isInt()
]), promoCodeController.get)

module.exports = router