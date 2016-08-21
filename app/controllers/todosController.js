var Todo = require('../models/todo');


var userId = function(req){
	return req.decoded['_doc']['_id']
}

exports.findAllTodos = function(req, res, next){
	Todo.find(
		{
			user_id : userId(req)
		}
		, function(err, todos){
			if(err)
				res.send(500, err)
			res.send(todos)
		})
}

exports.findTodo = function (req, res, next){
	Todo.find(
		{
			user_id : userId(req),
		    _id : req.params.todo_id	
		}, function(err, todo){
		if(err || !todo)
			res.send(404, 'No TODO found with this ID')
		res.send(todo)
	})
}

exports.createTodo = function (req, res, next){
	if (!req.body.title)
		return res.send("Not valid data for this TODO")

	Todo.create({
		title : req.body.title,
		description : req.body.description,
		dueDate : req.body.dueDate,
		done : false,
		created_at : new Date(),
		finished_at : null,
		user_id : userId(req) 
	})
		.then(function(todo){
			req.params['todo_id'] = todo._id
			exports.findTodo(req, res, next)
		})
		.catch(function(err){
			res.send(err)
		})
}

exports.updateTodo = function(req, res, next){
	if(req.body.done)
		req.body["finished_at"] =  new Date()
	Todo.findByIdAndUpdate(req.params.todo_id, req.body, {new: true},function(err, todo){
		if(err)	
			res.send(500 ,err)
		res.json(todo)
	})
}

exports.deleteTodo = function (req, res, next){

	Todo.remove({
		_id : req.params.todo_id
	})
		.then(this.findTodo(req, res))
		.catch(err, function(){
			res.send(err)
		})
}

