const express = require("express");
const router = express.Router();

const tokenizer =  require('../tokenizer');

// ROUTES
router.post('/', tokenizer.verifyToken, async (req, res) => {
	try {
		const user = await tokenizer.getUserByToken(req);
		const userId = new require('mongodb').ObjectID(user._id);
		const newPost = {title: req.body.title, text: req.body.text, userId: userId}
		db.collection("posts").insertOne(newPost, (err, user) => {
			return res.send('post successfully created')
		});
	} catch (error) {
		console.log(error);
	}
})

router.get('/', tokenizer.verifyToken, (req,res) => {
	db.collection("posts").find().toArray((err, dbres) => {
		if(err){console.log("error, cannot read"); return}
		res.send(dbres)
	})
})

router.get('/:postId', tokenizer.verifyToken, (req,res) => {
	const id = new require('mongodb').ObjectID(req.params.postId);
	db.collection("posts").findOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
	})
})

router.patch('/:postId', tokenizer.verifyToken, async (req, res) => {
	const user = await tokenizer.getUserByToken(req);
	const userId = new require('mongodb').ObjectID(user._id);
	const id = new require('mongodb').ObjectID(req.params.postId);
	const post = req.body;
	delete post.userId
	db.collection("posts").updateOne({'_id': id, 'userId': userId}, { $set: post }, (err, dbres) => {
		if(err){ console.log(err); return; }
		res.send(dbres);
	});
})

router.delete('/:postId', tokenizer.verifyToken, async (req,res) => {
	const user = await tokenizer.getUserByToken(req);
	const userId = new require('mongodb').ObjectID(user._id);
	const id = new require('mongodb').ObjectID(req.params.postId);
	db.collection("posts").deleteOne({'_id': id, 'userId': userId}, (err, dbres) => {
		res.send(dbres)
	})
})

module.exports = router