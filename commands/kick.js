const Discord = require('discord.js')


module.exports = {
    name: "kick",
    description: "kick select user",
    execute(msg, args, bot) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) {
            return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }))
        }

        let guild = msg.guild

        let moderator = msg.author

        let user = msg.mentions.users.first();
        if (!user) {
            return msg.channel.send("Mention a user to kick!").then(m => m.delete({ timeout: 5000 }))
        }

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason specified"

        const kickedEmbed = new Discord.MessageEmbed()
            .setTitle("Successfully Kicked User")
            .setColor("RANDOM")
            .addField("User Kicked", user)
            .addField("Kicked by", moderator)
            .addField("Kicked for", reason)
            .setFooter("Kicked")
            .setTimestamp()

        const userKickedEmbed = new Discord.MessageEmbed()
            .setTitle("You were kicked!")
            .setColor("RANDOM")
            .addField("Kicked in", guild)
            .addField("Kicked by", moderator)
            .addField("Kicked for", reason)
            .setFooter("You were kicked")
            .setTimestamp()

        const member = msg.guild.member(user);
        try {
            if (member) {
                member.send(userKickedEmbed)
                member.kick().then(() => {
                    msg.channel.send(kickedEmbed)
                })
            }
        } catch (e) {
            msg.channel.send("I cannot kick this user!").then(m => m.delete({ timeout: 5000 }))
            console.log(e)
        }
    }
}