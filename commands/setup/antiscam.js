/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const guilds = require('../../models/guild');
const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "antiscam",
  description: "Sets the antiscam system",
  ownerOnly: false,
  directory: "setting",
  options: [{
    type: 1,
    description: 'Sets the antiscam toggle true/false',
    name: 'toggle',
    options: [{
      type: 3,
      description: 'Toggle antiscam system',
      name: 'option',
      required: true,
      choices: [
        {
          name: 'true/on',
          value: 'true'
        },
        {
          name: 'false/off',
          value: 'false'
        }
      ],
    },
    ],
  },
  {
    type: 1,
    description: 'Sets the duration for antiscam timeout',
    name: 'duration',
    options: [
      {
        type: 3,
        description: 'time for timeout, default 12hrs',
        name: 'time',
        required: true,
      },
    ],
  },
  {
    type: 1,
    description: 'Disables the antiscam system',
    name: 'disable',
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
    let [option] = args

    const guild = await guilds.findOne({ guildId: interaction.guild.id })

   try {
    
    if (option === 'toggle') {
      const toggle = interaction.options.getString('option')
      
      if (guild.anti_scam.toString() === toggle) {

        return await  bot.errorEmbed(bot, interaction, `Antiscam toggle is already setted as ${toggle}`)
      } else {
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          anti_scam: toggle
        })
        return await bot.successEmbed(bot, interaction, `The Antiscam toggle for **${
          interaction.guild.name
          }** has been set to: **${toggle}**`
        );
      }
    }

    if (option === 'duration') {

      const time = interaction.options.getString('time');

        const Time = bot.ms(time)
        if (!Time) {
        return await  bot.errorEmbed(bot, interaction, `**Provide a valid time in d, h, m, s, ms format`)
        }

        if (Time <= 10000) {
        return await  bot.errorEmbed(bot, interaction, `**Time cant be lesser than 10 seconds**`)
        }

        if (Time > 2332800000) {
        return await  bot.errorEmbed(bot, interaction, `**Time can't be greater than 27 days !!**`)
        }

        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          anti_scam_time: Time,
        })
        return await bot.successEmbed(bot, interaction, `**Successfully setted antiscam timeout as ${time}**`)

      }

    if (option === 'disable') {
      if (!guild.anti_scam) {
        return await  bot.errorEmbed(bot, interaction, `**Please enable antiscam first or i cant disable it!**`);
      } else {
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          anti_scam: false,
          anti_scam_time: "43200000",
        })
        return await bot.successEmbed(bot, interaction, `**Disabled the Antiscam System in the server :)**`);
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
   }}
}