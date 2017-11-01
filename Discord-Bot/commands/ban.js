const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const config = require('../config.json');

exports.run = async (client, message, args) => {
  try {
  const user = message.mentions.users.first();
    parseUser(message, user);
  let auditLog = client.channels.get(config.audit);
    const caseNum = await caseNumber(client, auditLog);
  if (!auditLog) return message.reply('I cannot find a audit channel');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user, 2);

const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${config.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
.setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**User-ID:** ${user.id}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
.setFooter(`Case ${caseNum}`);
  return auditLog.send({embed});
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
