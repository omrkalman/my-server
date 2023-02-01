const Joi = require("joi");
const validate = require("./validate");

const schemaMap = new Map();

schemaMap.set('add new',
    new Joi.object({
    species: Joi.string()   
        .required()
        .min(2).max(42)
        .alphanum().trim()
        .message("Species name mustn't exceed 42 letters."),
    age: Joi.number()
        .required()
        .integer()
        .min(0).max(4543000000), //age of earth
    name: Joi.string()
        .required()
        .min(2).max(20)
        .alphanum().trim()
        .message("Name mustn't exceed 20 letters.")
    })
);

schemaMap.set('find',
    new Joi.object({
    species: Joi.string()
        .min(2).max(42)
        .alphanum().trim()
        .message("Species name mustn't exceed 42 letters."),
    age: Joi.number()
        .integer()
        .min(0).max(4543000000), //age of earth
    name: Joi.string()
        .min(2).max(20)
        .alphanum().trim()
    })
);

/**
 * 
 * @param {Object} userInput The inputs to validate
 * @param {string} method The schema wanted
 * @returns 
 */
const validateSchema = (userInput, schema) => {
    return validate(userInput, schemaMap.get(schema));
}

module.exports = { validateSchema };