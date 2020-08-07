const express      = require('express')
        multer     = require('multer'),
        bodyParser = require('body-parser'),
        jwt        = require('jsonwebtoken'),
        CORS       = require('cors'),
        mongoose   = require("mongoose"),
    employeeRoutes = require('./routes/employee'),
    authRoutes     = require("./routes/auth")
        port       = process.env.PORT || 4000; 
        app        = express();

require("dotenv").config();


// for cross origin request
app.use(CORS())
app.use("/uploads",express.static("uploads"));
app.use(bodyParser.json());



// all routes
app.use(authRoutes);
app.use(employeeRoutes);




//  404 error Handler
app.use((req,res,next) => {

    let error = new Error("Not found");
    error.status = 404 ;
    next(error);

})


// global error handler
app.use((err,req,res,next) => {

    if(err.message === "jwt malformed") {

        err.message = "Invalid jwt token";
    }

    if(err.message === "Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/"){
        err.message = "Network Error"
    }

    return res.status( err.status || 500).json({
        message:err.message || "Oops Something went wrong"

    })
})



// connecting to the database
mongoose.connect(process.env.dbUrl , {useUnifiedTopology:true , useNewUrlParser:true})
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at ${port} `)
    })
})
.catch(()=>{
    console.log("Something went wrong");
})