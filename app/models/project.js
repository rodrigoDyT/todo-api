var mongoose  = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('Project',{
	title: String,
	description: String,
	dueDate: Date,
	finished_at: Date,
	done : Boolean,
	created_at: Date,
	user_id: String,
	priority: String,
	level: String
});
