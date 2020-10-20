module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define("task", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		complete: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
		time_estimate: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 15,
		},
		due: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	});
	return Task;
};
