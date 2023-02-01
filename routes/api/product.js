const express = require("express");
const router = express.Router();
const productModel = require("../../model/product");

/**
 * gets params for page number and
 * number of products to be displayed
 * TODO: validate the params before passing to model 
 */
router.get('/:page/:perpage', async(req, res)=>{
     
    try {
        const skip = (page-1)*perpage;// calculating how many items to skip
        const products = await productModel.findProductAll(skip, perpage);
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
})

module.exports = router;