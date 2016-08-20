var jwt    = require('jsonwebtoken');
var config = require('../../config/config');
var User   = require('../models/user');

exports.createUser = function(req, res){
	var newUser = User({
		name: req.body.name,
		password: req.body.password,
		admin: req.body.admin	
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
			expiresIn : 86400
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

exports.authenticateUser = function(req, res){
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if(token){
		jwt.verify(token, config.secret, function(err, decoded){
			req.decoded = decoded;
			next();
		})
			.catch(function(err){
				res.json({success : false, message : 'Failed to authenticate token.'});
			})
	}else{
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		})
	}
}
