var config = require('../config.json');

exports.run = function(client, message) {
  message.channel.send('Ping?')
.then(message2 => {
  message2.edit(`Pong! ${message2.createTimeStamp - message.createTimeStamp} ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ping',
  description: 'Pings the Bot.',
  usage: 'ping'
};
