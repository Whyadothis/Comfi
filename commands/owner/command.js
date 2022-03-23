/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const {
	CommandInteraction,
	EmbedBuilder
} = require('discord.js')
const clients = require('../../models/Client')

module.exports = {
	name: 'command',
	description: "Enable or Disable Comfi's commands ",
	ownerOnly: true,
	options: [
		{
			type: 1,
			description: 'disable a command',
			name: 'disable',
			options: [
				{
					name: 'name',
					type: 3,
					description: 'command name to disable',
					required: true
				}
			]
		},
		{
			type: 1,
			description: 'enable a command',
			name: 'enable',
			options: [
				{
					name: 'name',
					type: 3,
					description: 'name of command to enable',
					required: true
				}
			]
		}
	],
	userperm: ['ADMINISTRATOR'],
	botperm: ['MANAGE_GUILD'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (bot, interaction, args) => {
		const [choice] = args

		const name = interaction.options.getString('name')
			const client = await clients.findOne({ clientId: bot.user.id })
    
		if (choice === 'disable') {
			const validCommand = bot.slashCommands.find(
				cmd => cmd.name.toLowerCase() === name.toLowerCase()
			)
			if (!validCommand) {
				const embed = new EmbedBuilder()
					.setDescription(` >  ${bot.crosss} • Please supply a valid command!`)
					.setColor(bot.color)

				return await interaction.editReply({ embeds: [embed] })
			}
			client.blackListedCmds.push(validCommand.name)
			await client.save()

			const embed = new EmbedBuilder()
				.setDescription(
					` >  ${bot.tick} • Command \`${
						validCommand.name
					}\` has been disabled!`
				)
				.setColor(bot.color)

			return await interaction.editReply({ embeds: [embed] })
		} else if (choice === 'enable') {
			const validCommand = bot.slashCommands.find(
				cmd => cmd.name.toLowerCase() === name.toLowerCase()
			)
			if (!validCommand) {
				const embed = new EmbedBuilder()
					.setDescription(` >  ${bot.crosss} • Please supply a valid command!`)
					.setColor(bot.color)

				return await interaction.editReply({ embeds: [embed] })
			}
			if (!client.blackListedCmds.includes(validCommand.name)) {
				const embed = new EmbedBuilder()
					.setDescription(
						` >  ${bot.crosss} • Please supply a valid disabled command!`
					)
					.setColor(bot.color)

				return await interaction.editReply({ embeds: [embed] })
			} else if (client.blackListedCmds.includes(validCommand.name)) {
				await clients.findOneAndUpdate(
          {
            clientId: bot.user.id 
          },
          {
            $pull: { blackListedCmds: validCommand.name }
          }
)

      
				const embed = new EmbedBuilder()
					.setDescription(
						` >  ${bot.tick} • Command \`${
							validCommand.name
						}\` has been enabled!`
					)
					.setColor(bot.color)

				return await interaction
					.editReply({ embeds: [embed] })
			}
		}
	}
}
