var todoController = require('./controllers/todosController')

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

};
