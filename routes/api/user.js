const express = require("express");
const router = express.Router();

const userModel = require("../../model/user");
const onUser = require("../../validation/onUser");
const ResponseError = require("../../module/ResponseError");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");

router.post("/register", async (req, res)=>{
    try {
        // get proper values
        // may throw an error
        const validatedValues = await onUser.validateSchema(
            req.body,
            'register'
        );
        console.log('\tValidated values:',validatedValues);
        // check db for the email from these values
        const userData = await userModel.findUserByEmail(validatedValues.email);
        console.log('\tuserData:',userData);
        if (userData) {
            // if found, throw an error
            throw new ResponseError("db", ["Email already exists."]);
        }
        // not found, adding the user
        //Encrypt password
        validatedValues.password = await bcrypt.createHash(validatedValues.password);
        userModel.addNewUser(validatedValues);

        res.send("You have registered successfully.");
    } catch(error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

router.post("/login", async(req,res)=>{
    try {
        // get proper values
        // may throw an error
        const validatedValues = await onUser.validateSchema(
            req.body,
            'login'
        );

        const userData = await userModel.findUserByEmail(validatedValues.email);
        if (!userData) {
            throw new ResponseError("db", ["Invalid email or password."]);
        }

        const isPasswordCorrect = await bcrypt.cmpHash(validatedValues.password, userData.password);
        if (!isPasswordCorrect) {
            throw new ResponseError("db", ["Invalid email or password."]);
        }

        const token = await jwt.generateToken({ id: userData._id });
        res.json({ token });
    
    } catch(error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

module.exports = router;