require("dotenv").config();
const router = require("express").Router();
const List = require("../db").import("../models/list");
let validateSession = require("../middleware/validate-session");

router.post("/", validateSession, function (req, res) {
	List.create({
		userId: req.user.id,
		title: req.body.list.title,
		description: req.body.list.description,
		complete: req.body.list.complete,
		due: req.body.list.due,
	})
		.then(function listCreate(list) {
			res.status(200).json({
				list: list,
				message: "List created.",
			});
		})
		.catch((err) => res.status(500).send({ error: err }));
});

module.exports = router;
