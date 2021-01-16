module.exports = (sequelize, DataTypes) => {
	const List = sequelize.define("list", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return List;
};
