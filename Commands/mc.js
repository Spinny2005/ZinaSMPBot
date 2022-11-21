module.exports = {
	name: 'mc',
	description: '',
	execute(message, args, Discord, client, prefix) {
    
    const embed = new Discord.MessageEmbed()
    let serverIP = 'TheZinaSMP.aternos.me';
    let ping = require('minecraft-server-util');
    if (message.author.id != '1043960825926393856') {
      ping
        .status(serverIP, {
          port : 25565,
          timeout: 5000
        })
        .then(response => {
          const Embed = new Discord.MessageEmbed()
          //.setTitle('Server Status')
          //.setColor('YELLOW')
          //.addField('Server IP', response.host)
          //.addField('Server Version', response.version)
          //.addField('Players Online', response.onlinePlayers)
          //.addField('Max Players', response.maxPlayers);
          //.setDescription("Server Status");
          //message.channel.send({ embeds: [embed] });
          message.channel.send("```Server IP: " + response.host + "\nPlayers Online: " + response.onlinePlayers + "\nMax Players: " + response.maxPlayers + "```");
          console.log(response.onlinePlayers);
        })
        .catch(error => {
          console.error(error);
        })
    }
    console.log("mc command recived");
	}
}