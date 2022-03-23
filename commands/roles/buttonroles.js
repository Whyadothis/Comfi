/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/
const { ChannelType, EmbedBuilder } = require("discord.js")
const simplydjs = require('simply-djs')

module.exports = {
	name: 'buttonrole',
	description: 'Reaction Roles With Buttons',
  directory: "role",
	ownerOnly: false,
	options: [
		{
			name: 'add',
			description: 'Add Reaction Role to Bot msg only',
			type: 1,
			options: [
				{
					name: 'channel',
					type: 7,
					description: 'channel of that message',
					required: true,
					channelTypes: [ ChannelType.GuildText ]
				},
				{
					name: 'message',
					type: 3,
					description: 'the message id',
					required: true
				},
				{
					name: 'role',
					type: 8,
					description: 'Role to Add',
					required: true
				},
				{
					name: 'label',
					type: 3,
					description: 'name of the button ?',
					required: false
				},
				{
					name: 'style',
					type: 3,
					description: 'color of the button',
					required: false,
					choices: [
						{
							name: 'Blue',
							value: 'PRIMARY'
						},
						{
							name: 'Grey',
							value: 'SECONDARY'
						},
						{
							name: 'Green',
							value: 'SUCCESS'
						},
						{
							name: 'Red',
							value: 'DANGER'
						}
					]
				},
				{
					name: 'emoji',
					type: 3,
					description: 'emoji for the button',
					required: false
				}
			]
		},
		{
			name: 'remove',
			description: 'Removes roles from a bot message',
			type: 1,
			options: [
				{
					name: 'channel',
					type: 7,
					description: 'channel of that message',
					required: true,
					channelTypes: [ 0 ]
				},
				{
					name: 'message',
					type: 3,
					description: 'the message id',
					required: true
				},
				{
					name: 'role',
					type: 8,
					description: 'Role to remove',
					required: true
				}
			]
		}
	],
	userperm: [''],
	botperm: [''],
	run: async (bot, interaction, args) => {
		let [options] = args

		try {
			if (options === 'add') {
				simplydjs.betterBtnRole(bot, interaction, {
					type: 'add'
				})
			}

			if (options === 'remove') {
				simplydjs.betterBtnRole(bot, interaction, {
					type: 'remove'
				})
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
