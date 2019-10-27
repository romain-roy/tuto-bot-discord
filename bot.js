const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json');
// const token = client.login(process.env.TOKEN);

client.login(token);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	if (msg.author.bot) return;

	if (msg.content === "ping") {
		msg.channel.send("pong");
	}

});
