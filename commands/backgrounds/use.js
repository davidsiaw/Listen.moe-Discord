const { Command } = require('discord.js-commando');

const BackgroundStore = require('../../structures/currency/BackgroundStore');
const Inventory = require('../../structures/currency/Inventory');
const UserProfile = require('../../models/UserProfile');

module.exports = class UseBackgroundCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'use-background',
			aliases: ['background-use', 'use-bg', 'bg-use'],
			group: 'backgrounds',
			memberName: 'use',
			description: 'Use a new background for your profile.',

			args: [
				{
					key: 'name',
					prompt: 'which background do you want to use?\n',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { name }) {
		let background;

		if (name === 'default' || !name) {
			background = { image: 'default' };
		} else {
			background = BackgroundStore.getItem(name);
			if (!background) return msg.reply(`a background with the name ${name} does not exist.`);

			const inventory = await Inventory.fetchInventory(msg.author.id);
			if (!inventory.hasItem(background)) return msg.reply(`you do not own the background ${name}`);
		}

		const [profile, created] = await UserProfile.findCreateFind({
			where: { userID: msg.author.id },
			defaults: {
				userID: msg.author.id,
				background: background.image
			}
		});
		if (!created) await profile.update({ background: background.image });

		if (name === 'default' || !name) return msg.reply(`you are now using the default background for your profile.`);
		return msg.reply(`you are now using ${name} for your profile.`);
	}
};