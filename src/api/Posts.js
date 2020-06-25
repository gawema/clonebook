const router = require("express").Router();

// Formidable
const formidable = require("formidable");
// Mongoose
const mongoose = require("mongoose");
// Modals
const User = require("./../models/Users");
// Middlaware
const { isAuthenticated } = require("./../middleware/isAuthenticated");
// Utils
const path = require("path");
const fs = require("fs");

router.get("/posts/likes", isAuthenticated, async (req, res) => {
  const { postId, userId } = req.query;

  let currentUser = await User.findOne({
    _id: userId,
  });
  let likes;

  for (let i = 0; i < currentUser.posts.length; i++) {
    if (currentUser.posts[i]._id.toString() === postId) {
      likes = currentUser.posts[i].likes;
    }
  }

  return res.status(200).send({ message: "Get likes", type: "success", likes });
});

router.post("/posts/likes", isAuthenticated, async (req, res) => {
  const form = formidable({ multiples: true });
  // we need the post id and the user object

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Something went wrong with formidable!",
        type: "error",
      });
    }
    let user = JSON.parse(fields.user);
    // we want to get the likes for the post
    let currentUser = await User.findOne({
      _id: user.id,
    });
    for (let i = 0; i < currentUser.posts.length; i++) {
      if (currentUser.posts[i]._id.toString() === fields.postId) {
        if (currentUser.posts[i].likes.length > 0) {
          for (let j = 0; j < currentUser.posts[i].likes.length; j++) {
            let myLike = currentUser.posts[i].likes.find(
              (item) => item.id.toString() === req.user._id.toString()
            );

            if (myLike) {
              currentUser.posts[i].likes = currentUser.posts[i].likes.filter(
                (user) => user.id.toString() !== req.user._id.toString()
              );
              break;
            } else {
              currentUser.posts[i].likes = [
                ...currentUser.posts[i].likes,
                req.user.public_json,
              ];
              // send notification to the currentUser

              currentUser.notifications = [
                {
                  _id: new mongoose.Types.ObjectId(),
                  type: "like",
                  body: "Has liked your post",
                  user: { ...req.user.public_json },
                },
                ...currentUser.notifications,
              ];
              break;
            }
          }
        } else {
          console.log("add new like");
          currentUser.posts[i].likes.push(req.user.public_json);
          currentUser.notifications.push({
            _id: new mongoose.Types.ObjectId(),
            type: "like",
            body: "Has liked your post",
            user: { ...req.user.public_json },
          });
          break;
        }
      }
    }
    console.log("###################");

    currentUser.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Something went wrong when saving data!",
          type: "error",
        });
      }

      return res
        .status(200)
        .send({ message: "Added like successfully", type: "success" });
    });
  });

  // if we find our user between the likes, we delete him
  // otherwise insert
});

router.post("/posts/update", isAuthenticated, (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Something went wrong with formidable!",
        type: "error",
      });
    }
    console.log(fields);
    if (files.image !== undefined) {
      const fileName = Date.now() + "-" + files.image.name;
      const newPath = path.join(
        "./",
        __dirname,
        "static",
        "images",
        "posts",
        fileName
      );
      fs.copyFile(files.image.path, newPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: "Something went wrong when saving data!",
            type: "error",
          });
        }

        User.findOneAndUpdate(
          { _id: req.user._id, "posts._id": fields.postId },
          {
            $set: {
              "posts.$.description": fields.description,
              "posts.$.photo": "/images/posts/" + fileName,
            },
          },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send({
                message: "Something went wrong when saving data!",
                type: "error",
              });
            }

            console.log(result);
            let postIndex = result.posts.findIndex(
              (post) => post._id.toString() === fields.postId
            );

            return res.status(200).send({
              message: "Created the post successfully!",
              type: "success",
              post: result.posts[postIndex],
            });
          }
        );
      });
    } else {
      if (fields.imageRemoved === "true") {
        await User.findOneAndUpdate(
          { _id: req.user._id, "posts._id": fields.postId },
          {
            $set: {
              "posts.$.photo": "",
            },
          }
        );
      }

      User.findOneAndUpdate(
        { _id: req.user._id, "posts._id": fields.postId },
        {
          $set: {
            "posts.$.description": fields.description,
          },
        },
        { new: true },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Something went wrong when saving data!",
              type: "error",
            });
          }

          console.log(result);
          let postIndex = result.posts.findIndex(
            (post) => post._id.toString() === fields.postId
          );

          return res.status(200).send({
            message: "Created the post successfully!",
            type: "success",
            post: result.posts[postIndex],
          });
        }
      );
    }
  });
});

router.get("/posts/delete", isAuthenticated, (req, res) => {
  // get the postId
  const { postId } = req.query;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { posts: { _id: postId } } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Something went wrong when saving data!",
          type: "error",
        });
      }

      return res.status(200).send({
        message: "Post deleted!",
        type: "success",
      });
    }
  );
});

router.get("/posts", isAuthenticated, async (req, res) => {
  // get all the posts from all my friends including me
  let users = await User.find();

  let posts = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].posts.length > 0) {
      posts = [...users[i].posts, ...posts];
    }
  }

  return res.status(200).send({
    message: "Users sent successfully!",
    type: "success",
    posts: posts.sort((a, b) => b.timestamp - a.timestamp),
  });
});

router.post("/posts", isAuthenticated, async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Something went wrong with formidable!",
        type: "error",
      });
    }

    if (files.image !== undefined) {
      const fileName = Date.now() + "-" + files.image.name;
      const newPath = path.join(
        "./",
        __dirname,
        "static",
        "images",
        "posts",
        fileName
      );
      fs.copyFile(files.image.path, newPath, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: "Something went wrong when saving data!",
            type: "error",
          });
        }

        let user = await User.findById(req.user._id);

        user.posts.push({
          _id: new mongoose.Types.ObjectId(),
          description: fields.description,
          photo: "/images/posts/" + fileName,
          user: {
            id: new mongoose.Types.ObjectId(req.user._id),
            photo: req.user.photo,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username,
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

          return res.status(200).send({
            message: "Created the post successfully!",
            type: "success",
            post: result.posts[result.posts.length - 1],
          });
        });
      });
    } else {
      let user = await User.findById(req.user._id);

      user.posts.push({
        _id: new mongoose.Types.ObjectId(),
        description: fields.description,
        user: {
          id: new mongoose.Types.ObjectId(req.user._id),
          photo: req.user.photo,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          username: req.user.username,
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
        return res.status(200).send({
          message: "Created the post successfully!",
          type: "success",
          post: result.posts[result.posts.length - 1],
        });
      });
    }
  });
});

module.exports = router;
