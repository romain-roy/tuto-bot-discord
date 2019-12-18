# Instructions

1. Installer [Node.js](https://nodejs.org/en/).

2. Créer une application en se connectant à l'espace [Developers](https://discordapp.com/developers/applications/) sur le site de Discord. Choisir un nom, une image et éventuellement une description.

3. Dans l'onglet **Bot**, ajouter un bot à l'application.

4. Obtenir le lien d'invitation du bot présenté sous cette forme :

`https://discordapp.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot&permissions=<PERMISSIONS>`

avec

* `<CLIENT_ID>` : le numéro trouvable sur la page générale de l'application.
* `<PERMISSIONS>` : le numéro obtenu en bas de la page dans l'onglet Bot en sélectionnant les permissions souhaitées.

Suivre ce lien et ajouter le bot à l'un de ses serveurs.

5. Créer un dossier où enregistrer le bot.

6. Ouvrir la console **Node.js command prompt**, se rendre dans le dossier précédemment créer, et installer `discord.js` :
```
> cd C:\<chemin_vers_le_dossier>\tuto-bot-discord\
> npm install discord.js
```

7. Créer un fichier `bot.js` et copier dedans le code ci-dessous :
```js
const Discord = require('discord.js');
const client = new Discord.Client();

client.login('TOKEN');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === "!ping") {
    message.channel.send("pong");
  }
});
```

8. Remplacer TOKEN dans le code ci-dessus par le token trouvable dans l'onglet Bot sur la page Discord de l'application.

**ATTENTION : Ce numéro doit rester confidentiel.**

9. Lancer le bot en tapant dans la console :
```
> node bot.js
```
Si tout s'est bien passé, il devrait apparaître **Logged in** dans la console, et le bot devrait être connecté sur Discord. Essayer d'envoyer **!ping**, le bot devrait répondre **pong**. Le bot est maintenant configuré. 👏

10. Pour aller plus loin : La [documentation](https://discord.js.org/#/docs/main/stable/general/welcome) et le [guide](https://discordjs.guide/) de **discord.js**.

## Hébergement

⚠ La solution que je propose utilise l'hébergeur **Heroku**, c'est ce que je connais de plus abordable, mais il existe d'autres méthodes ! 

1. Toujours dans le même dossier, créer un fichier `package.json` et copier dedans le contenu suivant : 
```json
{
	"name": "Nom du bot",
	"description": "Description du bot",
	"version": "1.0.0",
	"main": "bot.js",
	"scripts": {
		"test": "node bot.js"
	},
	"dependencies": {
		"discord.js": "^11.5.1"
	}
}
```
Remplacer éventuellement le numéro de version de **discord.js** par celui de la version utilisée (trouvable dans `package-lock.json`).

2. Créer un autre fichier nommé `Procfile` avec uniquement la ligne `worker: node bot.js` à l'intérieur.

3. Remplacer le token du bot dans le code par `process.env.TOKEN`. La ligne ressemblera donc à ça :
```js
const token = client.login(process.env.TOKEN);
```

4. Sauvegarder son code sur GitHub. Ne pas sauvegarder le dossier `node_modules/`, et dans le cas d'un dépôt public, faire attention que le token n'apparaisse sur aucun fichier car il doit **rester confidentiel**.

5. Créer un compte sur [Heroku](https://www.heroku.com/).

6. Sur Heroku, créer une nouvelle **app**.

7. Aller dans l'onglet **Deploy** et connecter son dépôt GitHub.

8. En dessous, cliquer sur **Enable Automatic Deploys**.

9. Encore en dessous, cliquer sur **Deploy Branch**. Vérifier que le build réussisse.

10. Aller dans l'onglet **Settings**, cliquer sur **Reveal Config Vars**, saisir "TOKEN" dans la case `KEY` et le token du bot dans la case `VALUE`. Valider en cliquant sur **Add**.

11. Aller dans l'onglet **Ressources**, cliquer sur le crayon pour désactiver **Web** et activer **Worker**.

Le bot est maintenant hébergé en ligne, il est accessible depuis n'importe où et à n'importe quel moment ! 🌍🤖💬
