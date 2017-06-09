class BackgroundStoreItem {
	constructor(name, description, price) {
		this.name = name;
		this.description = description;
		this.price = price;
	}

	get image() {
		return this.name.toLowerCase();
	}
}

module.exports = BackgroundStoreItem;
