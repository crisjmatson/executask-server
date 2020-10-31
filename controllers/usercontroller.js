require("dotenv").config();
const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");

router.get("/test", function (req, res) {
	res.send("test user route success!");
});

router.post("/signup", function (req, res) {
	User.create({
		username: req.body.user.name,
		email: req.body.user.mail,
		password: bcrypt.hashSync(req.body.user.pass, 14),
		taskCount: 0,
	})
		.then(function createSuccess(user) {
			let token = jwt.sign({ id: user.id }, process.env.SIGNATURE, {
				expiresIn: 60 * 60 * 24,
			});
			res.status(200).json({
				user: user,
				message: "User created.",
				sessionToken: token,
			});
		})
		.catch((err) => res.status(500).send({ error: err }));
});

router.post("/signin", function (req, res) {
	User.findOne({
		where: { username: req.body.user.name },
	})
		.then(function loginSuccess(user) {
			if (user) {
				bcrypt.compare(req.body.user.pass, user.password, function (
					err,
					matches
				) {
					if (matches) {
						let token = jwt.sign({ id: user.id }, process.env.SIGNATURE, {
							expiresIn: 60 * 60 * 24,
						});

						res.status(200).json({
							user: user,
							message: "Signed in!",
							sessionToken: token,
						});
					} else {
						res.status(502).json({ error: "Login Failed." });
					}
				});
			} else {
				res.status(500).json({ error: "User does not exist." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

router.get("/profile", validateSession, function (req, res) {
	let currentuser = req.user.id;
	console.log("fetch called");
	User.findOne({
		where: { id: currentuser },
	})
		.then(function userDisplay(user) {
			if (user) {
				res.status(200).json({ user: user });
			} else {
				res.status(500).json({ error: "user profile not available." });
			}
		})
		.catch((err) => res.status(500).send({ error: err }));
});

router.put("/edit", validateSession, function (req, res) {
	const updateListUser = {
		username: req.body.user.name,
		email: req.body.user.mail,
		taskCount: req.body.user.count,
	};
	const query = { where: { id: req.user.id } };
	User.update(updateListUser, query)
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).send({ error: err }));
});

/* router.put("/taskcount", validateSession, function (req, res) {
	/* const updateTaskCount = {
		taskCount: req.body.user.count,
	}; 
	const query = { where: { id: req.user.id } };
	User.findOne({
		where: { id: req.user.id },
	}).then((response) => res.status(200).json(response));
	//.then((user) => User.update(user.taskCount + 1, query))
	/* User.update(updateTaskCount, query)
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).send({ error: err })); 
}); */

router.delete("/delete", validateSession, function (req, res) {
	const query = { where: { id: req.user.id } };
	User.destroy(query)
		.then(() => res.status(200).json({ message: "user deleted" }))
		.catch((err) => res.status(500).send({ error: err }));
});

module.exports = router;
