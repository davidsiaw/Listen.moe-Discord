const Sequelize = require('sequelize');

const Database = require('../structures/PostgreSQL');

const Item = Database.db.define('items', {
	name: {
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true
	},
	price: Sequelize.INT,
	type: Sequelize.STRING,
	data: Sequelize.JSONB
});

module.exports = Item;
