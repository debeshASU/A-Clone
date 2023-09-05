const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        product_url : String,
        product_description : String,
        product_price : Number
    }
);

module.exports = mongoose.model("Products",schema);