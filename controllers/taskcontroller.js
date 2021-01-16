require("dotenv").config();
const router = require("express").Router();
const Task = require("../db").import("../models/task");
let validateSession = require("../middleware/validate-session");

router.post("/", validateSession, function (req, res) {
	Task.create({
		userId: req.user.id,
		/* listId: req.body.task.listId, */
		title: req.body.task.title,
		description: req.body.task.description,
		complete: req.body.task.complete,
		time_estimate: req.body.task.time_estimate,
		due: req.body.task.due,
	})
		.then(function taskCreate(task) {
			res.status(200).json({
				task: task,
				message: "Task created.",
			});
		})
		.catch((err) => res.status(500).send({ error: err }));
});
router.get("/yours", validateSession, function (req, res) {
	// ??  USER SPECIFIC TASK ACCESS
	Task.findAll({
		where: { userId: req.user.id },
	})
		.then(function postDisplayYours(tasks) {
			if (tasks) {
				res.status(200).json({ tasks: tasks });
			} else {
				res.status(500).json({ error: "No tasks found." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
	// USER ACCESS TO UPDATE TASKS
	let updateTask = {
		title: req.body.task.title,
		description: req.body.task.description,
		complete: req.body.task.complete,
		time_estimate: req.body.task.time_estimate,
		due: req.body.task.due,
	};
	const query = { where: { id: req.params.id } };

	Task.update(updateTask, query)
		.then(function updatedTask(task) {
			if (task[0] === 1) {
				res.status(200).json({ message: "Update successful" });
			} else {
				res.status(500).json({ error: "Update not allowed." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
	const query = { where: { id: req.params.id, userId: req.user.id } };
	Task.destroy(query)
		.then(function deletedTask(deleted) {
			if (deleted[0] === 0) {
				res.status(500).json({ error: "Delete not allowed." });
			} else {
				res.status(200).json({ message: "Delete successful" });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

/* 

router.get("/admin_view", validateAdmin, function (req, res) {
	// ADMIN GET ALL POSTS
	Post.findAll()
		.then(function postDisplayAll(posts) {
			if (posts) {
				res.status(200).json({ posts: posts });
			} else {
				res.status(500).json({ error: "No posts found." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

router.delete("/admin_delete", validateAdmin, function (req, res) {
	// DELETE POST AND ALL COMMENTS ON POST
	Comment.destroy({ where: { postId: req.body.post.id } });
	Post.destroy({ where: { id: req.body.post.id } })
		.then(() => res.status(200).json({ message: "post information deleted" }))
		.catch((err) => res.status(500).send({ error: err }));
});
 */
module.exports = router;
