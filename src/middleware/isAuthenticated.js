const jwt = require("jsonwebtoken");

const User = require("./../models/Users.js");
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ response: "Not authorized" });
  }

  const data = jwt.verify(token.replace("Bearer ", ""), "cloneBook");
  if (!data) {
    return res.status(401).send({ response: "Not authorized" });
  }
  User.findOne({ username: data.username }, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong", type: "error" });
    }

    if (result === null) {
      return res
        .status(401)
        .send({ message: "User not authorized!", type: "error" });
    }

    req.user = result;
    next();
  });

};

module.exports = { isAuthenticated };
