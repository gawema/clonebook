const router = require("express").Router();

// JWT
const jwt = require("jsonwebtoken");
// Formidable
const formidable = require("formidable");
// Mongoose
const mongoose = require("mongoose");
// Modals
const User = require("./../models/Users");
// Middlaware
const { isAuthenticated } = require("./../middleware/isAuthenticated");

router.get("/users/session", isAuthenticated, (req, res) => {
  if (!req.user) {
    return res.status(404).send({ type: "error" });
  }

  return res.status(200).send({ type: "success" });
});

router.get("/users/search", isAuthenticated, (req, res) => {
  const { searchItem } = req.query;
  console.log(searchItem);

  User.find(
    {
      $or: [
        { username: { $regex: ".*" + searchItem + ".*" } },
        { firstName: { $regex: ".*" + searchItem + ".*" } },
        { lastName: { $regex: ".*" + searchItem + ".*" } },
      ],
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: "Something went wrong.", type: "error" });
      }

      return res.status(200).send({ result: result, type: "success" });
    }
  );
});

router.get("/profile", isAuthenticated, (req, res) => {
  return res.status(200).send({ user: req.user });
});

router.post("/users/login", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Something went wrong with formidable!",
        type: "error",
      });
    }

    if (!fields.username || !fields.password) {
      return res.status(500).send({
        message: "Missing fields!",
        type: "error",
      });
    }

    const token = jwt.sign(
      {
        username: fields.username,
      },
      "cloneBook"
    );

    User.findOneAndUpdate(
      { username: fields.username },
      { token: token },
      (err, result) => {
        if (err) {
          return res.status(500).send({
            message: "Something went wrong!",
            type: "error",
          });
        }

        if (result === null) {
          return res.status(404).send({
            message: "User can't be found.",
            type: "error",
          });
        }
        // console.log(token);
        console.log(result);
        return res.status(200).send({
          message: "Logged in successfully!",
          type: "success",
          token: token,
          user: result,
        });
      }
    );
  });
});

router.post("/users/signup", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Something went wrong with formidable!",
        type: "error",
      });
    }

    if (
      !fields.firstName ||
      !fields.lastName ||
      !fields.username ||
      !fields.password ||
      !fields.repeatPassword
    ) {
      return res.status(500).send({
        message: "Missing fields!",
        type: "error",
      });
    }

    if (fields.password !== fields.repeatPassword) {
      return res.status(500).send({
        message: "Passwords do not match!",
        type: "error",
      });
    }

    User.findOne({ username: fields.username }, (err, result) => {
      if (err) {
        return res.status(500).send({
          message: "Something went wrong!",
          type: "error",
        });
      }

      if (result !== null) {
        return res.status(500).send({
          message: "Username already exists!",
          type: "error",
        });
      }

      let userId = new mongoose.Types.ObjectId();
      const user = new User({
        _id: userId,
        firstName: fields.firstName,
        lastName: fields.lastName,
        username: fields.username,
        password: fields.password,
        public_json: {
          id: userId,
          firstName: fields.firstName,
          lastName: fields.lastName,
          username: fields.username,
          photo: "/images/profile/default.jpg",
          status: 0,
        },
      });
      user.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: "Something went wrong when saving data!",
            type: "error",
          });
        }
        // console.log(result);
        return res
          .status(200)
          .send({ message: "Registered successfully!", type: "success" });
      });
    });
  });
});

module.exports = router;
