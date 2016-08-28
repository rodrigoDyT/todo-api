var jwt    = require('jsonwebtoken');
var config = require('../../config/config');
var User   = require('../models/user');

exports.createUser = function(req, res){
	var newUser = User({
		name: req.body.name,
		password: req.body.password
	});
	newUser.save(function(err){
		if(err) res.send(500, err)
		res.json({message: 'User created successfully', success : false})
	});
}

exports.getToken = function(req, res){
	User.findOne({
		name: req.body.name
	})
	.then(function(user){
		if(!user || (req.body.password != user.password))
			res.json({success: false, message : 'Authetication failed. Wrong credentials'})

		var token = jwt.sign(user, config.secret, {
			expiresIn : '365d'
		});

		res.json({
			success: true,
			message: 'Token created successfully',
			token: token
		});
	})
	.catch(function(err){
		res.json({
			message: 'Internal error',
			error: err
		})
	})
}

exports.authenticateUser = function(req, res, next){
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if(token){
		jwt.verify(token, config.secret, function(err, decoded){
			if(err)
				return res.json({success: false, message: 'Failed to decode token'});
			req.decoded = decoded;
			return next();
		})
	}else{
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		})
	}
}
