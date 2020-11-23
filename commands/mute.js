const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "mute",
    description: "mutes a user for a set period of time",
    execute(msg, args, bot) {
        if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send("You don't have sufficient permissions to run this command!").then(m => m.delete({ timeout: 5000 }))
        if (msg.author.bot) return;
        let moderator = msg.author
        let targetUser = msg.mentions.members.first()
        let time = args[1]
        let reason = args.slice(2).join(" ")
        if (!time) return msg.channel.send("Usage for mute: \n !mute <user> <time> <reason>").then(m => m.delete({ timeout: 10000 }))
        if (!reason) return msg.channel.send("Usage for mute: \n !mute <user> <time> <reason>").then(m => m.delete({ timeout: 10000 }))
        if (!targetUser) return msg.channel.send("Usage for mute: \n !mute <user> <time> <reason>").then(m => m.delete({ timeout: 10000 }))

        const muterole = msg.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muterole) {
            return msg.channel.send("There is no mute role! \n Please add a role called 'Muted' to proceed!").then(m => m.delete({ timeout: 5000 }))
        }
        if(targetUser.roles.cache.some(role => role.name === "Muted")) {
            return msg.channel.send(`${targetUser} is already muted!`).then(m => m.delete({timeout: 5000}))
        }
        targetUser.roles.add(muterole).then(()=>{
            msg.channel.send(`Muted ${targetUser} for ${reason}`)
        })
        

        const userMuted = new Discord.MessageEmbed()
            .setTitle(`You were muted in ${msg.guild}`)
            .setColor("RANDOM")
            .addField(`Muted by`, moderator)
            .addField(`Muted for`, reason)
            .addField(`Length of mute`, args[1])
            .setFooter("Your mute ends")
            .setTimestamp(Date.now() + ms(args[1]))
        targetUser.send(userMuted)

        setTimeout(() => {
            if(!targetUser.roles.cache.some(role => role.name === "Muted")) return console.log(`${targetUser} was manually unmuted.`)
            targetUser.roles.remove(muterole)
            targetUser.send(`You've been unmuted in **${msg.guild}**. Please avoid breaking any rules in the future.`)
        }, ms(args[1]))

    }
}