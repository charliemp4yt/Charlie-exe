const Discord = require('discord.js')


module.exports = {
    name: "dm",
    description: "dms select user",
    execute(msg, args, bot) {
        let target = msg.mentions.members.first()
        let DM = args.slice(1).join(" ")
        let user = msg.author.username
        let user2 = msg.author
        let userAvatar = msg.author.avatarURL({dynamic: true, type: 'png'})
        if(!target) return msg.channel.send("Please tag the user you wish to DM!").then(m => m.delete({timeout: 5000}))
        if(!DM) return msg.channel.send("Please enter something to sent to the target user!").then(m => m.delete({timeout: 5000}))

        msg.delete().catch()
        let dmEmbed = new Discord.MessageEmbed()
            .setAuthor(user, userAvatar)
            .setColor("RANDOM")
            .setDescription(DM)
            .setFooter('Sent')
            .setTimestamp()
        target.send(dmEmbed)

        user2.send(`📬 Message sent! 📬 \n 📧 Sent **${DM}** to ${target} 📧`)

    }
}