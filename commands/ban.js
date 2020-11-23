const Discord = require('discord.js')


module.exports = {
    name: "ban",
    description: "bans selected user",
    execute(msg, args, bot) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
            return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }))
        }

        let guild = msg.guild

        let moderator = msg.author

        let user = msg.mentions.users.first();
        if (!user) {
            return msg.channel.send("Mention a user to ban!").then(m => m.delete({ timeout: 5000 }))
        }

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason specified"

        const bannedEmbed = new Discord.MessageEmbed()
            .setTitle("Successfully Banned User")
            .setColor("RANDOM")
            .addField("User Banned", user)
            .addField("Banned by", moderator)
            .addField("Banned for", reason)
            .setFooter("Banned")
            .setTimestamp()

        const userBannedEmbed = new Discord.MessageEmbed()
            .setTitle("You were banned!")
            .setColor("RANDOM")
            .addField("Banned in", guild)
            .addField("Banned by", moderator)
            .addField("Banned for", reason)
            .setFooter("You were banned")
            .setTimestamp()

        const member = msg.guild.member(user);
        try {
            if (member) {
                member.send(userBannedEmbed)
                member.ban().then(() => {
                    msg.channel.send(bannedEmbed)
                })
            }
        } catch (e) {
            msg.channel.send("I cannot ban this user!").then(m => m.delete({ timeout: 5000 }))
            console.log(e)
        }
    }
}