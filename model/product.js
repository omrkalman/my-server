const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:       {type:String, required:true},
    price:      {type:Number, required:true},
    desc:       {type:String, required:true},
    img:        {type:String}
});

const Product = mongoose.model("product", productSchema);

const findProductAll = (s=0, l=10) => {
    return Product.find().skip().limit();
}

module.exports = {
    findProductAll
};