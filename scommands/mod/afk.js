const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "afk",
    description: "Sets your afk in the server",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Reason for going afk',
            name: 'reason',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
    if (await db.has(`afk-${interaction.user.id}+${interaction.guild.id}`)) return
    
		const content = args.join(' ') || 'No Reason';
		await db.set(`afk-${interaction.user.id}+${interaction.guild.id}`, content);
		await db.set(`aftime-${interaction.user.id}+${interaction.guild.id}`, Date.now());
		const embed = new MessageEmbed()
			.setDescription(`You have been set to afk\n**Reason :** ${content}`)
			.setColor('GREEN')
			.setAuthor(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
    .setFooter("Use /rafk or type a message to remove your AFK");

    if(interaction.member.manageable) interaction.member.setNickname("[AFK] " + interaction.member.displayName)
		interaction.editReply({ embeds: [ embed ]});
	}
};