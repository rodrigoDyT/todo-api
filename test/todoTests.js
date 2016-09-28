var moment = require('moment');
var expect = require('expect');
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
			.send({'name': 'johnsmithtest', 'email' : 'john.smith@emailg.com', 'password': 'janebabelove'})
			.then(function(res){
				userToken = res.body.token;
				chai.request(server)
					.post('/api/todos')
					.send({"title": 'The one to test travis', 
						dueDate : moment().add(7, 'days'),
						description : 'Test Travis CI',
						level : 'Easy',
						priority : '1',
						"token" : userToken})
					.end(function(err, res){
						done();
					});
			})
			.catch(function(err){
				console.log(err);
			});
	});
	it('should list 1 todo of User', function(done){
		chai.request(server)
			.get('/api/todos')
			.send({"token": userToken})
			.end(function(err, response){
				response.res.body.should.have.length(1);
				done();
			});
	});

});
