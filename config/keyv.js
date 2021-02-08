const Keyv = require('keyv');
const keyv = new Keyv('sqlite://database.sqlite');
keyv.on('error', (e)=>console.error(e))
module.exports = keyv;
