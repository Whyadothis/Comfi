/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder } = require("discord.js");
const guilds = require("../../models/guild")

module.exports = {
    name: "test",
    description: "Test boost, leave or welcome message",
    ownerOnly: false,
  directory: "setting",
    options: [
        {
            type: 1,
            description: 'Test Boost Detector System',
            name: 'boost',
        },
        {
            type: 1,
            description: 'Test Leave System',
            name: 'leave',
        },
        {
            type: 1,
            description: 'Test Welcome System',
            name: 'welcome',
        },
    ],
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
 
try {
     
    let guild = await guilds.findOne({ 
      guildId: interaction.guild.id
    });
    
  let [ sub ] = args 
  
  if (sub === "boost") {
    if (guild.boost) {
    bot.emit("guildMemberUpdate", interaction.member)         
    interaction.editReply({content: `${bot.tick} • Tested Boost Detector System!`})
    } else {
      interaction.editReply({content: `${bot.crosss} • Boost Detector is Disabled`})
    }
  }
    
  if (sub === "leave") {
    if (guild.leave) {
    bot.emit("guildMemberLeave", interaction.member)         
    interaction.editReply({content: `${bot.tick} • Tested leave system!`})
} else {
  interaction.editReply({content:  `${bot.crosss} • Leave System is Disabled `})
}
  }
   
  if (sub === "welcome") {
    if (guild.welcome) {
    bot.emit("guildMemberAdd", interaction.member)         
    interaction.editReply({content: `${bot.tick} • Tested Welcome System!`})
    } else {
      interaction.editReply({content: `${bot.crosss} • Welcomes System is Disabled `})
    }
  }

    } catch (e) {
			let emed = new EmbedBuilder()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
            }
  
    }}