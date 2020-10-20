module.exports = (sequelize, DataTypes) => {
	const List = sequelize.define("list", {
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
		due: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	});
	return List;
};
