const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

const file = JSON.parse(fs.readFileSync('keys.json').toString());
client.login(file.keys[0]);
// client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === "ping") {
		msg.channel.send("pong");
	}
});
