require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let user = require("./controllers/usercontroller");
//let list = require("./controllers/listcontroller");
let task = require("./controllers/taskcontroller");

//sequelize.sync({ force: true });
sequelize.sync();

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", user);
app.use("/task", task);
//app.use("/list", list);

app.listen(process.env.PORT, function () {
	console.log(`Running: Executask App on Port ${process.env.PORT}`);
});
