const { ShardingManager } = require('discord.js');
const path = require('path');

const { TOKEN } = process.env;

const manager = new ShardingManager(path.join(__dirname, 'Listen.js'), { token: TOKEN });

manager.spawn(undefined, 1000);
