require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let user = require("./controllers/usercontroller");
let list = require("./controllers/listcontroller");
let task = require("./controllers/taskcontroller");

sequelize.sync();

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", user);
app.use("/list", list);
app.use("/task", task);

app.listen(process.env.PORT, function () {
	console.log(`Running: Everest App on Port ${process.env.PORT}`);
});
