/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const {
  CommandInteraction,
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder
} = require('discord.js')
const clients = require('../../models/Client')

module.exports = {
  name: 'blacklist',
  description: 'manage a member to prevent using bot',
  ownerOnly: true,
  options: [
    {
      type: 1,
      description: 'user to blacklist',
      name: 'add-user',
      options: [
        {
          name: 'user',
          type: 6,
          description: 'user to add to blacklist',
          required: true
        }
      ]
    },
    {
      type: 1,
      description: 'user to remove from blacklist',
      name: 'remove-user',
      options: [
        {
          name: 'user',
          type: 6,
          description: 'user to blacklist',
          required: true
        }
      ]
    },
    {
      name: 'panel',
      description: 'panel of blacklisted users',
      type: 1
    },
    {
      type: 1,
      description: 'Add a guild to blacklist',
      name: 'add-guild',
      options: [
        {
          name: 'guild',
          type: 3,
          description: 'guild to add to blacklist',
          required: true
        }
      ]
    },
    {
      type: 1,
      description: 'remove a guild from blacklist',
      name: 'remove-guild',
      options: [
        {
          name: 'guild',
          type: 3,
          description: 'guild to blacklist',
          required: true
        }
      ]
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
    const [choice] = args
    const user = interaction.options.getMember('user')
    const member = bot.users.cache.get(user.id)
    const guild = interaction.options.getString('guild')

    const client = await clients.findOne({ clientId: bot.user.id })
try {
    if (choice === 'add-user') {
      if (!client.blackListedUsers.includes(member.id)) {
        client.blackListedUsers.push(member.id)
        await client.save()
        interaction.editReply(
          'Successfully added member to the blacklist database.'
        )
      } else {
        interaction.editReply('Target member is already blacklis in database.')
      }
    } else if (choice === 'remove-user') {
      if (client.blackListedUsers.includes(member.id)) {
        const index = client.blackListedUsers.indexOf(member)

        if (index > -1) {
          client.blackListedUsers.splice(index, 1)
        }
        await client.save()
        interaction.editReply(
          'Successfully removed member from the blacklist database.'
        )
      } else {
        interaction.editReply('Target member is not in blacklist database.')
      }
    } else if (choice === 'panel') {
      if (!client ?.blackListedUsers.length)
        return interaction.editReply(
          'There is no blacklisted member in this server!'
        )

      let mem;

      const options = client ?.blackListedUsers.map(b => {
        mem = bot.users.cache.find(x => x.id === b)
      })

      const opt = {
        label: mem ? mem.user.username : 'No members',
        value: mem ? mem.user.id : 'No members id',
        description: 'No description'
      }

      const embeds = [
        new EmbedBuilder().setTitle('Please select a member below')
      ]
      const components = [
        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId('b-panel')
            .setMaxValues(1)
            .addOptions(opt)
        )
      ]

      await interaction.editReply({ embeds, components })
    } else if (choice === 'add-guild') {

      if (bot.guilds.cache.get(guild)) {

        if (!client ?.blackListedServers.includes(guild)) {
          client ?.blackListedServers.push(guild)
				await client.save()
          interaction.editReply(
            'Successfully added guild to the blacklist database.'
          )
        } else {
          interaction.editReply('Target guild is already blacklis in database.')
        }
      } else return interaction.editReply(`${bot.error} • Invalid Guild`);
    } else if (choice === 'remove-guild') {

      if (interaction.guilds.cache.get(guild)) {

        if (client ?.blackListedServers.includes(guild)) {
          const index = client ?.blackListedServers.indexOf(guild)

				if (index > -1) {
            client ?.blackListedServers.splice(index, 1)
				}
          await client.save()
          interaction.editReply(
            'Successfully removed guild from the blacklist database.'
          )
        } else {
          interaction.editReply('Target guild is not in blacklist database.')
        }
      } else return interaction.editReply(`${bot.error} • Invalid Guild`);
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
