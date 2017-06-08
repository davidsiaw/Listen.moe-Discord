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
		BackgroundStore.registerItem(new BackgroundItem(item.name, item.desc, item.price, item.image));
	}
});

BackgroundStore.registerItem(new BackgroundItem('#1', 'The first one', 5000, '123'));
BackgroundStore.registerItem(new BackgroundItem('#2', 'The second one', 5000, '234'));
BackgroundStore.registerItem(new BackgroundItem('#3', 'The third one', 5000, '345'));

module.exports = BackgroundStore;
