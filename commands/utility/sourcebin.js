/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const sourcebin = require('sourcebin_js'),
	{ EmbedBuilder, ButtonBuilder, ActionRowBuilde } = require('discord.js')

module.exports = {
	name: 'sourcebin',
	description: 'Instantly share your code with the world using sourcebin',
  directory: "utility",
	options: [
		{
			type: 3,
			name: 'title',
			description: 'What is the title of your code?',
			required: true
		},
		{
			type: 3,
			name: 'language',
			description: 'What is the language of your code?',
			required: true,
			choices: [
				{
					name: 'None',
					value: 'NONE'
				},
				{
					name: 'JavaScript',
					value: 'JavaScript'
				},
				{
					name: 'Html',
					value: 'HTML'
				},
				{
					name: 'Python',
					value: 'Python'
				},
				{
					name: 'Java',
					value: 'Java'
				},
				{
					name: 'Css',
					value: 'CSS'
				},
				{
					name: 'SVG',
					value: 'SVG'
				},
				{
					name: 'C#',
					value: 'C#'
				},
				{
					name: 'XML',
					value: 'XML'
				}
			]
		},
		{
			type: 3,
			name: 'code',
			description: "What's the code?",
			required: true
		}
	],
	ownerOnly: false,
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const Content = interaction.options.getString('code')
		const Title = interaction.options.getString('title')
		const language = interaction.options.getString('language')

try {
    
		sourcebin
			.create(
				[
					{
						name: 'Made By ' + interaction.user.username,
						content: Content,
						languageId: language
					}
				],
				{ title: Title }
			)
			.then(src => {
				let embed = new EmbedBuilder()
					.setTitle(`Comfi™ Sourcebin`)
					.setColor(bot.color)
					.setDescription(`Code:\n\`\`\`js\n${Content}\n\`\`\``)

				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle(5)
						.setURL(`${src.url}`)
						.setLabel('Bin Url!')
				)

				interaction.followUp({
					components: [row],
					embeds: [embed]
				})
			})
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
