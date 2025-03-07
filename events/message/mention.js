const bot = require('../../index')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('messageCreate', async message => {
	if (message.author.bot) return

	let mentionRegex = message.content.match(
		new RegExp(`^<@!?(${bot.user.id})>`, 'gi')
	)
	if (mentionRegex) {
		let totalCommands = 0
		bot.slashCommands.each(c => totalCommands++)
		const ping = new MessageEmbed()
			.setDescription(
				` > ɛiɜ • **Hello I'm ${
					bot.user.username
				}**!\n\n > ↛ • You can see all my commands by running \`/helpp\`!\n > ↛ • I have a total of **${
					bot.guilds.cache.size
				}** servers, **${
					bot.users.cache.size
				}** users, ${bot.emojis.cache.size} emojis and ${totalCommands} commands !!`
			)
			.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
			.setColor(bot.color)
			.setFooter({text: `Requested by ${message.author.username}`})
			.setTimestamp()

		let sup = new MessageButton()
			.setStyle('LINK')
			.setLabel('Join Support!')
			.setURL(bot.support)
			.setEmoji('883032991293653062')

		let inv = new MessageButton()
			.setStyle('LINK')
			.setLabel('Invite Me!')
			.setURL(bot.dash + 'invite')
			.setEmoji('883017868944502804')

		let dash = new MessageButton()
			.setStyle('LINK')
			.setLabel('Check Dashboard!')
			.setURL(bot.dash)
			.setEmoji('883017884014637066')

		let row = new MessageActionRow().addComponents(sup, inv, dash)

    try {
    
		await message
			.reply({
				embeds: [ping],
				components: [row],
				allowedMentions: { repliedUser: false }
			})
    } catch {
        await bot.senderror(message, e)
    }
	}
})
