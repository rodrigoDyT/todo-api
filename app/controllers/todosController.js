var Todo = require('../models/todo');
var utilHelper = require('../helpers/utils');

exports.findAllTodos = function(req, res, next){
	Todo.find(
		{
			user_id : utilHelper.modelId(req)
		}
		, function(err, todos){
			if(err)
				res.status(500).send(err)
			res.status(200).send(todos)
		})
}

exports.findTodo = function (req, res, next){
	Todo.find(
		{
			user_id : utilHelper.modelId(req),
		    _id : req.params.todo_id	
		}, function(err, todo){
		if(err || !todo)
			res.status(404).send('No TODO found with this ID')
		res.status(200).send(todo)
	})
}

exports.createTodo = function (req, res, next){
	if (!req.body.title)
		return res.status(403).send('Not valid data for this TODO')

	Todo.create({
		title : req.body.title,
		description : req.body.description || null,
		dueDate : req.body.dueDate || null,
		done : false,
		created_at : new Date(),
		finished_at : null,
		user_id : utilHelper.modelId(req) ,
		level: req.body.level || null,
		priority: req.body.priority || null,
		project_id: req.body.project_id || null
	})
		.then(function(todo){
			req.params['todo_id'] = todo._id
			exports.findTodo(req, res, next)
		})
		.catch(function(err){
			res.status(500).send(err)
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
			res.status(500).send(err)
		})
}

