const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const friendRoute = require('./routes/friend');
const chatRoute = require('./routes/chat');

const app = express();

// MIDDLEWARE
app.use(cors())
app.use(express.json()) // alternative to body-parser
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/friends', friendRoute);
app.use('/chats', chatRoute);


//CONNECT TO DB WITH MONGOOSE
mongoose.connect(
    "mongodb://localhost:27017/sveltebook",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }
  );


// STARTING SERVER
app.listen(3000, err => {
    if(err){console.log("Server cant listen ..."); return}
    console.log("Server listening ....")
})

// CHECK IF ERROR,SO NOT CRASHING
process.on("uncaughtException", (err, data) => {
    if(err){console.log(err)}
    return
})
