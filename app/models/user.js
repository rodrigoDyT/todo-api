var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', {
	name : String,
	password : String,
	admin : Boolean
});
