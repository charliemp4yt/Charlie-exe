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
   .setAuthor(`${msg.guild.name}`, serverIcon
)
   .setDescription(`Here are the credits of the developers who put their time and efforts into making this bot.`)
   .addField("Development Team:", `<@680686691937288234> (Charlie.mp4#6395) - Owner and Developer`)
   .addField("Made with Node.js. [Fork Bot](https://github.com/Charlie1mp4/iPhone-SE)")
   .setColor("RED")
   .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
   .setTimestamp()
msg.channel.startTyping().then(
        msg.channel.stopTyping()
    )
   msg.channel.send(helpEmbed)
  }
};