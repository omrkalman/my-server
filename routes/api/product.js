const express = require("express");
const router = express.Router();
const productModel = require("../../model/product");
const onProduct = require("../../validation/onProduct");

/**
 * gets params for page number and
 * number of products to be displayed
 */
router.get('/:page/:amount', async(req, res)=>{
    
    console.log('\tParams:',req.params); 
    
    try {
        const validatedValues = await onProduct.validateSchema(req.params);
        console.log('\tValidated values:',validatedValues);
        
        const { page, amount } = validatedValues;
        const skip = // calculating how many items to skip
        (page-1) * amount;
        
        const products = await productModel.findProductAll(skip, amount);
        
        res.json(products);

    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
})

module.exports = router;