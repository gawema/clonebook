const router = require("express").Router();

// Formidable
const formidable = require("formidable");
// Mongoose
const mongoose = require("mongoose");
// Modals
const User = require("./../models/Users");
// Middlaware
const { isAuthenticated } = require("./../middleware/isAuthenticated");

router.get("/friends", isAuthenticated, (req, res) => {
  return res
    .status(200)
    .send({
      message: "Got friends successfully",
      type: "success",
      friends: req.user.friends,
    });
});

router.get("/friends/remove", isAuthenticated, (req, res) => {
  const { friendId } = req.query;

  User.findOneAndUpdate(
    { _id: friendId },
    { $pull: { friends: { id: req.user._id } } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Something went wrong when saving data!",
          type: "error",
        });
      }

      User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { friends: { id: friendId } } },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Something went wrong when saving data!",
              type: "error",
            });
          }

          return res.status(200).send({
            message: "Friend removed!",
            type: "success",
          });
        }
      );
    }
  );
});
module.exports = router;
