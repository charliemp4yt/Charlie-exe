const Discord = require('discord.js')

module.exports = {
  name: "flip",
  description: "Flips a coin",
  execute(msg, args) {
    let replies = [
      "Heads",
      "Tails",
      "Heads",
      "Tails",
      "Heads",
      "Tails"
    ];
    let result = Math.floor(Math.random() * replies.length);

    let flipembed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag)
      .setTitle("🟡 Coin Flip 🟡")
      .setColor("RANDOM")
      .addField("You flipped a coin and the result is...:", replies[result])
msg.channel.startTyping().then(
    msg.channel.send(flipembed)
    )
    msg.channel.stopTyping();
    console.log("A coin was flipped and the result was:");
    console.log(replies[result]);
  }
}