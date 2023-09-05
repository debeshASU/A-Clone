const express = require('express');
require('dotenv').config();
const DataBaseConnection = require('./DataBase/DataBaseConnection.js');
DataBaseConnection();
const app = express();
const cors = require('cors');
const productRoute = require('./Routes/ProductRoute.js');
const userRoute = require('./Routes/UsersRoute.js');
const paymentRoute = require('./Routes/Payment.js');

app.use(express.json());
app.use(cors());

app.get("/", async (req,res) =>
{
   try{
     res.json({message: "Get Request"});
   }
   catch(err)
   {
     res.json(err);
   }
});

app.use("/products",productRoute);
app.use("/users",userRoute);
app.use("/payment",paymentRoute);

app.listen( 4000, () =>
{
    console.log(`Server started at ${process.env.PORT_DATABASE}`);
} )