const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "blackjack",
    description: "play blackjack for money",
    aliases: ["bj"],
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        if (!msg.guild.me.hasPermission("ADD_REACTIONS")) return msg.channel.send("I don't have add_reactions permissions, so I can't run this command.").then(m => m.delete({ timeout: 5000 }))
        let wager = args.join(" ")
        let user = msg.author
        if (!wager) return msg.channel.send("Please specify an amount of money to wager")
        if (isNaN(wager)) return msg.channel.send("That wager is not a number!").then(m => m.delete({ timeout: 5000 }))
        if (wager < 125) return msg.channel.send("The minimum wager is 125 coins!").then(m => m.delete({ timeout: 5000 }))
        let isWager = await db.fetch(`coins_${msg.guild.id}_${user.id}`)
        if (isWager < wager) return msg.channel.send("You don't have enough coins in your account to do this!").then(m => m.delete({ timeout: 5000 }))
        let PCard1 = Math.floor(Math.random() * 10) + 2
        let PCard2 = Math.floor(Math.random() * 10) + 2
        let bCard1 = Math.floor(Math.random() * 10) + 2
        let bCard2 = Math.floor(Math.random() * 10) + 2
        let pTotal = PCard1 + PCard2
        let pArray = []
        let bArray = []
        pArray.push(PCard1)
        pArray.push(PCard2)
        bArray.push(bCard1)
        bArray.push(bCard2)
        let bjEmbed = new Discord.MessageEmbed()
            .setTitle(`🃏 Blackjack 🃏`)
            .setDescription(`**Rules:** try to get as close to 21 as you can. Going over will result in an automatic loss. If your opponet has a higher number than you, they win. You cannot see your opponets card until after you stand. \n**♣** stands for hit and ♥️ stands for stand. \n**Blackjack:** An ace and a jack \n**Hit:** add another card to your pile \n**Stand:** stop drawing cards \n\n**Your Hand:** ${PCard1}, ${PCard2}: ${pTotal} \n\n**Bot Hand:** ${bCard1}, ???: ???`)
            .setColor("RANDOM")
            .setFooter(user.username, user.displayAvatarURL({ dynamic: true, format: 'png' }))
        let m = await msg.channel.send(bjEmbed)
        m.react('♣️')
        m.react('♥️')
        const standFilter = (reaction, user) =>
            reaction.emoji.name === '♥️' && user.id === msg.author.id
        const hitFilter = (reaction, user) =>
            reaction.emoji.name === '♣️' && user.id === msg.author.id
        const stand = m.createReactionCollector(standFilter, {
            time: 60000,
            max: 1
        })
        const hit = m.createReactionCollector(hitFilter, {
            time: 60000
        })
        let sum1 = pArray.reduce(function (a, b) {
            return a + b
        }, 0)
        let pCount = sum1
        let sum2 = bArray.reduce(function (a, b) {
            return a + b
        }, 0)
        let bCount = sum2
        if (pCount > 21 && bcount > 21) {
            bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
            await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
            hit.stop()
            stand.stop()
            m.edit(bjEmbed)
        } else if (pCount === 21 && bCount < 21) {
            bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
            await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
            hit.stop()
            stand.stop()
            m.edit(bjEmbed)
        } else if (pCount < 21 && bCount === 21) {
            bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
            await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
            hit.stop()
            stand.stop()
            m.edit(bjEmbed)
        } else if (pCount === 21 && bCount > 21) {
            bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
            await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
            hit.stop()
            stand.stop()
            m.edit(bjEmbed)
        } else if (pCount > 21 && bCount === 21) {
            bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
            await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
            hit.stop()
            stand.stop()
            m.edit(bjEmbed)
        }
        stand.on(`collect`, async r => {
            let sum1 = pArray.reduce(function (a, b) {
                return a + b
            }, 0)
            let pCount = sum1
            let sum2 = bArray.reduce(function (a, b) {
                return a + b
            }, 0)
            let bCount = sum2
            if (pCount > 21 && bCount > 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount === 21 && bCount < 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
                await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount < 21 && bCount === 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount === 21 && bCount > 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
                await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount > 21 && bCount === 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            }
            else if (pCount < 21 && bCount > 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
                await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount < bCount) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount > bCount) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
                await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            }
        })
        hit.on(`collect`, async r => {
            let pCard3 = Math.floor(Math.random() * 10) + 2
            let bCard3 = Math.floor(Math.random() * 10) + 2
            pArray.push(pCard3)
            bArray.push(bCard3)
            
            let sum1 = pArray.reduce(function (a, b) {
                return a + b
            }, 0)
            let pCount = sum1
            let sum2 = bArray.reduce(function (a, b) {
                return a + b
            }, 0)
            let bCount = sum2
            if (pCount > 21 && bCount > 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount === 21 && bCount < 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
                await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount < 21 && bCount === 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount === 21 && bCount > 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You won!**`)
                await db.add(`coins_${msg.guild.id}_${user.id}`, wager * 2)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount > 21 && bCount === 21) {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else if (pCount > 21 && bCount < 21){
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bArray}: ${bCount} \n\n**You lost!**`)
                await db.subtract(`coins_${msg.guild.id}_${user.id}`, wager)
                hit.stop()
                stand.stop()
                m.edit(bjEmbed)
            } else {
                bjEmbed.setDescription(`**Your Hand:** ${pArray}: ${pCount} \n\n**Bot Hand:** ${bCard1}, ???: ???`)
                m.edit(bjEmbed)
            }
        }) 
    }
}