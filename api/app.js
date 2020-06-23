const express = require("express");
const cors = require('cors')
const mondodb = require('mongodb')
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

const app = express();
const mongoClient = mondodb.MongoClient
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(cors())
app.use(express.json()) // alternative to body-parser
app.use('/users', userRoute);
app.use('/posts', postRoute);


//CONNECT TO DB WITH MONGOOSE
// Mongoose
mongoose.connect(
    "mongodb://localhost:27017/sveltebook",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }
  );

// CONNECT TO DB

// STARTING SERVER
app.listen(3000, err => {
    if(err){console.log("Server cant listen ..."); return}
    console.log("Server listening ....")
})

// CHECK IF ERROR,SO NOT CRASHING
process.on("uncaughtException", (err, data) => {
    if(err){console.log("Critical error, yet system keeps running")}
    return
})
