const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users.js');
const userRoute = express.Router();
const bcrypt = require('bcrypt');

// login
userRoute.post("/login", async (req,res)=>
{
   const{email,password} = req.body;
   try{
    const user = await Users.findOne({email});
    if(!user)
    {
        return res.json({success: false, message:"Email is not registered with us...!!!"});
    }
    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword)
    {
        return res.json({success:false, message:"Incorrect password...!!!"});
    }
    const token = await jwt.sign({user_id : user._id},process.env.SECRET_CODE);
    res.status(200).json({success : true, token,id : user._id , email : user.email, message : "Loggedin successfully...!!!"});

   }
   catch(err)
   {
    res.json(err);
   }
});


// register
userRoute.post("/register", async (req,res)=>
{
   const{email,password} = req.body;
   console.log(email,password);
   try{
   const user = await Users.findOne({email});
   console.log(user);
   if( user )
   {
     return res.json({ message : "Email is already registered with us...!!!! Try a new one...!!!" });
   }
   const hashedPassword = await bcrypt.hash(password,10);
   const response = await Users.create({ email, password:hashedPassword });
   res.status(200).json({success : true, message : "Registered successfully...!!!"});

   }
   catch(err)
   {
    res.json(err);
   }
});

// adding products to order
userRoute.post("/order", async (req, res) => {
  const { email, products, totalPrice } = req.body;  // Extract totalPrice from the request payload

  console.log(email,products,totalPrice);

  try {
      const user = await Users.findOne({email});
      console.log(user);
      // adding products and totalPrice to the orders array of the user
      const response = await user.updateOne({
          $push: {
              "orders": {
                  products: products,   // Push products list
                  totalPrice: totalPrice   // Push totalPrice for the order
              }
          }
      });
      console.log(response);

      res.json({ message: 'Order added successfully!' });

  } catch (err) {
      res.json(err);
  }
});


// adding and updating shipping address
userRoute.post("/address", async (req, res) => {
  const { address, email } = req.body;
  try {
    const response = await Users.updateOne({ email }, { address: address });
    console.log(response);
    res.json({ message: "Shipping address added...!!!" });
  } catch (err) {
    res.json(err);
  }
});


// getting orders history
userRoute.get("/order", async (req,res) =>
{
  const email = req.query.email;
    try{
     const user = await Users.findOne({email});
     return res.json({orders : user.orders, address: user.address});
    }
    catch(err)
    {
      res.json(err);
    }
} );


module.exports = userRoute;