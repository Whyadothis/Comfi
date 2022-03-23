/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const PlayStore = require("google-play-scraper");
const { CommandInteraction, EmbedBuilder, ButtonBuilder,  ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "playstore",
    description: "Show Playstore Application Information of Given Name!",
    ownerOnly: false,
    options: [
        {
            type: 3,
            description: 'The application name',
            name: 'name',
            required: true,
        },
    ],
    directory: "info",
    userperm: [""],
    botperm: ["SEND_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => { 

    PlayStore.search({
      term: interaction.options.getString("name"),
      num: 1
    }).then(async (Data) => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return interaction.editReply(
          `No Application Found: **"${args[0]}"**`
        );
      }
try {
      let embed = new EmbedBuilder()
        .setColor(bot.color)
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addFields(
      {name: `Price`, value: `${App.priceText}`},
      {name: `Developer`, value: `${App.developer}`},
      {name: `Score`, value: `${App.scoreText}` })
        .setFooter({text: `Requested By ${interaction.user.username}`})
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(5)
          .setURL(`${App.url}`)
          .setLabel('Go to playstore !!')
      )
  
      return await interaction.editReply({embeds: [ embed ], components:  [row]});
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
    });
  }
};