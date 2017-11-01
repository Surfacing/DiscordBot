const config = require('../config.json');
const Discord = require('discord.js');

module.exports = (guild, user) => {
  guild.client.channels.get(config.audit).send(`${user.username} was just unbanned!`);
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**User-ID:** ${user.id}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
    return guild.client.channels.get(config.audit).send({embed});
}
