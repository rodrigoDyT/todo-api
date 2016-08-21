var todoController = require('./controllers/todosController')
var userController = require('./controllers/userController')

module.exports = function(app){

	app.get('/api/todos/:todo_id',userController.authenticateUser, todoController.findTodo);

	app.get('/api/todos',userController.authenticateUser, todoController.findAllTodos);

	app.post('/api/todos', userController.authenticateUser, todoController.createTodo); 

	app.delete('/api/todos/:todo_id', userController.authenticateUser, todoController.createTodo); 

	app.put('/api/todos/update/:todo_id', userController.authenticateUser, todoController.updateTodo); 

	app.post('/api/todos/getToken', userController.getToken); 

	app.post('/api/todos/createuser', userController.createUser); 
};
