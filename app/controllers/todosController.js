var Todo = require('../models/todo');

exports.findTodo = function (req, res){
	Todo.find({}, function(err, todos){
		if(err)
			res.send(500, err)
		res.send(todos)
	})
}

exports.createTodo = function (req, res){
	if (!req.body.title)
		return res.send("Not valid data for this TODO")

	Todo.create({
		title : req.body.title,
		description : req.body.description,
		dueDate : req.body.dueDate,
		done : false,
		created_at : new Date(),
		finished_at : null,
		user_id : req.body.userID
	})
		.then(this.findTodo(req, res))
		.catch(function(err){
			res.send(err)
		})
}

exports.updateTodo = function(req, res){
	if(req.body.done)
		req.body["finished_at"] =  new Date()
	Todo.findByIdAndUpdate(req.params.todo_id, req.body, {new: true},function(err, todo){
		if(err)	
			res.send(500 ,err)
		res.json(todo)
	})
}

exports.deleteTodo = function (req, res){

	Todo.remove({
		_id : req.params.todo_id
	})
		.then(this.findTodo(req, res))
		.catch(err, function(){
			res.send(err)
		})
}

