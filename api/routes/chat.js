const router = require("express").Router();
// Middlaware
const tokenizer =  require('../utils/tokenizer');
const User = require("../models/User");


router.get("/all", tokenizer.verifyToken, async (req, res) => {
  const { friendId } = req.query;
  user_payload = tokenizer.getUserByToken(req);
  user = await User.findById(user_payload._id);

  let friend = user.friends.find(
    (friend) => friend.id.toString() === friendId
  );

  //   console.log(friend);

  return res.status(200).send({
    message: "Got messages successfully",
    type: "success",
    messages: friend.chat,
  });
});

module.exports = router;
