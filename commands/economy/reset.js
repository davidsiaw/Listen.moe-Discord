const { Command } = require('discord.js-commando');

const Currency = require('../../structures/currency/Currency');
const UserProfile = require('../../models/UserProfile');

module.exports = class MoneyResetCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reset-money',
			aliases: [
				'money-reset',
				'reset-donut',
				'reset-donuts',
				'reset-doughnut',
				'reset-doughnuts',
				'donut-reset',
				'donuts-reset',
				'doughnut-reset',
				'doughnuts-reset'
			],
			group: 'economy',
			memberName: 'reset',
			description: `Reset ${Currency.textPlural}.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {
		const profiles = await UserProfile.findAll();
		for (const profile of profiles) profile.update({ money: 0, balance: 0, networth: 0, experience: 0 });
		await this.client.redis.delAsync('money');
		await this.client.redis.delAsync('moneyleaderboard');
		return msg.reply(`successfully reset currency.`);
	}
};
