const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json');
// const token = client.login(process.env.TOKEN);

const prefix = '!';

const { greetings } = require('./data.json');

client.login(token);

/* Initialisation du bot */

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

/* Traitement lors de la réception de messages */

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		message.channel.send("pong");
	}

	if (command === "beep") {
		message.reply("boop");
	}

});

/* À l'arrivé d'un nouveau membre */

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'general');
	if (!channel) return;

	let random_number = Math.floor(Math.random() * Math.floor(greetings.length));
	let random_greeting = greetings[random_number];

	channel.send(`${random_greeting} ${member} !`);
});

/* Simuler un nouvel arrivant */

client.on('message', async message => {
	if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
	}
});
