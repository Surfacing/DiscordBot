const Discord = require('discord.js');
const config = require('./config.json');
const ddiff = require('return-deep-diff');
const chalk = require('chalk');
const client = new Discord.Client();

// Do something when ready
client.on("ready",() => {
  console.log(chalk.bgGreen("I\`m Online!"));
});

// Login stuff
client.login(config.token);

// Guild delete / Bot left
client.on('guildDelete' , guild => {
  console.log(`Bot left guild ${guild.name} at ${new Date()}`);
});

// Guild create / Bot joined
client.on('guildCreate' , guild => {
  console.log(`Bot joined guild ${guild.name} at ${new Date()}`);
});

// Member joines
client.on('guildMemberAdd' , member  => {
  let guild = member.guild;
  client.channels.get(config.audit).send(`User ${member.user} joined the Server.`);
});

// Member partes
client.on('guildMemberRemove' , member  => {
  let guild = member.guild;
  client.channels.get(config.audit).send(`User ${member.user} left the Server.`);
});

client.on('guildMemberUpdate', (oMember, nMember) => {
  client.channels.get(config.audit).send(`User ${oMember.user} changed following attribute: ${ddiff(oMember,nMember)}`);
});

client.on('guildBanAdd' , (guild, user)  => {
  client.channels.get(config.audit).send(`User ${user.uesrname} got banned from ${guild.name}.`);
});

client.on('guildBanRemove' , (guild, user)  => {
  client.channels.get(config.audit).send(`User ${user.uesrname} ban was removed from ${guild.name}.`);
});

var tokenRegex = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('debug', e => {
  console.log("Debug: "+e.replace(tokenRegex, 'that was redacted'));
});

client.on('warn', e => {
  console.log(chalk.bgYellow("Warning: "+e.replace(tokenRegex, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed("Error: "+e.replace(tokenRegex, 'that was redacted')));
});

client.on('disconnect', () => {
  console.log(`Bot was disconnected at ${new Date()}`);
});

client.on('reconnectiong', () => {
  console.log(`Bot reconnected at ${new Date()}`);
});

// Main stuff
client.on('message', message => {
  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  // Only get active, if a prefix was send
  if(!message.content.startsWith(config.prefix)) return;
  // Ignore messages from self
  if(message.author.bot) return;

  // Commands
  if(message.content.startsWith(config.prefix + 'ping')) {
    client.channels.get(config.audit).send(`Pong! ${new Date() - message.createTimeStamp} ms`);
  }

  if(message.content.startsWith(config.prefix + 'setGame')) {
//    if(!!argresult && argresult.lenght !== 0) {
        console.log(`User: ${message.author.username} set game to: ${argresult}`);
      client.user.setGame(argresult);
//    }
  }

  if(message.content.startsWith(config.prefix + 'setState')) {
    if(!!argresult && argresult.lenght !== 0) {
        console.log(`User: ${message.author.username} set state to: ${argresult}`);
      client.user.setStatus(argresult);
    }
  }

  if(message.content.startsWith(config.prefix + 'purge')) {
        console.log(`User: ${message.author.username} requested purge of: ${argresult} messages`);
      message.channel.fetchMessages({limit: parseInt(argresult)+1}).then(messages => message.channel.bulkDelete(messages));
  }
});
