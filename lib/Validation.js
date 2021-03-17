const { validationResult} = require('express-validator');
const renderingJson = require('../lib/View').renderingJson

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        await renderingJson(res, 400);
    };
};

module.exports = validate