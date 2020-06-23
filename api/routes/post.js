const router = require("express").Router();
const tokenizer =  require('../utils/tokenizer');
const User = require("../models/User")


// ROUTES
router.post('/', tokenizer.verifyToken, async (req, res) => {
	try {
		const userPayload = await tokenizer.getUserByToken(req);
		const userId = new require('mongodb').ObjectID(userPayload._id);
		let user = await User.findById(userId);
		console.log(user);
		const newPost = {
			text: req.body.text
		}
		user.posts.push(newPost);
		user.save()
		.then(result => {
			res.send(result);
		})
		.catch(error => {
			console.log(error);
			return res.status(500).send('db error')
		});

	} catch (error) {
		console.log(error);
	}
})

router.get('/', tokenizer.verifyToken, (req, res) => {

	let posts = [];
	User.find((err, users) => {
		if(err){ console.log(err); return; }
		users.forEach(user => {
			user.posts.forEach(post => {
				posts.push(post);
			})
		})
		res.send(posts);
	})

})

router.patch('/like/:postId', tokenizer.verifyToken, async (req, res) => {
	const id = new require('mongodb').ObjectID(req.params.postId);
	User.findOne({'posts._id': id }, (err, dbres) => {
		if(err){ console.log(err); return; }
		res.send("dbres");
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