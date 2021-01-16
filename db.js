require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
});

sequelize.authenticate().then(
	function () {
		console.log(`connected to ${process.env.NAME} postgres database`);
	},
	function (err) {
		console.log("ERROR: ", err);
	}
);

User = sequelize.import("./models/user");
//List = sequelize.import("./models/list");
Task = sequelize.import("./models/task");

//List.belongsTo(User);
//User.hasMany(List);

Task.belongsTo(User);
User.hasMany(Task);

module.exports = sequelize;
