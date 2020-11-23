const ms = require('parse-ms')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "daily",
    description: "gives user daily allowance",
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        let timeout = 86400000
        let amount = Math.floor(Math.random() * 500)
        if (amount < 100) amount = 100

        let user = msg.author

        let daily = await db.fetch(`daily_${msg.guild.id}_${user.id}`)
        if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            const timeoutEmbed = new Discord.MessageEmbed()
                .setTitle("Whoa there, you've already collected your daily reward!")
                .setColor("RANDOM")
                .setDescription(`Try again in ${time.hours}h, ${time.minutes}m, and ${time.seconds}s.`)
                .setFooter(msg.author.username, msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            return msg.channel.send(timeoutEmbed)
        } else {
            db.add(`coins_${msg.guild.id}_${user.id}`, amount)
            db.set(`daily_${msg.guild.id}_${user.id}`, Date.now())
            msg.channel.send(`${amount} was added to your account!`)
        }
    }
}