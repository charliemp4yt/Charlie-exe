const Discord = require('discord.js')

module.exports = {
  name: "roll",
  description: "Rolls a die",
  execute(msg, args, bot) {
        if (!msg.member.hasPermission("SEND_MESSAGES")) {
            return msg.channel.send("You lack permissions to run this command!").then(m => m.delete({ timeout: 5000 }));
        }
let num = 6;
	if(args[0]) num = args[0];
	const rolled = Math.floor(Math.random() * num) + 1;
	const color = msg.member.displayHexColor;
	const rollMsg = `It rolled ${rolled}!`;
	const embed = new Discord.MessageEmbed({
		title: `🎲 Rolling a ${num} sided die... 🎲`,
		fields: [{ name: 'Result:', value: rollMsg }],
		color: color,
		thumbnail: {
			url: `https://weeknumber.net/gfx/200x200/${rolled}.png`,
		},
		timestamp: new Date(),
		footer: {
			text: `${msg.author.username}`,
			icon_url: `${msg.author.displayAvatarURL({ dynamic: true, format: 'png' })}`,
		},
	});
	msg.channel.send(embed);
}};