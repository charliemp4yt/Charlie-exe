const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "clearinv",
    description: "clears inventory",
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return
        await db.delete(`inv_${msg.guild.id}_${msg.author.id}`)
        msg.channel.send('Cleared.')
    }
}