

module.exports = {
    name: "clear",
    description: "clears x amount of messages",
    execute(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            return msg.channel
                .send("You lack permissions necessary to run this command!")
                .then(m => m.delete({ timeout: 3000 }));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return msg.channel
                .send("Please enter a value 1-99")
                .then(m => m.delete({ timeout: 3000 }));
        }

        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return msg.channel
                .send("I lack sufficent permissions to run this command")
                .then(m => m.delete({ timeout: 3000 }));
        }

        let deleteValue;

        if (parseInt(args[0]) > 100) {
            deleteValue = 100;
        } else {
            deleteValue = parseInt(args[0]);
        }

        msg.channel
            .bulkDelete(deleteValue, true)
            .then(deleted => msg.channel.send(`Cleared ${deleteValue} messages`))
            .then(m => m.delete({ timeout: 3000 }))
            .catch(err => console.log(err));
        console.log(` Deleted ${deleteValue} messages`);
    }

}