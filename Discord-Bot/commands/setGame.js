var config = require('../config.json');

exports.run = function(client, message, args) {
  try {
  if(!!args && args.lenght !== 0) {
       console.log(`User: ${message.author.username} set game to: ${args}`);
     client.user.setGame(args.join(' ')).catch(e => console.log(`Error during setting Game: ${e}`));
  } else {
    console.log(`User: ${message.author.username} unsets the current game.`);
  client.user.setGame(null);
  }
} catch (e) {
  console.log('Error during setGame detected: '+`${e}`);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'setGame',
  description: 'Sets the current Game to the bot.',
  usage: 'setGame <game name>'
};
