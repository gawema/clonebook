const jsonwebtoken = require('jsonwebtoken')

// VERIFY TOKEN
function verifyToken(req, res, next) {
	const bearer = req.headers['authorization'];
    if(typeof bearer == 'undefined'){
        res.sendStatus(403);
	}
	token = bearer.split(' ')[1]
	//temporart secretkey
	jsonwebtoken.verify(token, 'secretkey', (err, user)=> {
		if(err){ 
			return res.sendStatus(403)
		}
	})
	next();
}

// GENERATE TOKEN
function generateToken(payload){
	const token = jsonwebtoken.sign({payload}, 'secretkey')
	return token;
}

// GET USER FROM TOKEN
async function getUserByToken(req) {
	const bearer = req.headers['authorization'];
	token = bearer.split(' ')[1]
	return jsonwebtoken.verify(token, 'secretkey').payload
}


module.exports = {
	verifyToken,
	generateToken,
	getUserByToken
}