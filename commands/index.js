const config = require('../config');
const latest = require('./functions/latest');
const tsun = require('./functions/tsun');
const search = require('./functions/search');
const remindme = require('./functions/remindme');
const { randomFrase } = require('./functions/utils');
const discordClient = require('../config/discord');

const commands = {
    latest,
    tsun,
    search,
    remindme
}

function resolver(message){
    const body = message.content.slice(config.PREFIX.length);
    const args = body.split(' ');
    const command = args.shift().toLowerCase();
    if(!commands[command]){
        message.reply('uh? Eres tan idiota que no puedes escribir bien?');
        return;
    }
    message.reply(randomFrase());
    commands[command](message, args);
}

module.exports = resolver;