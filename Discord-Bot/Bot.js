const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const ddiff = require('return-deep-diff');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

// Login stuff
client.login(config.token);

// Guild delete / Bot left
// client.on('guildDelete' , guild => {
//   console.log(`Bot left guild ${guild.name} at ${new Date()}`);
// });

// Guild create / Bot joined
// client.on('guildCreate' , guild => {
//   console.log(`Bot joined guild ${guild.name} at ${new Date()}`);
// });

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

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', config.mod_role);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', config.admin_role);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === config.ownerid) permlvl = 4;
  return permlvl;
};
