/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder} = require('discord.js')

module.exports = {
	name: 'eval',
	description:
		"Evaluates the code you put in but it's only available for the my Developer and no one else!!!!!",
	ownerOnly: true,
	options: [
		{
			type: 3,
			description: 'Code to evaluate',
			name: 'code',
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
			if (
				args
					.join(' ')
					.toLowerCase()
					.includes('token')
			) {
				return interaction.editReply(
					'Are you crazy ;-; You are going to give out your token public. I stopped it hopefully...'
				)
			}

			const toEval = args.join(' ')
			await eval(toEval)
			const evaluated = eval(toEval)

			let embed = new EmbedBuilder()
				.setColor(bot.color)
				.setTimestamp()
				.setFooter({text: bot.user.username })
				.setTitle('Eval')
				.addFields({
					name: 'To Evaluate',
					value: `\`\`\`js\n${args.join(' ')}\n\`\`\``
          },
      {name: 'Evaluated:', value: `\`\`\`${evaluated || '??'}\`\`\``},
      {name: 'Type of:', value: `\`\`\`${typeof evaluated || '?'}\`\`\``})

			interaction.editReply({ embeds: [embed] })
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
