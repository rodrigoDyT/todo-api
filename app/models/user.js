var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', {
	name : String,
	email : {
		type: String,
		unique : true
	},
	password : String,
	token : String
});
