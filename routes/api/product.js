const express = require("express");
const router = express.Router();
const productModel = require("../../model/product");
const onProduct = require("../../validation/onProduct");
const upload = require('../../config/multer');

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
});


// Route for adding new products
router.post('/', upload.single("avatar"), async(req, res) => {
    try {
        const validatedValues = await onProduct.validateSchema(
            req.body, 
            'add new'
        );
        await productModel.insertNewProduct({
            ...validatedValues,
            img: req.file?.filename
        });
        // res.json({ msg: "Success" });
        res.redirect("http://localhost:3000/#product");
    } catch(error) {
        console.log(error);
    }
});

router.delete("/:id", async(req, res)=> {
    try {
        const validatedValues = await onProduct.validateSchema(
            req.params, 
            'delete'
        );
        await productModel.removeProduct(validatedValues.id);
        res.json({ msg: "Success" });
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;