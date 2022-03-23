/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder } = require('discord.js')
const users = require(`../../models/users`)
const guilds = require('../../models/guild')

module.exports = {
	name: 'reset_levels',
	description: 'Reset Server Level System',
  directory: "level",
	ownerOnly: false,
	botperm: ['MANAGE_GUILD'],
	userperm: ['ADMINISTRATOR'],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const guild = await guilds.findOne({ guildId: interaction.guild.id })

		try {

				if (guild.leveling) {
					await interaction
						.editReply({ content: `${bot.cross} • Resetting all user levels.` })
						.then(async msg => {
							const mem = await interaction.guild.members.fetch()
                mem.forEach(async m => {
		
                  const user = await users.findOne({
									userId: m.id,
									guildId: interaction.guild.id
								})
								if (user) {
									await users.findOneAndUpdate(
										{ userId: m.id, guildId: interaction.guild.id },
										{
											level: 0,
											xp: 0,
											requiredXp: 500
										}
									)
								}
							})
							return await msg
								.edit({
									content: `${bot.tick} • All user levels have been reset!`
								})
								.catch(() => null)
						})
				} else {
					return await interaction
						.editReply({
							content: `${
								bot.crosss
							} • Please setup leveling before using this command!`
						})
						.catch(() => null)

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
