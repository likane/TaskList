var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://kane:123@ds119044.mlab.com:19044/mytasklist_kane", ['tasks'])


//get all tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);

		}

		res.json(tasks);
	})
});


//get single task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id:mongojs.ObjectID(req.params.id)}, function(err, task){
		if(err){
			res.send(err);

		}

		res.json(task);
	})
});

//Save a task
router.post('/task', function(req, res, next){
	var task = req.body;

	if(!task.title || !(task.isDone + '')){
		rest.status(400);
		res.json({
			"error": "bad data"
		});

	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}
})

//delete task
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id:mongojs.ObjectID(req.params.id)}, function(err, task){
		if(err){
			res.send(err);

		}

		res.json(task);
	})
});

//update task
router.put('/task/:id', function(req, res, next){

	var task = req.body;
	var updTask = {};

	if(task.isDone){
		updTask.isDone = task.isDone;
	}

	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			'error':'bad data'
		});

	} else {
		db.tasks.update({_id:mongojs.ObjectID(req.params.id)}, updTask, {}, function(err, task){
		if(err){
			res.send(err);

		}

		res.json(task);
	})
});
	}

	



module.exports = router;