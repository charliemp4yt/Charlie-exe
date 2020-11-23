const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "setbal",
    description: "sets target user's balance",
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        if (msg.guild.id === "742556589344424036") {
            if (!msg.member.id === 291633488535486474) return
        } else if (!msg.member.hasPermission(`MANAGE_GUILD`)) return msg.channel.send("You do not have the permissions necessary to run this command!").then(m => m.delete({ timeout: 5000 }))
        let user = msg.mentions.members.first() || msg.author
        let userUsername = user.username || user.user.username
        let newBal = args.slice(1).join(" ")
        if (isNaN(newBal)) return msg.channel.send("That is not a number!").then(m => m.delete({ timeout: 5000 }))
        if (user === msg.author) newBal = args.join(" ")
        await db.delete(`coins_${msg.guild.id}_${user.id}`)
        await db.add(`coins_${msg.guild.id}_${user.id}`, newBal)
        msg.channel.send(`**${userUsername}** now has **${newBal}** coins!`)
    }
}