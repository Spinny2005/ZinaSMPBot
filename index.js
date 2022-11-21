
const express = require("express");
const fs = require('fs')
const path = require('path')
const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INVITES", "GUILD_MESSAGE_REACTIONS"] });
const { Collection, MessageEmbed, Client, Message } = require('discord.js');
const app = express();
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require("./config.js");
var EventEmitter = require("events").EventEmitter;
const emitter = new EventEmitter()

//Set channel ID for online/offline messages
const channelID = '1044340371301343262';

client.commands = new Discord.Collection();
client.noPrefixCommands = new Discord.Collection();

//Consoles for custom logs.
const { Console } = require("console");
const botCommandsLogger = new Console({
  stdout: fs.createWriteStream("Bot Commands Log.txt")
});

client.on("messageCreate", message => {
  
  if (message.channel.id = channelID) {
    
    let serverIP = 'TheZinaSMP.aternos.me';
    let ping = require('minecraft-server-util');

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    setTimeout (function() {
      console.log(date + " " + time)
      console.log("\nPinging Server");
      ping
        .status(serverIP, {
          port : 25565,
          timeout: 5000
        })
        .then(response => {
          console.log("Players Online: " + response.onlinePlayers)
          
          let onlineMessage = "```SERVER ONLINE\nServer IP: " + response.host + "\nPlayers Online: " + response.onlinePlayers + "\nMax Players: " + response.maxPlayers + "```";
      
          if(message.content != onlineMessage) {
            client.channels.cache.get(channelID).send(onlineMessage) 
            console.log("Online Message Sent");
          }
          console.log("ONLINE");
        })
        .catch(error => {
          console.error(error);
          if(message.content != "```SERVER OFFLINE```") {
            client.channels.cache.get(channelID).send("```SERVER OFFLINE```")
            console.log("Offline Message Sent");
          }
          console.log("OFFLINE");
        })
    }, 60000);
  }
})

//Bring Bot Online
app.listen(3000, () => {
  console.log("Starting Zina SMP Bot")
})

app.get("/", (req, res) => {
  res.send("[Bot Status: Active] Made by Spinny2005");
})

//Prefix
let prefix = "!";


//Start Bot
client.once('ready', async => {
	console.log("\nRunning... prepare yourself... mentally");

	const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'))
  
	for (const file of commandFiles) {
		const command = require(`${'./Commands/'}/${file}`)
		client.commands.set(command.name, command)
	}

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(date + " " + time)
  var botOnlineTime = date + " " + time;
  
  console.log("\nZina SMP Bot Server List:")
  console.log("Current Server Count: " + client.guilds.cache.size)
  client.guilds.cache.forEach(guild => {
    console.log(`${guild.name} | ${guild.id}`);
  })

  client.user.setActivity('on The Zina SMP', { type: 'PLAYING' });
  client.user.setStatus('dnd');

  client.channels.cache.get(channelID).send("Zina SMP Bot Online");
  
})


//Main messageCreate
client.on("messageCreate", message => {
  emitter.setMaxListeners(20);

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
  var time = (today.getHours()+5) + ":" + today.getMinutes();
  var botOnlineTime = date + " at " + time;
  
	if(message.content.startsWith(prefix)) {
		var args = message.content.toLowerCase().slice(prefix.length).split(' ')
		  if(client.commands.has(args[0])) client.commands.get(args[0]).execute(message, args, Discord, client, prefix, botOnlineTime)
      else if(client.commands.has(args[0] + ' ' + args[1])) client.commands.get(args[0] + ' ' + args[1]).execute(message, args, Discord, client, prefix, botOnlineTime)
	}

  //No Prefix Commands
  client.noPrefixCommands.forEach((item, index) => {
    item.execute(message, args, Discord, client, prefix)
    emitter.setMaxListeners(20)
  })

})

//Logs invites when they are created.
client.on('inviteCreate', invite =>{
  console.log("invite: https://discord.gg/" + invite);
});

//Login (Always keep at the bottom of this file)
client.login(process.env.token)

