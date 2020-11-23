const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "buy",
    description: "buy an item from the shop",
    /**
     * @param {Discord.Message} msg
     * @param {Discord.Client} bot
     * @param {String[]} args
     */
    run: async (msg, args, bot) => {
        let purchase = args.join(" ").toLowerCase()
        if (!purchase) return msg.channel.send('Please define an item to buy!').then(m => m.delete({ timeout: 5000 }))
        await db.fetch(msg.author.id, { items: [] });
        let x = await db.fetch(`inv1_${msg.guild.id}_${msg.author.id}`)
        if (x = null) db.set(`inv1_${msg.guild.id}_${msg.author.id}`, "**Empty**")
        let amount = await db.fetch(`coins_${msg.guild.id}_${msg.author.id}`)
        if (purchase === "Verified Bot Badge") {
            if (amount < 1000) return msg.channel.send('You do not have enough money to buy this item. Please try another item.').then(m => m.delete({ timeout: 5000 }))
            db.subtract(`coins_${msg.guild.id}_${msg.author.id}`, 1000);
            db.push(`inv1_${msg.guild.id}_${msg.author.id}`, "Verified Bot Badge");
            msg.channel.send('Successfully bought a **Verified Bot Badge**')
        } else if (purchase === "Fishing Rod") {
            if (amount < 200) return msg.channel.send('You do not have enough money to buy this item. Please try another item.').then(m => m.delete({ timeout: 5000 }))
            db.subtract(`coins_${msg.guild.id}_${msg.author.id}`, 200);
            db.push(`inv1_${msg.guild.id}_${msg.author.id}`, "Fishing Rod");
            msg.channel.send('Successfully bought a **Fishing Rod**')
        }
    }
}