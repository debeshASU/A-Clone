const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_url: String,
    product_description: String,
    product_price: Number
});

const orderSchema = new mongoose.Schema({
    products: [productSchema],
    totalPrice: Number
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    address: String,
    cartItems: [productSchema],
    orders: [orderSchema]
});

module.exports = mongoose.model("Users", userSchema);
