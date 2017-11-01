// Main stuff
client.on('message', message => {
  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  // Only get active, if a prefix was send
  if(!message.content.startsWith(config.prefix)) return;
  // Ignore messages from self
  if(message.author.bot) return;

});
