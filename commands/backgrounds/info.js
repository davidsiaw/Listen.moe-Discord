const { Command } = require('discord.js-commando');

const BackgroundStore = require('../../structures/currency/BackgroundStore');
const Currency = require('../../structures/currency/Currency');

module.exports = class BackgroundInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'background-info',
			aliases: ['bg-info', 'info-background', 'info-bg'],
			group: 'backgrounds',
			memberName: 'info',
			description: 'Display information about a background.',

			args: [
				{
					key: 'name',
					prompt: 'what background do you want information on?\n',
					type: 'string'
				}
			]
		});
	}

	run(msg, { name }) {
		const background = BackgroundStore.getItem(name);
		if (!background) return msg.reply(`a background with the name ${name} does not exist.`);

		return msg.embed({
			title: `${background.name} (${Currency.convert(background.price)})`,
			description: background.description
		});
	}
};
