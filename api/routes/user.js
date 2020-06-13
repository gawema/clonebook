const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const tokenizer =  require('../tokenizer')


//ROUTES
router.post('/signup', async (req, res) => {
	try {
		const user = await db.collection("users").findOne({'email': req.body.email})
		if(user){
			return res.send('email already registered')
		}
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.body.password, salt)
		const newUser = {name: req.body.name, lastname: req.body.lastname, email: req.body.email, password: hashPassword}
		db.collection("users").insertOne(newUser, (err, user) => {
			return res.send('user successfully created')
		});
	} catch (error) {
		console.log(error);
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await db.collection("users").findOne({'email': req.body.email})

		if(!user){
			return res.status(400).send('user not found')
		}
		try {
			if (await bcrypt.compare(req.body.password, user.password)){
				const token = tokenizer.generateToken(user);
				return res.json({token})
			}
			return res.send('not allowed')
		} catch (error) {
			return res.status(500).send(error);
		}
	} catch (error) {
		return res.status(500).send(error);
	}
})

router.get('/', tokenizer.verifyToken, (req,res) => {
	db.collection("users").find().toArray((err, dbres) => {
		if(err){console.log("error, cannot read"); return}
		res.send(dbres)
	})
})

router.get('/:userId', tokenizer.verifyToken, (req,res) => {
	const id = new require('mongodb').ObjectID(req.params.userId);
	db.collection("users").findOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
	})
})

router.patch('/', tokenizer.verifyToken, async (req, res) => {
	const user = await tokenizer.getUserByToken(req);
	const id = new require('mongodb').ObjectID(user._id);
	const newUser = req.body;
	delete newUser.email
	delete newUser.password
	db.collection("users").updateOne({'_id': id}, { $set: newUser }, (err, dbres) => {
		if(err){ console.log(err); return; }
		res.send(dbres);
	});
})

router.delete('/', tokenizer.verifyToken, async (req,res) => {
	const user = await tokenizer.getUserByToken(req);
	const id = new require('mongodb').ObjectID(user._id);
	db.collection("users").deleteOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
		console.log(dbres);
	})
})

module.exports = router