const { Interaction, MessageEmbed } = require('discord.js')
const bot = require(`../../index`)
const guilds = require(`../../models/guild`)

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

/**
 * @param {Interaction} interaction
 */

bot.on('interactionCreate', async interaction => {
  if (interaction.isSelectMenu()) {
    const guild = await guilds.findOne({ guildId: interaction.guild.id })
    if (guild.dropdownRoles.length > 0) {
      if (interaction.customId === 'dropdown_roles') {
        if (!interaction.guild.me.permissions.has('MANAGE_ROLES'))
          return interaction
            .reply({
              content: `${
                bot.crosss
                } • I am missing the required permissions to give you these roles!`
            })
            .catch(() => null)
        guild.dropdownRoles.forEach(async (dd) => {
          if (dd.msgId === interaction.message.id) {
            if (interaction.values[0] === 'place_holder') {
              interaction.deferUpdate()
            } else {
              dd.roles.forEach(async (r) => {
                if (r.role === interaction.values[0]) {
                  const member = interaction.member
                  let hasrole = false
                  interaction.member.roles.cache.forEach(x => {
                    if (x.id === r.role) {
                      hasrole = true
                      return
                    }
                  })

                  if (hasrole) {

                    setTimeout(async () => {

                      await interaction.member.roles.remove(r.role).catch(() => null)
                      const embed = new MessageEmbed()
                        .setDescription(
                          `> ${bot.tick} • I have removed the <@&${
                          r.role
                          }> role from you!`
                        )
                        .setColor(bot.color)
                      await interaction
                        .reply({ embeds: [embed], ephemeral: true })
                        .catch(() => null)
                    }, 20000)
                  } else {

                    setTimeout(async () => {

                      await interaction.member.roles.add(r.role).catch(() => null)
                      const embed = new MessageEmbed()
                        .setDescription(
                          `> ${bot.tick} • I have given you the <@&${
                          r.role
                          }> role!`
                        )
                        .setColor(bot.color)
                      await interaction
                        .reply({ embeds: [embed], ephemeral: true })
                        .catch(() => null)

                    }, 20000)

                  }
                }
              })
            }
          }
        })
      }
    }
  }
})
