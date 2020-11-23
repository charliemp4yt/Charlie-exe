const Discord = require('discord.js')

module.exports = {
  name: "credits",
  description: "Shows the credits.",
  execute(msg, args, bot) {
        if (!msg.member.hasPermission("SEND_MESSAGES")) {
            return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }));
        }
let serverIcon = msg.guild.iconURL(); 

let helpEmbed = new Discord.MessageEmbed()
   .setAuthor(`Info`, serverIcon
)
   .setDescription(`Here is lots of info.`)
   .addField("Whats New", `- Added a network\n - Added economy commands\n - New profile picture\n`)
   .addField("Links:", `[GitHub repository](https://github.com/Charlie1mp4/iPhone-SE)\n [Invite Bot](https://discord.com/api/oauth2/authorize?client_id=769365811118735363&permissions=8&scope=bot)`)
   .addField("About the bot", `**Owner:** Charlie.mp4#6395\n **Servers:** ${bot.guilds.cache.size}\n **Ping:** ${Math.round(bot.ws.ping)} ms`)
   .setColor("RED")
   .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
   .setTimestamp()
msg.channel.startTyping().then(
        msg.channel.stopTyping()
    )
   msg.channel.send(helpEmbed)
  }
};