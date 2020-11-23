const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "pay",
    description: "pay target user money",
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        let target = msg.mentions.members.first()
        if (!target) return msg.channel.send("You need to specify a user to transfer money to.").then(m => m.delete({ timeout: 5000 }))
        let payAMT = args.slice(1).join(" ")
        if (!payAMT) return msg.channel.send("Please specify how much you'd like to pay the target user.").then(m => m.delete({ timeout: 5000 }))
        let user = msg.author
        if (isNaN(payAMT)) return msg.channel.send("That is not a number!").then(m => m.delete({ timeout: 5000 }))
        let isPayAMT = await db.fetch(`coins_${msg.guild.id}_${user.id}`)
        if (isPayAMT < payAMT) return msg.channel.send("You don't have enough coins in your account to do this!").then(m => m.delete({ timeout: 5000 }))
        await db.subtract(`coins_${msg.guild.id}_${user.id}`, payAMT)
        await db.add(`coins_${msg.guild.id}_${target.user.id}`, payAMT)
        const payEmbed = new Discord.MessageEmbed()
            .setTitle("Wire Transfer")
            .setDescription(`**${user.username}** has paid **${payAMT}** coins to **${target.user.username}**`)
            .setColor("RANDOM")
            .setFooter(user.username, user.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTimestamp()
        msg.channel.send(payEmbed)
    }
}