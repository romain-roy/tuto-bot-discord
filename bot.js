const Discord = require('discord.js');

// const { TOKEN } = require('./config.json');
const { greetings } = require('./data.json');

const client = new Discord.Client();

const prefix = '!';

var isPlaying = false;
var voiceChannel, dispatcher;

/* Initialisation du bot */

client.login(process.env.TOKEN);

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

	if (command === "embed") {
		let embedMessage = new Discord.RichEmbed()
			.setColor("#0099ff")
			.setTitle(message.author.username)
			.setURL(message.author.avatarURL)
			.setAuthor(client.user.username, client.user.avatarURL, client.user.avatarURL)
			.setDescription(message.author.username + "'s properties.")
			.addField("Status", message.author.presence.game.state)
			.addField("Tag", message.author.tag)
			.setThumbnail(message.author.avatarURL)
			.setTimestamp()
			.setFooter(client.user.username, client.user.avatarURL);
		message.channel.send(embedMessage);
	}

	if (command === "play") {
		if (!isPlaying) {
			isPlaying = true;
			voiceChannel = message.member.voiceChannel;
			try {
				voiceChannel.join().then(connection => {
					try {
						dispatcher = connection.playArbitraryInput(args[0]);
						dispatcher.on('end', () => {
							connection.disconnect();
							isPlaying = false;
						});
					} catch (e) {
						message.reply("il m'est malheuresement impossible de lire cette musique.");
						connection.disconnect();
						isPlaying = false;
					}
				});
			} catch (e) {
				message.reply("je regrette, vous n'êtes pas en vocal.");
				isPlaying = false;
			}
		} else {
			message.reply("je suis déjà occupé. Vous pouvez arrêter ma tâche précédente avec `!stop`.");
		}
	}

	if (command === "volume" && isPlaying) {
		if (args[0] >= 0 && args[0] <= 100) {
			message.channel.send("Volume set to " + args[0] + "%.");
			dispatcher.setVolume(args[0] / 100);
		} else {
			message.channel.send("Volume must be between 0 and 100.");
		}
	}

	if (command === "pause" && isPlaying) {
		dispatcher.pause();
	}

	if (command === "resume" && isPlaying) {
		dispatcher.resume();
	}

	if (command === "stop" && isPlaying) {
		dispatcher.end();
		voiceChannel.leave();
		isPlaying = false;
	}

});

/* À l'arrivé d'un nouveau membre */

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'général');
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
