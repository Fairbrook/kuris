const { search } = require("./utils");
const Discord =require('discord.js');
const discordClient = require('../../config/discord');
const keyv = require("../../config/keyv");
const emojis = ['1️⃣','2️⃣','3️⃣','4️⃣'];

async function addAnime(userId, animeName){
    const [animes, users] = await Promise.all([keyv.get(userId), keyv.get(animeName)]);
    if(!animes || !animes.includes(animeName)){
        keyv.set(userId, animes? [...animes, animeName] : [animeName])
    }
    if(!users || !users.includes(userId)){
        keyv.set(animeName, users ? [...users, userId] : [userId])
    }
}

async function remindme(message, args){
    const animes = await search(args.join(' '));
    if(!animes || !animes.length){
        message.reply('No se de que hablas');
        return;
    }
    const newMsg = new Discord.MessageEmbed();
    
    newMsg.setTitle('¿Cual de estos es el correcto?');
    animes.forEach((a, index)=>newMsg.addField(`${index+1}. ${a.label}`, a.type))
    message.channel.send(newMsg).then(async (msg)=>{
        await Promise.all(animes.map((a,index)=>msg.react(emojis[index])));

        const collector = msg.createReactionCollector(
            ({_emoji})=> emojis.includes(_emoji.name),
            {max:1, time:60000}
        );

        collector.on('collect', (reaction, user)=>{
            addAnime(user.id, animes[parseInt(reaction._emoji.name,10)-1].title)
            message.reply('Quizá lo recuerde hum');
        })
    });
}

module.exports = remindme;