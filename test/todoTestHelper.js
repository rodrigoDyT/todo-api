var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var todoController = require('../app/controllers/todosController');
var userController = require('../app/controllers/userController');
var projectController = require('../app/controllers/projectsController');

chai.use(chaiHttp);

exports.createUserAndGetToken = function() {
	chai.request(server)
		.post('/api/createuser')	
		.send({'name': 'johnsmithtest', 'password': 'janebabelove'})
		.end(function(err, res){
			return res.body.token;
		});
}
