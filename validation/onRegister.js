const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(20).alphanum().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string()
        .pattern
        (new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$"))
        .required()
        .messages({
            "string.pattern.base": "Password must include uppercase, lowercase, number, and special character. Length 8-20."
        }),
    avatar: Joi.string().trim()
});

const validateSchema = (userInput) => {
    return validate(userInput, registerSchema);
}

module.exports = { validateSchema };