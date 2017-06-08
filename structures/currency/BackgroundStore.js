const { Collection } = require('discord.js');

const Background = require('../../models/Background');
const BackgroundItem = require('./BackgroundItem');

const backgroundStoreItems = new Collection();

class BackgroundStore {
	static registerItem(item) {
		backgroundStoreItems.set(item.name, item);
	}

	static getItem(itemName) {
		return backgroundStoreItems.get(itemName);
	}

	static getItems() {
		return backgroundStoreItems;
	}

	static removeItem(itemName) {
		BackgroundStore.delete(itemName);
	}
}

Background.findAll().then(items => {
	for (const item of items) {
		BackgroundStore.registerItem(new BackgroundItem(item.name, item.description, item.price, item.image));
	}
});

module.exports = BackgroundStore;
