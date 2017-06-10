const Item = require('./Item');

module.exports = class BackgroundItem extends Item {
	constructor(name, price, data) {
		super(name, price, 'background', data);
	}

	get image() {
		return this.name.toLowerCase();
	}

	get description() {
		return this._data.description;
	}
};
