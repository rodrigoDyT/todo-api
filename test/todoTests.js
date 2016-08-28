var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

var todoController = require('../app/controllers/todosController');
var userController = require('../app/controllers/userController');
var projectController = require('../app/controllers/projectsController');

chai.use(chaiHttp);

describe('When CRUDING Todos', function() {
	var token = "";
	before(function(done){
		chai.request(server)
			.post('/api/createuser')	
			.send({'name': 'johnsmithtest', 'password': 'janebabelove'})
			.end(function(err, res){
				console.log('test user created successfully');
			})
		chai.request(server)
			.post('/api/getToken')
			.send({'name': 'johnsmithtest', 'password': 'janebabelove'})
			.end(function(err, res){
				token = res.body.token;
				done();
			})
	});
	it('should list zero todos of a USER', function(done) {
		chai.request(server)
			.get('/api/todos')
			.send({'token': token})
			.end(function(err, res){
				res.body.should.have.length(0);
				done();
			});
	});
});
