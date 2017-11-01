const config = require('./config.json');

module.exportd = member => {
  let guild = member.guild;
  const client = guild.client;
  client.channels.get(config.audit).send(`User ${member.user} joined the Server.`);
}
