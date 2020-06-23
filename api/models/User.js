const mongoose = require('mongoose');

const publicDataSchema = mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		photo: String,
		status: Number,
	}
);

const chatSchema = mongoose.Schema({
	message: String,
	fromMe: Boolean,
	timestamp: { type: Date, default: Date.now },
  });

const friendSchema = mongoose.Schema(
	{
	  firstName: String,
	  lastName: String,
	  photo: String,
	  status: Number,
	  yourFriend: String,
	  chat: [chatSchema],
	}
  );  

const postSchema = mongoose.Schema({
	text: String,
	image: String,
	likes: Number,
});

const userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	photo: { type: String, default: "../../static/profile-default.jpg" },
	status: { type: Number, default: 0 },
	openChats: [],
	posts: [postSchema],
	friends: [friendSchema],
	publicData: publicDataSchema,
});

  module.exports = mongoose.model('User', userSchema);
