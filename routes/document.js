const Router = require('express').Router
const documentController = require("../controllers/documentController.js")
const router = Router()
const validate = require("../lib/Validation")
const { query } = require('express-validator')

router.get("/download/*", documentController.download)

router.post("/document.update", validate([
    query('id').isInt(),
    query('docTelegID').isString()
]), documentController.update)


module.exports = router