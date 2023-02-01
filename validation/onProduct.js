const Joi = require("joi");
const validate = require("./validate");

const schemaMap = new Map();

schemaMap.set('default', 
    new Joi.object({
        page: Joi.number().min(1),
        amount: Joi.number().min(1).max(50)
    })
);


const validateSchema = (productQuery, schema='default') => {
    return validate(productQuery, schemaMap.get(schema));    
}

module.exports = { validateSchema };