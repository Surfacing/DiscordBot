const config = require('../config.json');

module.exports = member => {
  let guild = member.guild;
  var client = guild.client;
  client.channels.get(config.audit).send(`User ${member.user} left the Server.`);
}
