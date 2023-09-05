const mongoose = require('mongoose');
const DataBaseConnection = async () =>
{
  try{
     const connect = await mongoose.connect( process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: 'majority', j: true, wtimeout: 1000 }
        }
     );
     console.log("Connected To The Database...!!!");
  }
  catch(err)
  {
     console.log(err);
  }
  
};

module.exports = DataBaseConnection ;