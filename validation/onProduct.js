const Joi = require("joi");
const validate = require("./validate");

const schemaMap = new Map();

schemaMap.set('get', 
    new Joi.object({
        page: Joi.number().min(1),
        amount: Joi.number().min(1).max(50)
    })
);

schemaMap.set('add new', 
    new Joi.object({
        name: Joi.string()
            .required()
            .min(2).max(63)
            .trim()
            .message("Name mustn't exceed 40 letters."),
        price: Joi.number().required().min(0.01),
        desc: Joi.string()
            .max(100)
            .trim()
            .message("Description mustn't exceed 100 letters.")
    })
);

schemaMap.set('delete', 
    new Joi.object({
        id: Joi.string().required().hex().trim().length(24)
    })
);


const validateSchema = (productQuery, schema='get') => {
    return validate(productQuery, schemaMap.get(schema));    
}

module.exports = { validateSchema };