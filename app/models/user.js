var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', {
	name : String,
	email : String,
	password : String,
	token : String
});
