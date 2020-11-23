const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
	name: "clearwarn",
	description: "clears warnings for a user",
	execute: async (msg, args, bot) => {
		if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You lack the permissions necessary to run this command.')
		const user = msg.mentions.members.first()

		if (!user) {
			return msg.channel.send("Mention a user to reset their warnings").then(m => m.delete({ timeout: 5000 }))
		}
		let warnings = db.get(`warnings_${msg.guild.id}_${user.id}`)
		if (warnings === null) {
			return msg.channel.send("User does not have any warnings").then(m => m.delete({ timeout: 5000 }))
		}

		db.delete(`warnings_${msg.guild.id}_${user.id}`)
		user.send(`Your warnings were reset by ${msg.author.username} from ${msg.guild.name}`)
		await msg.channel.send(`Reset warnings for ${msg.mentions.users.first().username}`)

	}
}