const config = require('./config.json');

module.exportd = member => {
  let guild = member.guild;
  var client = guild.client;
  client.channels.get(config.audit).send(`User ${member.user} left the Server.`);
}
