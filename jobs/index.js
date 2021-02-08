const keyv = require('../config/keyv');
const shcedule = require('node-schedule');
const api = require('animeflv-scrapper');
const discordClient = require('../config/discord');
const Discord = require('discord.js');

async function getLatest(){
    const [episodes, storedEpisodes] = await Promise.all([
        api.getLatestEpisodes(), keyv.get('episodes')
    ]);
    keyv.set('episodes', episodes);
    if(!storedEpisodes)return;
    const newones = episodes.filter((e)=>!storedEpisodes.find((s)=>s.title===e.title));
    newones.forEach(async(a)=>{
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Nuevo capitulo de ${a.label}`)
        embed.addField('Link',`https://animeflv.net/ver/${a.title}`);
        embed.addField('Episodio', a.episode);
        const usersId = await keyv.get(a.title.split('-').slice(0,-1).join('-'));
        if(!usersId)return;
        const users = usersId.map((id)=>discordClient.users.cache.get(id)).filter((u)=>!!u);
        await Promise.all(users.map((user)=>user.send(embed)))
    })
}

keyv.get('episodes').then((e)=>{
    if(!e)getLatest();
})

const rule = new shcedule.RecurrenceRule();
rule.minute = 0;

shcedule.scheduleJob(rule, getLatest);