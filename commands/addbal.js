const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "addbal",
    description: "adds amount to users balance",
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        if (!msg.member.hasPermission(`MANAGE_GUILD`)) return msg.channel.send("You do not have the permissions necessary to run this command!").then(m => m.delete({ timeout: 5000 }))
        let user = msg.mentions.members.first() || msg.author
        let userUsername = user.username || user.user.username
        let addAMT = args.slice(1).join()
        if (user === msg.author) addAMT = args.join(" ")
        if (isNaN(addAMT)) return msg.channel.send("That is not a number!").then(m => m.delete({ timeout: 5000 }))
        await db.add(`coins_${msg.guild.id}_${user.id}`, addAMT)
        msg.channel.send(`Added **${addAMT}** to **${userUsername}'s** account.`)
    }
}