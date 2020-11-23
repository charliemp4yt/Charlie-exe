const Discord = require('discord.js')


module.exports = {
    name : "lock",
    description : "locks channel",
    execute(msg, args, bot) {
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }))

        let moderator = msg.author

        let channel = msg.mentions.channels.first()
        if(!channel) channel = msg.channel

        let reason = args.join(" ")
        if(reason.includes(channel)) reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason specified"
        
        try { 
            channel.updateOverwrite(msg.channel.guild.roles.everyone, {SEND_MESSAGES: false}).then(()=>{
                const lockedEmbed = new Discord.MessageEmbed()
                    .setTitle("🔒 Channel is locked 🔒")
                    .setColor("RANDOM")
                    .setDescription(`This channel is locked!`)
                    .addField("Locked by", moderator)
                    .addField("Locked for", reason)
                    .setFooter("Locked")
                    .setTimestamp()
                channel.send(lockedEmbed)
            })
        } catch (e) {
            msg.channel.send(`There was an error locking ${channel}`).then(m => m.delete({ timeout: 5000 }))
            console.log(e)
        }
    }
}