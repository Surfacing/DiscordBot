const config = require('../config.json');
const ddiff = require('return-deep-diff');

module.exports = (oMember, nMember) => {
  let guild = oMember.guild;
  const client = guild.client;
  client.channels.get(config.audit).send(`User ${oMember.user} changed following attribute: ${ddiff(oMember,nMember)}`);
}
