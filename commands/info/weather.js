/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'weather',
	description: 'Gives the weather of a city',
	options: [
		{
			name: 'city',
			description: 'The city you want the weather of',
			type: 3,
			required: true
		}
	],
  directory: "info",
	userperm: [''],
	botperm: [''],
	ownerOnly: false,

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const weather = require('weather-js')
			const [city] = args
			if (!city)
				return interaction.followUp({ content: `Please Provide a valid city` })

			let degreetype = 'c'
			await weather
				.find({ search: city, degreeType: degreetype }, function(err, result) {
					if (err || result === undefined || result.length === 0)
						return interaction.followUp('Unknown City, Please Try Again.')
					let current = result[0].current
					let location = result[0].location

					const embed = new EmbedBuilder()
						.setAuthor(current.observationpoint)
						.setDescription(`> ${current.skytext}`)
						.setThumbnail(current.imageUrl)
						.setTimestamp()
						.setColor(0xdc143c)
						.addField(
          {name:'Latitude', value:`${location.lat}`, inline: true},
          {name:'Longitude', value:`${location.long}`, inline: true},
          {name:'Feels Like', value: `${current.feelslike}° Degrees`, inline: true},
          {name:'Degree Type', value: `${location.degreetype}`, inline: true},
          {name:'Winds', value: `${current.windsdisplay || 'None'}`, inline: true},
          {name:'Humidity', value: `${current.humidity}%`, inline: true},
          {name:'Timezone', value: `GMT ${location.timezone}`, inline: true},
          {name:'Temperature', value: `${current.temperature}° Degrees`, inline: true},
          {name: 'Observation Time', value:`${current.observationtime}`, inline: true })

					return interaction.followUp({ embeds: [embed] });
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
