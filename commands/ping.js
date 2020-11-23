const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "ping",
    description: "shows bots ping",
    execute(msg, args, bot){
        const pingEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("🏓 Pong")
        .addField("**Ping**:", `\`${Math.round(bot.ws.ping)} ms\``)
        .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
   .setTimestamp()

    msg.channel.send(pingEmbed);
    }
}