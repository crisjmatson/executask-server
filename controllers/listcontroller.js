require("dotenv").config();
const router = require("express").Router();
const List = require("../db").import("../models/list");
let validateSession = require("../middleware/validate-session");

router.post("/", validateSession, function (req, res) {
	List.create({
		userId: req.user.id,
		title: req.body.list.title,
	})
		.then(function listCreate(list) {
			res.status(200).json({
				list: list,
				message: "List created.",
			});
		})
		.catch((err) => res.status(500).send({ error: err }));
});
router.get("/yours", validateSession, function (req, res) {
	// ??  USER SPECIFIC TASK ACCESS
	List.findAll({
		where: { userId: req.user.id },
	})
		.then(function listDisplayYours(lists) {
			if (lists) {
				res.status(200).json({ lists: lists });
			} else {
				res.status(500).json({ error: "No lists found." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});
router.get("/:id", validateSession, function (req, res) {
	// ??  USER SPECIFIC TASK ACCESS
	Task.findAll({
		where: { listId: req.params.id },
	})
		.then(function listPulled(tasks) {
			if (tasks) {
				res.status(200).json({ tasks: tasks });
			} else {
				res.status(500).json({ error: "No tasks in list." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

module.exports = router;
