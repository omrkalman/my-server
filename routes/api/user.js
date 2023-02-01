const express = require("express");
const router = express.Router();

const userModel = require("../../model/user");
const onRegister = require("../../validation/onRegister");
const ResponseError = require("../../utility/ResponseError");

router.post("/register", async (req, res)=>{
    try {
        // get proper values
        // may throw an error
        const validatedValues = await onRegister.validateSchema(
            req.body
        );
        console.log('\tValidated values:',validatedValues);
        // check db for the email from these values
        const userData = await userModel.findUserByEmail(validatedValues.email);
        console.log('\tuserData:',userData);
        if (userData) {
            // if found, throw an error
            throw new ResponseError("db", ["Email already exists."]);
        } else {
            // if not found, adding the user
            userModel.addNewUser(validatedValues);
        }
    } catch(error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

module.exports = router;