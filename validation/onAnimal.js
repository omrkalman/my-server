const Joi = require("joi");
const validate = require("./validate");

const animalSchemaPOST = Joi.object({
    species: Joi
        .string()   
        .required()
        .alphanum()
        .min(2)
        .max(42)
        .trim()
        .message("Species name mustn't exceed 42 letters."),
    age: Joi
        .number()
        .integer()
        .min(0)
        .max(4543000000) //age of earth
        .required(),
    name: Joi
        .string()
        .required()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .message("Name mustn't exceed 20 letters.")
});

const animalSchemaGET = Joi.object({
    species: Joi
        .string()   
        .allow("")
        .min(2)
        .max(42)
        .alphanum()
        .trim()
        .message("Species name mustn't exceed 42 letters."),
    age: Joi
        .number()
        .allow("")
        .integer()
        .min(0)
        .max(4543000000), //age of earth
    name: Joi
        .string()
        .allow("")
        .alphanum()
        .min(2)
        .max(20)
        .trim()
});

/**
 * 
 * @param {Object} userInput The inputs to validate
 * @param {string} method The schema wanted
 * @returns 
 */
const validateSchema = (userInput, schema) => {
    if (schema == 'GET') {
        return validate(userInput, animalSchemaGET);
    } else if (schema == 'POST') {
        return validate(userInput, animalSchemaPOST);
    }
}

module.exports = { validateSchema };