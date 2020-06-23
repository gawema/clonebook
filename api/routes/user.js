const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")
const tokenizer =  require('../tokenizer')


//ROUTES
router.post('/signup', async (req, res) => {
	try {
		User.findOne({ email: req.body.email }, async (err, result) => {

			if (result !== null) {
				return res.status(500).send("User already exists!");
			}

			const salt = await bcrypt.genSalt();
			const hashPassword = await bcrypt.hash(req.body.password, salt)
			const user = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashPassword,
			});
			user.save()
			.then(result => {
				console.log(result)
				res.send('user successfully created');
			})
			.catch(error => {
				console.log(error);
				return res.status(500).send('db error')
			});
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send('something went wrong')
	}
})

router.post('/login', async (req, res) => {
	try {
		User.findOne({'email': req.body.email}, async (err, user) => {
			if(!user){
				return res.status(400).send('user not found')
			}
			try {
				if (await bcrypt.compare(req.body.password, user.password)){
					const token = tokenizer.generateToken(user);
					return res.json({token})
				}
				return res.status(400).send('not allowed')
			} catch (error) {
				return res.status(500).send(error);
			}
		});
	} catch (error) {
		return res.status(500).send(error);
	}
})

router.get('/', tokenizer.verifyToken, (req,res) => {
	User.find((err, users)=> {
		if(err){console.log(err); return}
		res.send(users)
	});
})

router.get('/:userId', tokenizer.verifyToken, (req,res) => {
	const id = new require('mongodb').ObjectID(req.params.userId);
	User.findOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
	})
})

router.patch('/', tokenizer.verifyToken, async (req, res) => {
	const user = await tokenizer.getUserByToken(req);
	const id = new require('mongodb').ObjectID(user._id);
	const newUser = req.body;
	delete newUser.email
	delete newUser.password
	User.updateOne({'_id': id}, { $set: newUser }, (err, dbres) => {
		if(err){ console.log(err); return; }
		res.send(dbres);
	});
})

router.delete('/', tokenizer.verifyToken, async (req,res) => {
	const user = await tokenizer.getUserByToken(req);
	const id = new require('mongodb').ObjectID(user._id);
	User.deleteOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
		console.log(dbres);
	})
})

module.exports = router