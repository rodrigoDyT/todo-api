var todoController = require('./controllers/todosController')
var userController = require('./controllers/userController')

module.exports = function(app){

	app.get('/api/todos', function(req, res){
		return todoController.findTodo(req, res)
	});

	app.post('/api/todos', function(req, res){
		return todoController.createTodo(req, res)
	});

	app.delete('/api/todos/:todo_id', function(req, res){
		return todoController.deleteTodo(req, res)
	});

	app.put('/api/todos/update/:todo_id', function(req, res){
		return todoController.updateTodo(req, res)	
	});

	app.post('/api/todos/getToken', function(req, res){
		return userController.getToken(req, res)
	});

	app.post('/api/todos/createuser', function(req, res){
		return userController.createUser(req, res)
	})
};
