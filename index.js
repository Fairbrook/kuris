const resolver = require('./commands');
const discordClient = require('./config/discord');
const config = require('./config');
require('./jobs');

discordClient.on('ready',()=>{
    console.log('I´m ready or whaterver...');
})

discordClient.on('message',(message)=>{
    if(message.author.bot)return;
    if(!message.content.startsWith(config.PREFIX))return;
    resolver(message);
})