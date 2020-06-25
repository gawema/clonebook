import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import isAuthenticated from "./middleware/isAuthenticated";

const mongoose = require("mongoose");

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const app = express();

// Express middleware
app.use(express.json());
app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));

// Mongoose
mongoose.connect(
  "mongodb://localhost:27017/clonebook",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Backend routes
const UsersRoute = require("./api/Users");
const PostsRoute = require("./api/Posts");
const NotificationsRoute = require("./api/Notifications");
const FriendsRoute = require("./api/Friends");
const MessagesRoute = require("./api/Messages");


app.use(UsersRoute);
app.use(PostsRoute);
app.use(NotificationsRoute);
app.use(FriendsRoute);
app.use(MessagesRoute);

// Sapper Middleware
app.use(
  sapper.middleware({
    session: (req, res) => ({
      profile: req.user,
      storePosts: req.posts,
    }),
  })
);

let server = app.listen(PORT, (err) => {
  if (err) console.log("error", err);
  console.log("Server is listening...");
});

// Modals
const User = require("./models/Users");

// sockets
var io = require("socket.io")(server);

let counter = 0;
let connections;

io.on("connection", (socket) => {
  counter++;

  socket.on("privateRoom", (username, friendUsername) => {
    if (username < friendUsername) {
      console.log(username, "-", friendUsername);
      socket.join(`${username}-${friendUsername}`);
    } else {
      socket.join(`${friendUsername}-${username}`);
      console.log(friendUsername, "-", username);
    }
  });

  socket.on("message", async (from, to, message) => {
    console.log(from, to, message);

    message = message.replace(
      ":like:",
      " <img src='/images/like.png' style='display: inline; width: 18px;' alt='like'/>"
    );
    let toUser = await User.findById(to);
    let fromUser = await User.findById(from);

    for (let i = 0; i < toUser.friends.length; i++) {
      if (toUser.friends[i].id.toString() === from) {
        toUser.friends[i].chat = [
          { message: message, isMe: false },
          ...toUser.friends[i].chat,
        ];
        toUser.friends[i].chat = toUser.friends[i].chat.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        break;
      }
    }

    for (let j = 0; j < fromUser.friends.length; j++) {
      if (fromUser.friends[j].id.toString() === to) {
        fromUser.friends[j].chat = [
          { message: message, isMe: true },
          ...fromUser.friends[j].chat,
        ];

        fromUser.friends[j].chat = fromUser.friends[j].chat.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        break;
      }
    }

    toUser.save((err, result) => {
      if (err) {
        console.log(err);
      }

      fromUser.save((err, result) => {
        if (err) {
          console.log(err);
        }

        let roomName;
        if (toUser.username < fromUser.username) {
          roomName = `${toUser.username}-${fromUser.username}`;
        } else {
          roomName = `${fromUser.username}-${toUser.username}`;
        }
        io.in(roomName).emit("privateMessage", {
          from: fromUser._id,
          message: message,
          timestamp: Date.now(),
        });
      });
    });
  });

  socket.on("leaveRoom", (myUsername, friendUsername) => {
    let roomName;
    if (friendUsername < myUsername) {
      roomName = `${friendUsername}-${myUsername}`;
    } else {
      roomName = `${myUsername}-${friendUsername}`;
    }

    socket.leave(roomName);
  });

  socket.on("disconnect", () => {
    console.log("User disconected");
  });
});
