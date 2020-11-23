const Discord = require('discord.js')

module.exports = {
  name: "8ball",
  description: "answers any yes or no question",
  execute(msg, args) {
    if (!args[2]) return msg.channel.send("Please enter a full question!");
    let replies = [
      "Yes",
      "No",
      "My sources say yes",
      "Doubtful",
      "Outlook good",
      "Outlook not good",
      "I don't know",
      "Maybe",
      "How about a no",
      "Idc leave me alone",
      "Ask again later",
      "Hell yeah",
      "Better not tell you now"
    ];
    let question = args.join(" ");
    let result = Math.floor(Math.random() * replies.length);

    const answer8ballembed = new Discord.MessageEmbed({
		title: `🎱 8Ball 🎱`,
		fields: [{ name: 'Question asked:', value: question }, { name: 'Answer:', value: replies[result] }],
		color: '#FF9900',
		timestamp: new Date(),
		footer: {
			text: `${msg.author.username}`,
			icon_url: `${msg.author.displayAvatarURL()}`,
		},
    })
msg.channel.startTyping().then(
        msg.channel.stopTyping()
    )
    msg.channel.send(answer8ballembed);
    console.log(`8ball command`);
    console.log(`Question:`);
    console.log(question);
    console.log(`Answer:`);
    console.log(replies[result]);
  }
}

//let answer8ballembed = new Discord.MessageEmbed()
 //     .setTitle("🎱 8Ball 🎱")
   //   .setColor("#FF9900")
     // .addField("Question asked", question)
//      .addField("Answer", replies[result])
//msg.channel.startTyping().then(
  //      msg.channel.stopTyping()
//    )
  //  msg.channel.send(answer8ballembed);
//    console.log(question);
 // }
//}

//console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)