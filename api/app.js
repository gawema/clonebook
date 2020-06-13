const express = require("express");
const cors = require('cors')
const mondodb = require('mongodb')
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

const app = express();
const mongoClient = mondodb.MongoClient

// MIDDLEWARE
app.use(cors())
app.use(express.json()) // alternative to body-parser
app.use('/users', userRoute);
app.use('/posts', postRoute);

// CONNECT TO DB
const mongoUrl = "mongodb://localhost:27017"
global.db = ''
mongoClient.connect(mongoUrl, {useUnifiedTopology:true},(err,res) => {
	if(err){console.log("database error"); return}
	db = res.db("clonebook")
	console.log("database listening...")
})

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
