var Todo = require('../models/todo');

exports.findTodo = function(req, res){
	Todo.find(function(err, todos){
		if(err)
			res.send(err)

		res.json(todos)
	})
}

exports.createTodo = function(req, res){
	Todo.create({
		text : req.body.text,
		done : false
	})
		.then(this.findTodo(req, res))
		.catch(function(err){
			res.send(err)
		})
}

exports.deleteTodo = function(req, res){
	Todo.remove({
		_id : req.params.todo_id
	})
		.then(this.findTodo(req, res))
		.catch(err, function(){
			res.send(err)
		})
	
}

