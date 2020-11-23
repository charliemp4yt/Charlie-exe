const Discord = require('discord.js')


module.exports = {
    name : "hide",
    description : "hides channel",
    execute(msg, args, bot) {
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }))

        let moderator = msg.author

        let channel = msg.mentions.channels.first()
        if(!channel) channel = msg.channel

        let reason = args.join(" ")
        if(reason.includes(channel)) reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason specified"
        
        try { 
            channel.updateOverwrite(msg.channel.guild.roles.everyone, {VIEW_CHANNEL: false}).then(()=>{
                const hiddenEmbed = new Discord.MessageEmbed()
                    .setTitle("🕵️ Channel is hidden 🕵️")
                    .setColor("RANDOM")
                    .setDescription(`This channel is hidden!`)
                    .addField("Hidden by", moderator)
                    .addField("Hidden for", reason)
                    .setFooter("Hidden")
                    .setTimestamp()
                channel.send(hiddenEmbed)
            })
        } catch (e) {
            msg.channel.send(`There was an error hiding ${channel}`).then(m => m.delete({ timeout: 5000 }))
            console.log(e)
        }
    }
}