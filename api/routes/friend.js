const router = require("express").Router();
const tokenizer =  require('../utils/tokenizer')
const User = require("../models/User");
const { response } = require("express");



//NEW REQUEST
router.post('/request', tokenizer.verifyToken, async (req, res) => {
	try {
		payload_user = await tokenizer.getUserByToken(req);
		friendId = req.body.friendId;

		if(isAlreadyFriend(payload_user._id, friendId)) return res.send("you are already friends");

		User.findById(friendId, async (err, friend) =>{
			if(err){ console.log(err); res.sendStatus(404); }
			if(friend){
				if(await requestExists(friend, payload_user._id)) return res.send("request already made");;
				friend.notifications.push({
					type: "request",
					message:  payload_user.firstName + " would like to be your friend",
					user: payload_user.publicData,
				})
				friend.save().then(
					res.sendStatus(200)
				)
			}else{return res.sendStatus(404);}
		})
	} catch (error) {
		console.log(error);
		return res.status(500).send('something went wrong')
	}
})


//ACCEPT REQUEST
router.post('/request/accept', tokenizer.verifyToken, async (req, res) => {
	try {
		payload_user = await tokenizer.getUserByToken(req);
		requestId = req.body.requestId;

		// not working
		// if(isAlreadyFriend(payload_user._id, friendId)) return res.send("you are already friends");

		User.findById(payload_user._id, async (err, user) =>{

			if(err){ console.log(err); res.sendStatus(404); }
			if(user){

				(user.notifications).forEach( async notification =>{
					if(notification._id.equals(requestId)) {
						notification.type = 'accepted'
						const friendId = notification.user.userId;
						const publicData = await connectFriendandGetPublicData(user.publicData, friendId);						
						user.friends.push({
							publicData: publicData,
							friendshipStatus: "friends"
						})
						user.save().then(
							res.send("you and " + publicData.firstName + " are now friends")
						)
					}
				});
			}else{return res.sendStatus(404);}
		})
	} catch (error) {
		console.log(error);
		return res.status(500).send('something went wrong')
	}
})

//GET ALL FRIENDS
router.get('/all', tokenizer.verifyToken, async (req, res) => {
	try {
		payload_user = await tokenizer.getUserByToken(req);

		User.findById(payload_user._id, (err, user) => {
			if(err){ console.log(err); return; }
			if(user){
				return res.send(user.friends)
			}
		})
		
	} catch (error) {
		console.log(error);
		return res.status(500).send('something went wrong')
	}
})

//CREATE FRIENDSHIP
async function connectFriendandGetPublicData(publicData, friendId){
	await User.findById(friendId, (err, user) => {
		user.friends.push({
			publicData: publicData,
			friendshipStatus: "friends"
		});
		user.save().then(
			publicData = user.publicData
		)
	})
	return publicData;

}

// NOT WORKING
function isAlreadyFriend(id, friendId){
	User.findById(id, (err, user) =>{ 
		if(err) console.log(err);
		if(user){
			(user.friends).forEach(friend => {
				if(friend._id === friendId) return true;
			});
			return false
		}
	});
}

// CHECK IF FRIEND REQUES ALREADY EXIST -- ONLY FROM ONE PART
async function requestExists(friend, userId){
	let response = false;
	await (friend.notifications).forEach(notification =>{
		if(notification.user.userId.equals(userId)) response = true;
	});
	return response
}

module.exports = router