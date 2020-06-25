const router = require("express").Router();

// Formidable
const formidable = require("formidable");
// Mongoose
const mongoose = require("mongoose");
// Modals
const User = require("./../models/Users");
// Middlaware
const { isAuthenticated } = require("./../middleware/isAuthenticated");

router.get("/notifications", isAuthenticated, async (req, res) => {
  return res.status(200).send({
    notifications: req.user.notifications.sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  });
});

router.get("/notifications/accept", isAuthenticated, (req, res) => {
  const { friendId } = req.query;

  User.findOneAndUpdate(
    { _id: friendId, "friends.id": req.user._id },
    { $set: { "friends.$.friendshipStatus": "accept" } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Something went wrong when saving data!",
          type: "error",
        });
      }

      User.findOneAndUpdate(
        { _id: req.user._id, "friends.id": friendId },
        { $set: { "friends.$.friendshipStatus": "accept" } },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Something went wrong when saving data!",
              type: "error",
            });
          }
          return res.status(200).send({
            message: "Friendship not accepted",
            type: "success",
          });
        }
      );
    }
  );
});

router.get("/notifications/decline", isAuthenticated, (req, res) => {
  const { friendId } = req.query;

  User.findOneAndUpdate(
    { _id: friendId, "friends.id": req.user._id },
    { $set: { "friends.$.friendshipStatus": "decline" } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Something went wrong when saving data!",
          type: "error",
        });
      }

      User.findOneAndUpdate(
        { _id: req.user._id, "friends.id": friendId },
        { $set: { "friends.$.friendshipStatus": "decline" } },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Something went wrong when saving data!",
              type: "error",
            });
          }

          return res.status(200).send({
            message: "Friendship not accepted",
            type: "success",
          });
        }
      );
    }
  );
});

router.get("/notifications/add", isAuthenticated, async (req, res) => {
  const { type, friendId } = req.query;

  if (type === "request") {
    // we add the notifications to the friendId
    let friend = await User.findById(friendId);
    let currentUser = await User.findById(req.user._id);

    let checkFriend = currentUser.friends.find((friend) => {
      friend._id === friendId;
    });

    let notificationFriendExist = friend.notifications.find(
      (notif) =>
        notif.type === "request" &&
        notif.user.id.toString() === req.user._id.toString()
    );

    let notificationUserExist = req.user.notifications.find(
      (notif) =>
        notif.type === "request" && notif.user.id.toString() === friendId
    );


    if (checkFriend) {
      // check if the notification is already there in both users
      // if it is then we need to update, otherwise insert
      return res.status(500).send({
        message: "You already have this friend.",
        type: "error",
      });
    }

    friend.notifications.push({
      _id: new mongoose.Types.ObjectId(),
      type: type,
      body: "Has sent you a request",
      user: { ...req.user.public_json },
    });

    friend.friends.push({
      id: mongoose.Types.ObjectId(req.user._id),
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      username: req.user.username,
      photo: req.user.photo,
      status: req.user.status,
      friendshipStatus: "pending",
    });

    currentUser.friends.push({
      id: mongoose.Types.ObjectId(friend._id),
      firstName: friend.firstName,
      lastName: friend.lastName,
      username: friend.username,
      photo: friend.photo,
      status: friend.status,
      friendshipStatus: "pending",
    });

    friend.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Something went wrong when saving data!",
          type: "error",
        });
      }
      // we add the friend to the req.user

      currentUser.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: "Something went wrong when saving data!",
            type: "error",
          });
        }

        return res.status(200).send({
          message: "Friend added!",
          type: "success",
          friend: {
            id: friend._id,
            firstName: friend.firstName,
            lastName: friend.lastName,
            username: friend.username,
            photo: friend.photo,
            status: friend.status,
            friendshipStatus: "pending",
          },
        });
      });
    });
  }
});

module.exports = router;
