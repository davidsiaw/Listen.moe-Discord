const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const request = require('snekfetch');

const Background = require('../../models/Background');
const BackgroundItem = require('../../structures/currency/BackgroundItem');
const BackgroundStore = require('../../structures/currency/BackgroundStore');

module.exports = class BackgroundAddCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'background-add',
			aliases: ['add-background', 'bg-add', 'add-bg'],
			group: 'backgrounds',
			memberName: 'add',
			description: 'Add a new background for users to buy.',

			args: [
				{
					key: 'name',
					prompt: 'what should the background be called?\n',
					type: 'string'
				},
				{
					key: 'price',
					prompt: 'what should the background cost?\n',
					type: 'string'
				},
				{
					key: 'description',
					prompt: 'what description should the background have?\n',
					type: 'string'
				},
				{
					key: 'file',
					prompt: 'what should the file be called?\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, { name, price, description }) {
		const image = msg.attachments.first();
		if (!image) return msg.reply('please attach an image to use for the background.');

		const [, created] = await Background.findCreateFind({
			where: { name },
			defaults: {
				name,
				price,
				description,
				image: name
			}
		});

		if (!created) return msg.reply('that name is already in use. Please use a different one.');

		BackgroundStore.registerItem(new BackgroundItem(name, description, price, name));

		const filepath = path.join(__dirname, '..', '..', 'assets', 'profile', 'backgrounds', `${name}.png`);
		request.get(image.url).pipe(fs.createWriteStream(filepath));

		return msg.reply('successfully added the background');
	}
};
