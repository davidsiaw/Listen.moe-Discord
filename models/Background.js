const Sequelize = require('sequelize');

const Database = require('../structures/PostgreSQL');

const Background = Database.db.define('backgrounds', {
	name: {
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true
	},
	price: Sequelize.INTEGER,
	description: Sequelize.STRING,
	image: Sequelize.STRING
});

module.exports = Background;
