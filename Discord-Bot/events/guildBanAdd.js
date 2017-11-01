const config = require('./config.json');

module.exportd = (guild, user) => {
  const client = guild.client;
  client.channels.get(config.audit).send(`User ${user.username} got banned from ${guild.name}.`);
}
