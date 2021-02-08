const Discord = require('discord.js');
const config = require('./index');
const client = new Discord.Client();
client.login(config.BOT_TOKEN);

module.exports = client;