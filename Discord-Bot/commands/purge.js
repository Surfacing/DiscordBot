var config = require('../config.json');

exports.run = function(client, message, args) {
  const messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
      limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Purges x amount of messages from a given channel.',
  usage: 'purge <number>'
};
