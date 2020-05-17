const express = require("express");
const router = express.Router();

//ROUTES
router.get('/', (req,res) => {
	db.collection("users").find().toArray((err, dbres) => {
		if(err){console.log("error, cannot read"); return}
		res.send(dbres)
	})
})

router.get('/:userId', (req,res) => {
	const id = new require('mongodb').ObjectID(req.params.userId);
	db.collection("users").findOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
	})
})


router.post('/', function (req, res) {
	const newUser = req.body
	db.collection("users").insertOne(newUser, (err, dbres) => {
		res.send(dbres);
	});
})


router.patch('/:userId', function (req, res) {
	const id = new require('mongodb').ObjectID(req.params.userId);
	const newUser = req.body;
	db.collection("users").updateOne({'_id': id}, { $set: newUser }, (err, dbres) => {
		if(err){ console.log(err); return; }
		res.send(dbres);
		console.log(dbres);
	});
})


router.delete('/:userId', (req,res) => {
	const id = new require('mongodb').ObjectID(req.params.userId);
	db.collection("users").deleteOne({'_id': id}, (err, dbres) => {
		res.send(dbres)
		console.log(dbres);
	})
})

module.exports = router