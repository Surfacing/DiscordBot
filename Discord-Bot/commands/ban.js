const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const config = reqire('../config.json');

exports.run = (client, message, args) => {
  try {
  let reason = args.slice(1).join(' ');
  const user = message.mentions.users.first();
    parseUser(message, user);
    const caseNum = await caseNumber(client, modlog);
  let auditLog = client.channels.get(config.audit);
  if (!auditLog) return message.reply('I cannot find a audit channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
.setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
.setFooter(`Case ${caseNum}`);
  return auditLog.sendEmbed({embed});
} catch (e) {
  console.log('Error during ban detected: '+`${e}`);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
