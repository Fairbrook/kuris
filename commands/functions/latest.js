const Discrod = require('discord.js');
const config = require('../../config');
const keyv = require('../../config/keyv');

async function getLatest(message){
    const episodes = await keyv.get('episodes');
    const embeded = new Discrod.MessageEmbed();
    embeded.setDescription(episodes.map((e)=>` [${e.label} - ${e.episode}](https://animeflv.net/ver/${e.title}) `));
    embeded.setTitle('Ultimos capitulos');
    embeded.setColor(config.COLOR);
    message.channel.send(embeded);
}

module.exports = getLatest;