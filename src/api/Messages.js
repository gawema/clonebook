const router = require("express").Router();

// Formidable
const formidable = require("formidable");
// Mongoose
const mongoose = require("mongoose");
// Modals
const User = require("./../models/Users");
// Middlaware
const { isAuthenticated } = require("./../middleware/isAuthenticated");

router.get("/messages", isAuthenticated, (req, res) => {
  const { friendId } = req.query;

  let friend = req.user.friends.find(
    (friend) => friend.id.toString() === friendId
  );

  return res.status(200).send({
    message: "Got messages successfully",
    type: "success",
    messages: friend.chat,
  });
});

module.exports = router;
