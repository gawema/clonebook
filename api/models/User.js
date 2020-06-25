const mongoose = require('mongoose');

const publicDataSchema = mongoose.Schema(
	{
		userId: mongoose.Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		photo: String,
		status: Number,
	},
	{ _id: false }
);

const chatSchema = mongoose.Schema({
	message: String,
	fromMe: Boolean,
	timestamp: { type: Date, default: Date.now },
  });

const friendSchema = mongoose.Schema(
	{
		publicData: publicDataSchema,
		friendshipStatus: String,
		chat: [chatSchema],
	},
	{ _id: false }
  );  

const postSchema = mongoose.Schema({
	text: String,
	image: String,
	likes: Number,
	timestamp: { type: Date, default: Date.now },
});

const notificationSchema = mongoose.Schema({
	type: String,
	message: String,
	user: publicDataSchema,
	timestamp: { type: Date, default: Date.now },
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
	notifications: [notificationSchema],
});

  module.exports = mongoose.model('User', userSchema);
