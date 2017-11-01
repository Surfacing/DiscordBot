const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const config = reqire('../config.json');

exports.run = (client, message, args) => {
  try {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  parseUser(message, user);
  const caseNum = await caseNumber(client, modlog);
  let auditLog = client.channels.get(config.audit);
  if (!auditLog) return message.reply('I cannot find a audit channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
.setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
.setFooter(`Case ${caseNum}`);
  return auditLog.sendEmbed({embed});
} catch (e) {
  console.log('Error during kick detected: '+`${e}`);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
