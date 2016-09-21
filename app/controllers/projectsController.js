var Project = require('../models/project');
var utilHelper = require('../helpers/utils');

exports.findAllProjects = function(req, res, next){
	Project.find(
		{
			user_id : utilHelper.modelId(req)
		}
		, function(err, projects){
			if(err)
				res.send(500, err)
			res.send(projects)
		})
}

exports.findProject = function (req, res, next){
	Project.find(
		{
			user_id : utilHelper.modelId(req),
		    _id : req.params.project_id	
		}, function(err, project){
		if(err || !project)
			res.send(404, 'No project found with this ID')
		res.send(project)
	})
}

exports.createProject = function (req, res, next){
	if (!req.body.title || !utilHelper.modelId(req))
		return res.send(403, "Not valid data for this project")

	Project.create({
		title : req.body.title,
		description : req.body.description || null,
		dueDate : req.body.dueDate || null,
		done : false,
		created_at : new Date(),
		finished_at : null,
		user_id : utilHelper.modelId(req),
		level: req.body.level || null,
		priority: req.body.priority || null
	})
		.then(function(project){
			req.params['project_id'] = project._id
			exports.findProject(req, res, next)
		})
		.catch(function(err){
			res.send(err)
		})
}

exports.updateProject = function(req, res, next){
	if(req.body.done)
		req.body["finished_at"] =  new Date()
	Project.findByIdAndUpdate(req.params.project_id, req.body, {new: true},function(err, project){
		if(err)	
			res.send(500 ,err)
		res.json(project)
	})
}

exports.deleteProject = function (req, res, next){

	Project.remove({
		_id : req.params.project_id
	})
		.then(this.findProject(req, res))
		.catch(err, function(){
			res.send(err)
		})
}

