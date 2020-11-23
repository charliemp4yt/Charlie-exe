const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "inventory",
    description: "users inventory",
    aliases: ['inv'],
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        let items = await db.fetch(`inv_${msg.guild.id}_${msg.author.id}`)
        if (items === null) items = "Currently Empty"
        
        const inventoryEmbed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s Inventory`)
            .setDescription(`**${items}**`)
            .setColor("RANDOM")
            .setFooter(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
        msg.channel.send(inventoryEmbed)
    }
}