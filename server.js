const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());


// Method 1 : Just intialize the port directly
// const port= 3000;

// Method 2 : Export port number from .env file
const port = process.env.PORT || 3000;
const connection_string = process.env.CONNECTION_STRING;


// Method 1 : Just initialize the routes directly
// app.get('/index',(req,res)=>{
//     res.send("Hello World");
// })

// Method 2 : Export routes from route file 
//  app.use('/api/product',require("./routes/productRoutes"));
 app.use('/api/product',require("./routes/productRoutes"));
 app.use('/api/user',require("./routes/userRoutes"));
 
//     res.send("Hello World");
// })


mongoose.connect(connection_string).then(() =>
{
    app.listen(port,()=>{
        console.log(`Node API is running on port ${port}`);
    })
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})