const { PREFIX, COLOR } = require('../../config');
const {search: searchFn} = require('./utils');
const Discord = require('discord.js');

 async function search(message){
    const str = message.content.slice(`${PREFIX}search `.length);
    const searchRes = await searchFn(str);
    if(!searchRes || !searchRes.length){
        message.reply('No encontré nada, buena suerte la próxima');
        return;
    }
    
    searchRes.forEach((a)=>{
        const embeded = new Discord.MessageEmbed();
        embeded.setColor(COLOR);
        embeded.setTitle(a.label);
        embeded.addField('Link', `https://animeflv.net${a.link}`)
        embeded.addField('Tipo', a.type);
        embeded.setThumbnail(a.image);
        message.channel.send(embeded);
    })
}

module.exports = search;