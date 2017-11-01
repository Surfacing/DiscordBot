const config = require('../config.json');
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');

exports.run = async (client, message, args) => {
	try {
  let user = message.mentions.users.first();
  let audit = client.channels.get(config.audit);

  parseUser(message, user);

  const caseNum = await caseNumber(client, audit);

  if(!audit) return message.replay('Can\'t find audit channel').catch(console.error);
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);

const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${config.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
 .setFooter(`Case ${caseNum}`);

  return audit.send({embed});
} catch (e) {
	console.log(`Error during warn: ${e}`);	
}

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
