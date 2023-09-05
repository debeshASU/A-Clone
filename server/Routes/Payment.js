const express = require('express');
const stripe = require('stripe')("sk_test_51NdcGsBEO9MfV35MVS526e6UOV6uZ5j0Q6RplVnAQH6QdbZnZnPpF7L6QSTyi54SJvaDO9R17McaizYVwGDUZIJ200nFy7m7PI");
const paymentRoute = express.Router();

paymentRoute.post("/card",async (req,res) =>
{
  const{ transaction_id,amount } = req.body;
   try{
    const payment = await stripe.paymentIntents.create({
        amount,
        currency : "USD",
        description : "payment for amazon-clone products",
        payment_method : transaction_id,
        confirm : true,
        payment_method_types: ['card']
     });
     res.json({message : "Payment Successful...!!!", success : true});

   }
   catch(err)
   {
    res.json({message : "Payment Failed...!!!", success : false});
   }
});

module.exports = paymentRoute;