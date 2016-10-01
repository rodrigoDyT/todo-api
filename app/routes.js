var todoController = require('./controllers/todosController')
var userController = require('./controllers/userController')
var projectsController = require('./controllers/projectsController')

module.exports = function(app){

	app.get('/api/todos/:todo_id',userController.authenticateUser, todoController.findTodo);

	app.get('/api/todos',userController.authenticateUser, todoController.findAllTodos);

	app.post('/api/todos', userController.authenticateUser, todoController.createTodo); 

	app.delete('/api/todos/:todo_id', userController.authenticateUser, todoController.createTodo); 

	app.put('/api/todos/:todo_id', userController.authenticateUser, todoController.updateTodo); 

	app.get('/api/projects/:project_id',userController.authenticateUser, projectsController.findProject);

	app.get('/api/projects',userController.authenticateUser, projectsController.findAllProjects);

	app.post('/api/projects', userController.authenticateUser, projectsController.createProject); 

	app.delete('/api/projects/:project_id', userController.authenticateUser, projectsController.createProject); 

	app.put('/api/projects/:project_id', userController.authenticateUser, projectsController.updateProject); 

	app.get('/api/gettoken', userController.getToken); 

	app.post('/api/createuser', userController.createUser); 
};
