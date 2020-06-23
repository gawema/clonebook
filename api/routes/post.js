const router = require("express").Router();
const tokenizer =  require('../utils/tokenizer');
const User = require("../models/User")


// NEW POST
router.post('/', tokenizer.verifyToken, async (req, res) => {
	try {
		// GET THE USER FROM THE TOKEN
		const userPayload = await tokenizer.getUserByToken(req);
		const userId = new require('mongodb').ObjectID(userPayload._id);

		// GET THE ACTUAL USER OBJECT FROM THE DB
		let user = await User.findById(userId);

		//CREATE THE POST AND SAVE IT TO THE ARRAY OF POSTS
		const newPost = {
			text: req.body.text,
			image: req.body.image,
			likes: 0
		}
		user.posts.push(newPost);
		user.save()
		.then(result => {
			
			//SEND THE RESPONSE BACK
			res.send(result);
		})
		.catch(error => {
			return res.status(500).send('db error')
		});

	} catch (error) {
		console.log(error);
	}
})

// GET ALL POSTS
router.get('/', tokenizer.verifyToken, (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	try {
		// INITIALIZING EMPTY ARRAY OF POSTS
		let posts = [];

		User.find((err, users) => {
			if(err){ console.log(err); return res.sendStatus(500); }

			// LOOPING TROUGH USERS AND THEIR POSTS (SHOULD BE CHANGED TO ONLY FRIENDS)
			users.forEach(user => {
				user.posts.forEach(post => {
					posts.push(post);
				})
			})
			res.send(posts);
		})
	} catch (error) {
		console.log(error);
	}

})

// LIKE A POST
router.patch('/like/:postId', tokenizer.verifyToken, async (req, res) => {
	try {
		const id = new require('mongodb').ObjectID(req.params.postId);
		User.findOne({'posts._id': id }, (err, user) => {
			if(err){ console.log(err); return res.sendStatus(500); }
			user.posts.forEach(post => {
				if (post._id.equals(id)){
					post.likes ++
					user.save().then(res.sendStatus(200))
				}
			})
			res.send(dbres);
		});
	} catch (error) {
		console.log(error);
	}
})

// UNLIKE A POST
router.patch('/unlike/:postId', tokenizer.verifyToken, async (req, res) => {
	try {
		const id = new require('mongodb').ObjectID(req.params.postId);
		User.findOne({'posts._id': id }, (err, user) => {
			if(err){ console.log(err); return res.sendStatus(500); }
			user.posts.forEach(post => {
				if (post._id.equals(id)){
					post.likes --
					user.save().then(res.sendStatus(200))
				}
			})
			res.send(dbres);
		});
	} catch (error) {
		console.log(error);
	}
})

// DELETE A POST
router.delete('/:postId', tokenizer.verifyToken, async (req,res) => {
	try {
		// GET THE USER FROM THE TOKEN
		const userPayload = await tokenizer.getUserByToken(req);
		const userId = new require('mongodb').ObjectID(userPayload._id);

		// GET THE ACTUAL USER OBJECT FROM THE DB
		const id = new require('mongodb').ObjectID(req.params.postId);

		// FIND THE POST TO DELETE
		User.findOne({'_id': userId, 'posts._id': id }, (err, user) => {
			if(!user){res.sendStatus(403);}
			if(err){ console.log(err); return res.sendStatus(500); }
			console.log(user.posts.lenght);
			user.posts.forEach(post => {
				if (post._id.equals(id)){

					// DELETE POST
					user.posts.remove(post);
					user.save().then(res.sendStatus(200))
				}
			})
		});
	} catch (error) {
		console.log(error);
	}
})

module.exports = router