//require('dotenv').config()
const token = 'MTA0Mzk2MDgyNTkyNjM5Mzg1Ng.GJjbWb.RlxzpidZRRYfpV7a963RmsOkaJdYAFF4qqTdhw';

const express = require('express');
const app = express();
const port = 3000;
const serverIP = 'SpenceBoggs.aternos.me';

app.get('/', (req, res) => {
    res.send('Zina SMP Bot');
});

app.listen(port, () => {
    console.log(`Zina SMP Bot listening at Port: ${port}`);
});



const {Client, MessageEmbed, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

bot.on('ready', () => {
    console.log('Zina SMP Bot online');
});

bot.on('messageCreate', message => {
  console.log("Message Sent");
  const ping = require('minecraft-server-util');
  if (message.author.id != '1043960825926393856') {
    if (message.content = 'GAMER') message.channel.send("gamer");
    if (message.content = '!mc') {
      message.channel.send("hello");
      ping
        .status(serverIP, {
          port : 25565,
          enableSRV: true,
          timeout: 5000
        })
        .then(response => {
          const Embed = new MessageEmbed()
          .setTitle('Server Status')
          .setColor('YELLOW')
          .addField('Server IP', response.host)
          .addField('Server Version', response.version)
          .addField('Players Online', response.onlinePlayers)
          .addField('Max Players', response.maxPlayers);
          message.channel.send(Embed);
        })
        /*
        .catch(error => {
          console.error(error);
        })
        */
    }   
    message.channel.send("hi");
  }
});

//client.login(process.env.token);
bot.login(token);