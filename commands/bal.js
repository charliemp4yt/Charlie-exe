const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "bal",
    description: "shows current balance",
    aliases: ["b"],
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        let user = msg.mentions.members.first() || msg.author
        let userUsername = user.username || user.user.username

        let bal = await db.fetch(`coins_${msg.guild.id}_${user.id}`);
        if (bal === null) bal = 0;

        const balEmbed = new Discord.MessageEmbed()
            .setTitle(`${userUsername}'s Balance`)
            .setColor("RANDOM")
            .setDescription(`**${userUsername}** currently has **${bal}** coins!`)
            .setFooter(`Requested by ` + msg.author.username, msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
        msg.channel.send(balEmbed)
    }
}