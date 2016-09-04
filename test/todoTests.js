var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

var todoController = require('../app/controllers/todosController');
var userController = require('../app/controllers/userController');
var projectController = require('../app/controllers/projectsController');

chai.use(chaiHttp);

describe('When CRUDING Todos', function() {
	var userToken = "";
	before(function(done){
		chai.request(server)
			.post('/api/createuser')	
			.send({'name': 'johnsmithtest', 'password': 'janebabelove'})
			.end(function(err, res){
				console.log('test user created successfully');
			})
		chai.request(server)
			.post('/api/gettoken')
			.send({'name': 'johnsmithtest', 'password': 'janebabelove'})
			.end(function(err, res){
				userToken = res.body.token;
				done();
			});
	});
	before(function(done){
		chai.request(server)
			.post('/api/todos')
			.send({"title": 'The one to test travis', 
				   dueDate : '2016-09-13',
				   description : 'Test Travis CI',
				   level : 'Easy',
				   priority : '1',
				   "token" : userToken})
			.end(function(err, res){
				done();
			});
	})
	it('should list 1 todo of User', function(done){
		chai.request(server)
			.get('/api/todos')
			.send({"token": userToken})
			.end(function(err, res){
				res.body.should.have.length(1);
				done();
			});
	});
});
