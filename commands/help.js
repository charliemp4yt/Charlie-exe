const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: "help",
  description: "Shows the help menu with information on every command.",
  execute(msg, args, bot) {
        if (!msg.member.hasPermission("SEND_MESSAGES")) {
            return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }));
        }
        let categories = ["fun", "misc", "mod", "economy"]
let funEmbed = new Discord.MessageEmbed()
   .setTitle(`${bot.user.username} Fun Commands`)
   .setDescription(`Here are all the fun commands in the bot!`)
   .addField(`${prefix}8ball (question)`, `Gives an 8balled (random) answer to the question you ask.`)
   .addField(`cc!flip`,`Flips a coin (heads or tails).`)
   .addField(`${prefix}roll`, `Rolls a die.`)
   .addField(`${prefix}dm [@user] (message)`,`DMs the targeted user with the specified message.`)
   .setColor("RANDOM")
   .setFooter(`Requested by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
   .setTimestamp()
let miscEmbed = new Discord.MessageEmbed()
   .setTitle(`${bot.user.username} Miscellaneous Commands`)
   .setDescription(`Here are all the commands that are uncategorized.`)
   .addField(`${prefix}dm [@user] (message)`,`DMs the targeted user with the specified message.`)
   .addField(`${prefix}help`, `Shows the main help menu.`)
   .addField(`${prefix}invite`, `Provides the invite links to ${bot.user.username}.`)
   .addField(`${prefix}ping`, `Shows the bot's ping in milliseconds.`)
   .addField(`${prefix}credits`, `Shows the credits of the creators/devs of ${bot.user.username}.`)
   .setColor("RANDOM")
   .setFooter(`Requested by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
   .setTimestamp()
let modEmbed = new Discord.MessageEmbed()
   .setTitle(`${bot.user.username} Moderation Commands`)
   .setDescription(`Here are all the moderation/admin commands in the bot!`)
   .addField(`${prefix}announce [#channel] (Message)`,`Announces something to the targeted channel.`)
   .addField(`${prefix}ban [@user] (reason)`,`Bans the targeted user (reason optional).`)
   .addField(`${prefix}kick [@user] (reason)`, `Kicks the targeted user (reason optional).`)
   .addField(`${prefix}clear [amount]`,`Purges the amount of messages specified.`)
   .addField(`${prefix}hide [#channel] (reason)`, `Hides a channel so that no one except allowed roles can see it (reason optional).`)
    .addField(`${prefix}unhide [#channel] (reason)`, `Unhides a channel that was previously hidden (reason optional).`)
   .addField(`${prefix}lock [#channel] (reason)`, `Locks a channel so that no one can type in it (reason optional).`)
   .addField(`${prefix}unlock [#channel] (reason)`, `Unlocks a channel that was previously locked (reason optional).`)
   .addField(`${prefix}status [TYPE] (text)`, `Changes the bot's status live. Options for type:\n WATCHING, LISTENING, STREAMING, PLAYING\n (Note: This command can only be used by bot owners, not server owners.)`)
   .setColor("RANDOM")
   .setFooter(`Requested by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
   .setTimestamp()
let ecoEmbed = new Discord.MessageEmbed()
   .setTitle(`${bot.user.username} Economy Commands`)
   .setDescription(`Here are all the economy commands in the bot!`)
   .addField(`${prefix}bal [@user]`,`Checks your ${bot.user.username} balance in coins. If no user value was given, your balance will show.`)
   .addField(`${prefix}blackjack`,`Plays a game of good old blackjack against the bot.`)
   .addField(`${prefix}buy [item]`, `Buys an item from the shop. Use \`${prefix}shop\` to see what items you can purchase.`)
   .addField(`${prefix}clearinv`,`Clears your inventory of items.`)
   .addField(`${prefix}daily`, `Get your daily dose of coins.`)
    .addField(`${prefix}inventory`, `Checks your inventory of items.`)
   .addField(`${prefix}pay [@user] [amount]`, `Gives another user the specified amount of coins via wire transfer.`)
   .addField(`${prefix}shop`, `Find items to buy in this neat little shop o' items.`)
   .addField(`${prefix}slots`, `Spins a slot machine (costs 100 coins)`)
   .addField(`{prefix}work`, `Work for your supper (has a 10 minute cooldown)`)
   .setColor("RANDOM")
   .setFooter(`Requested by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
   .setTimestamp()
let mainEmbed = new Discord.MessageEmbed()
   .setTitle(`${bot.user.username} Commands`)
   .setDescription(`Here are all the commands in the bot!`)
   .addField(`${prefix}help mod`, `Shows all moderation/admin commands.`)
   .addField(`${prefix}help fun`, `Shows all the fun commands.`)
   .addField(`${prefix}help economy`, `Shows all the economy commands.`)
   .addField(`${prefix}help misc`, `Any commands not included in the above commands get listed here.`)
   .setColor("RANDOM")
   .setFooter(`Requested by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
   .setTimestamp()
  let category = args.join(" ").toLowerCase()
  if (category === categories[0]) {
    category = funEmbed
  } else if (category === categories[1]) {
    category = miscEmbed;
  } else if (category === categories[2]) {
    category = modEmbed
  } else if (category === categories[3]) {
    category = ecoEmbed;
  } else {
    category = mainEmbed
  }
  return msg.channel.send(category);
  }
};
