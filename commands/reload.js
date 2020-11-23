const Discord = require('discord.js')

module.exports = {
     name: 'reload',
     description: 'Reloads a command',
     aliases: ['rl'],
     args: true,
     execute(msg, args, bot) {
   console.log("[Reload] Command has been run.");
   
   if(msg.author.id !== '615946810959200362' && msg.author.id !== '529815278456930314') return;
         const commandName = args[0]
         let commands = msg.client.commands.array();
         const command = msg.client.commands.get(commandName);
                 if (!args[0]) return msg.channel.send(`You must provide a command!`);
         if(args[0] == 'all') {
 
         try {
             commands.forEach((cmd) => {
             delete require.cache[require.resolve(`./${cmd.name}.js`)];
             const newCommand = require(`./${cmd.name}.js`);
             msg.client.commands.set(newCommand.name, newCommand);
             console.log(`Reloaded ${cmd.name}`)});
         } catch (error) {
             console.log(error);
             return msg.channel.send(`There was an error while reloading a command \`${cmd.name}\`:\n\`${error.msg}\``);
         }
             
         msg.channel.send(`All commands were reloaded!`); return;
               }
         
         if (!command) {
             return msg.channel.send(`There is no command with name \`${commandName}\`, ${msg.author}!`);
         }
 
         delete require.cache[require.resolve(`./${commandName}.js`)];
 
         try {
             const newCommand = require(`./${commandName}.js`);
             msg.client.commands.set(newCommand.name, newCommand);
         } catch (error) {
             console.log(error);
             return msg.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.msg}\``);
         }
         msg.channel.send(`Command \`${commandName}\` was reloaded!`);
         console.log(`Reloaded ${commandName}`);
         
     },
 };