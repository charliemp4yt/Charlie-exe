const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "shop",
    description: "opens shop",
    aliases: ["s"],
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        const shopEmbed = new Discord.MessageEmbed()
        .setTitle('Welcome to the Neighborhood Shop!')
        .setDescription(`Verified Bot Badge - 1000 coins \nFishing Rod - 200 coins \nComputer - 750 \nCellphone - 350`)
        .setColor("RANDOM")
        .setTimestamp();
        msg.channel.send(shopEmbed);
    }
}