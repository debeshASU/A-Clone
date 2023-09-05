const express = require('express');
const productRoute = express.Router();
const Products = require('../Models/Products.js');

productRoute.post("/", async (req,res) =>
{
   const {product_url,product_description,product_price} = req.body;
   try{
      const response = await Products.create({product_url,product_description,product_price});
      res.json("product created...!!!");
   }
   catch(err)
   {
    res.json(err);
   }
} );

productRoute.get("/", async (req,res) =>
{
   try{
    const response = await Products.find();
    res.json(response);
   }
   catch(err)
   {
    res.json(err);
   }
});

module.exports = productRoute ;