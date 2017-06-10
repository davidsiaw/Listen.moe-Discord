const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

const Store = require('../../structures/currency/Store');
const UserProfile = require('../../models/UserProfile');

module.exports = class BackgroundDeleteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'background-delete',
			aliases: [
				'delete-background',
				'bg-delete',
				'delete-bg',
				'background-del',
				'del-background',
				'bg-del',
				'del-gb'
			],
			group: 'backgrounds',
			memberName: 'del',
			description: 'Delete a background so users can\'t buy it anymore.',

			args: [
				{
					key: 'name',
					prompt: 'what background do you want to delete?\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, { name }) {
		const background = await Store.getItem(name, 'background');
		if (!background) return msg.reply('no such background exists.');
		await Store.removeItem(name);
		UserProfile.update({ background: 'default' }, { where: { background: background.image } });

		const filepath = path.join(__dirname, '..', '..', 'assets', 'profile', 'backgrounds', `${background.image}.png`);
		fs.unlink(filepath);

		return msg.reply(`successfully deleted the background ${name}`);
	}
};
