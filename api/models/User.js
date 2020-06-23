const mongoose = require('mongoose');

const post = mongoose.Schema({
	text: String,
	image: String,
	likes: Number,
});

const userShema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	posts: [post],
});

  module.exports = mongoose.model('User', userShema);
