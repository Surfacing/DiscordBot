var config = require('../config.json');

exports.run = function(client, message, args) {
  try {
    if(!!args && args.lenght !== 0) {
        console.log(`User: ${message.author.username} set state to: ${args}`);
      client.user.setStatus(args.join(' ')).catch(e => console.log(`Error during setting State: ${e}`));
    } else {
      console.log(`User: ${message.author.username} set state to: online`);
    client.user.setStatus('online');
    }
  } catch (e) {
    console.log('Error during setState detected: '+`${e}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'setState',
  description: 'Sets the Bots state.',
  usage: 'setState <online,idle,dnd,invisible>'
};
