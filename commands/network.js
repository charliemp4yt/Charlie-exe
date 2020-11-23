module.exports = {
    name: 'network',
    description: "Initiates Network Setup",
    execute(msg, bot){
    const Discord = require("discord.js");
     let swift = msg.guild.channels.cache.find(role => role.name === "charlie-network");
        let setupEmbed = new Discord.MessageEmbed()
            .setColor(`#2ae7f0`)
            .setTitle(`Welcome to Charlie.exe Network **${msg.guild.name}**!`)
            .setDescription(`Charlie-Network has been setup! You can chat with people from other servers, as if they were here.`)       
        if(swift) return msg.reply(`**Charlie.exe Network** has already been set up in this server. Head to ${swift} to start chatting!`) 
        if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.reply("Ask a member with MANAGE_CHANNELS permission to set **Charlie.exe Network** up.");
	channel = msg.guild.channels.create('charlie-network', {
				type: 'text',
				topic: 'Welcome to the Charlie.exe Network v0.4 Alpha! Say Hi, and be friendly.',
				reason: 'For connection to the Charlie.exe Network',})

		.then(createdChannel => { msg.channel.send(`Charlie.exe Network set up in ${createdChannel}`)
				.then(msg => {createdChannel.send(setupEmbed)
					.then(m => {createdChannel.createWebhook(`Charlie.exe Network`, {
							}).then(webhook => console.log(`Created webhook ${webhook}`)).catch(console.error)
								})});
    })
}}