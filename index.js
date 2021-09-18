//----------[ LOADING BOT ]----------\\

console.clear();
console.log('Loading Bot...');

//-----[ DEFINING DEPENDENCIES ]-----\\

const Discord = require("discord.js");
const Nuggies = require('nuggies');
const Levels = require("discord-xp");

const Comfi = require("./utils/Comfi"),	
bot = new Comfi();

module.exports = bot;

//--------[ PROCESS STARTED ]--------\\ 

Nuggies.handleInteractions(bot);

Levels.setURL(process.env.Levels)

require( `events` ).EventEmitter.defaultMaxListeners = 200;

//--------[ HANDLING ERRORS ]--------\\
/**
process.on('unhandledRejection', error => { 
  const channel = bot.channels.cache.get("880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(':x: Error')
    .setDescription(`${error}`)
    .setColor('RED')
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp();
  
    channel.send({ embeds: [ embed ]});
});
*/
//---------[ PROCESS ENDED ]---------\\