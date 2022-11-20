require('dotenv').config()
const token = 'MTA0Mzk2MDgyNTkyNjM5Mzg1Ng.GJjbWb.RlxzpidZRRYfpV7a963RmsOkaJdYAFF4qqTdhw';
const PREFIX = '+';

express = require('express');
const app = express();

const port = 3000;
const serverIP = 'SpenceBoggs.aternos.me';

app.get('/', (req, res) => {
    res.send('Zina SMP Bot');
});

app.listen(port, () => {
    console.log(`Zina SMP Bot listening at Port: ${port}`);
});

const {Client, MessageEmbed } = require('discord.js');
const { isPromise } = require('util/types');
const bot = new Client();

bot.on('ready', () => {
    console.log('Zina SMP Bot online');
});

bot.on('message', message => {
    const ping = require('minecraft-server-util');
    let args = message.content.substring(PREFIX.length).split(' ');
    switch (args[0]) {
        case 'mc':
            if (!args[1]) return message.channel.send('no args[1]');
            if (!args[2]) return message.channel.send('no args[2]');
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
                    .addField('Server IP', reponse.host)
                    .addField('Server Version', reponse.version)
                    .addField('Players Online', reponse.onlinePlayers)
                    .addField('Max Players', reponse.maxPlayers);

                    message.channel.send(Embed);
                })
                .catch(error => {
                    console.error(error);
                })
    }   
});

bot.login(token);