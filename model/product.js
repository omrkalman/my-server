const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:       {type:String, required:true},
    price:      {type:Number, required:true},
    desc:       {type:String},
    img:        {type:String}
});

const Product = mongoose.model("product", productSchema);

const findProductAll = (s=0, l=4) => {
    return Product.find().skip(s).limit(l);
}

const insertNewProduct = (productData) => {
    const newProduct = new Product(productData);
    return newProduct.save();
}

const removeProduct = (id) => {
    return Product.findByIdAndRemove(id);
};

module.exports = {
    findProductAll,
    insertNewProduct,
    removeProduct
};