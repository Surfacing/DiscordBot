const config = require('./config.json');

module.exportd = (guild, user) => {
  guild.defaultChannel.sendMessage(`${user.username} was just unbanned!`);
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
    return client.channels.get(config.audit).sendEmbed({embed});
}
