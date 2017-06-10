module.exports = class Item {
	constructor(name, price, type, data) {
		this.name = name;
		this.price = price;
		this.type = type;
		this._data = data || {};
	}
};
