/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const guilds = require('../../models/guild')
const simplydjs = require('simply-djs')
const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'suggest',
	description: 'Suggestion for server',
	ownerOnly: false,
  directory: "utility",
	options: [
		{
			type: 3,
			description: 'The Suggestion',
			name: 'suggestion',
			required: true
		}
	],
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const guild = await guilds.findOne({ guildId: interaction.guild.id })
			if (guild.suggestions) {
				const suggestion = interaction.options.getString('suggestion')
				let channel = guild.suggestions_channel

				if (!channel) return

				simplydjs.suggestSystem(bot, interaction, suggestion, {
					slash: true,
					chid: `${channel}`,
					embedColor: bot.color, 
					credit: false,
					yesEmoji: `${bot.tick}`,
					yesColor: 'SECONDARY', 
					noEmoji: `${bot.crosss}`,
					noColor: 'SECONDARY'
				})
			} else if (!guild.suggestions) {
				interaction.editReply(
					`${
						bot.error
					} Please Ask an Admin to set the suggestion channel first by using **/suggestion**`
				)
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
	}
}
