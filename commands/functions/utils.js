const frases = require('../frases.json');
const Api = require('animeflv-scrapper');
const keyv = require('../../config/keyv');

exports.randomFrase = ()=>{
    return frases[Math.round(Math.random()*(frases.length-1))];
}

exports.search = async (search)=>{
    let searchRes = await keyv.get(`search:${search}`);
    if(!searchRes){
        searchRes = (await Api.searchAnime(search)).slice(0,4);
        keyv.set(`search:${search}`, searchRes, 600000);   
    }
    return searchRes;
}