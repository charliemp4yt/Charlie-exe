module.exports = {
  name: 'announce',
  description: 'Creates an embedded announcement',
  type: 'admin',
  async execute(message, args) {
    console.log("[ClockBot : Announce] Command has been run.");
    let channel = message.mentions.channels.first();
    const Discord = require("discord.js");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You do not have permission to execute this command!');
    let reason = args.slice(1).join(' ');
    if (!reason) return message.reply("You need to tag the channel to send the message to!");
    let embed = new Discord.MessageEmbed()
      .setColor(`BLURPLE`)
      .setTitle("__**Announcement!**__")
      .setDescription(`${reason}`)
      .setTimestamp();
    message.channel.send("Message Sent.").then(sentMessage => {
      setTimeout(() => {
        sentMessage.delete()
      }, 3000);
    })
    if (message.channel == channel) message.delete();
    channel.send(embed);
  }
};