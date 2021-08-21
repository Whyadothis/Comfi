const Discord = require('discord.js');
const { PREFIX } = require('../config.js');
const simplydjs = require('simply-djs');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const db = require('quick.db') 
const startAt = Date.now() 

// const express = require('express');
// const app = express();
// const port = 5000;
   
module.exports.run = async (bot, message) => {
   //app.get('/', (req, res) => res.send('Your bot is alive!'))

// app.listen(port, () =>
//console.log(`Your app is listening a http://localhost:${port}`)
//);
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: watching ${bot.commands.size} Commands, ${bot.guilds.cache.size} Servers, ${
			bot.channels.cache.size
		} channels & ${bot.users.cache.size} users`
	);
	console.log('-------------------------------------');

const arrayOfStatus = [
    `in ${bot.guilds.cache.size} servers`,
    `in ${bot.channels.cache.size} channels`,
    `with ${bot.guilds.cache.reduce(
				(users, value) => users + value.memberCount,
				0
			)} members`,
    `${PREFIX}help | Stay Safe :)`,
	  `✦ . House of Emotes ˚ ₊ ⊹`,
  ];

  let index = 0;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    bot.user.setActivity(`${status}`, {
      type: "WATCHING",
      url: "https://www.twitch.tv/blue666opislive",
    });
    index++;
  }, 5000);
 //You Can Set The Type To PLAYING/WATCHING/COMPETING/LISTENING. 
	   
  
 /**
   simplydjs.ytNotify(bot, db, { 
    ytID: '',
    ytURL: 'https://www.youtube.com/channel/UCIDdxLRPazURj_Oxe0x7ZUQ', // channel URL || You can also make as Array like ['channel 1', 'channel 2'] 
    chid: '820520288419971102', // Discord channel id to post the message
    startAt: startAt, // REQUIRED (to check if the vid is uploaded after the bot started) 
    msg: `(„• ֊ •„). <a:pink_pinkstar_HE:796373386330374154:> __**new upload**__ <a:bf_HE:796373377878589490:> \n ━━O━O━━━━━━━━━━━━ \n ₊˚๑ <a:paw_HE:796373419909972028> ꒱《 __**{author}**__ 》 just posted a video! ✦ \n ✎ <a::pinkheartsu_HE:796373357280362517:> ˗ˏˋ go and check it out! \n <a:pinktea_HE:796373339651571744> have a wonderful day ʕ · ﻌ ·ᐢ₎ .˚₊﹆ \n {link} \n ✎ <a:Pink_Bow_HE:783028553897869332> ˗ˏˋ @everyone <:pinkexplanation_HE:796373361936039936>  \n ━━━━━━━━━━━━━━━━━`,

   }) */
  
}