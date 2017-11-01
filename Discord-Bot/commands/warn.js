const config = require('../config.json');
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let audit = client.channles.get(config.audit);
  parseUser(message, user);
  const caseNum = await caseNumber(client, modlog);

  if(!audit) return message.replay('Can\'t find audit channel').catch(console.error);
  if(readon.length < 1) return message.replay('You must supply a reason to warn them.');
  if(message.mentions.users.size < 1) return message.replay('You must mention someone to warn them.').catch(console.error);

  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimeStamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);

  return audit.sendEmbed({embed});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Warns a user.',
  usage: 'warn <user> <reason>'
};
