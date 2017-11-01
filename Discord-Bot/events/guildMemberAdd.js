const config = require('../config.json');

module.exports = member => {
  let guild = member.guild;
  const client = guild.client;
  client.channels.get(config.audit).send(`User ${member.user} joined the Server.`);
}
