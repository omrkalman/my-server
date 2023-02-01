const Joi = require("joi");
const validate = require("./validate");

const schemaMap = new Map();

schemaMap.set('register', 
    new Joi.object({
        name: Joi.string().required().alphanum().min(2).max(20).trim(),
        email: Joi.string().required().email().trim(),
        password: Joi
            .string()
            .required()
            .pattern
            (new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$"))
            .messages({
                "string.pattern.base": "Password must include uppercase, lowercase, number, and special character. Length 8-20."
            }),
        avatar: Joi.string().trim()
    })
);

schemaMap.set('login', 
    new Joi.object({
        email: Joi.string().required().email().min(5).max(255).trim(),
        password: Joi
            .string()
            .required()
            .regex(
                new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{0,}$")
            )
            .min(3)
            .max(255)
            .messages({
                "string.pattern.base": "password rules",
            }),
    })
);


const validateSchema = (userInput, schema) => {
    return validate(userInput, schemaMap.get(schema));    
}

module.exports = { validateSchema };