const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./config/settings.json')

var prefix = '='

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');

  let channel = message.channel
  let author = message.author
  let server = message.guild
  let avatar = client.user.avatarURL;
  let uvatar = author.avatarURL


  if (command === 'nick' & message.author.id === '124989722668957700') {
    client.user.setUsername(argresult)
      .then(user => console.log(`My new username is ${user.username}`))
      .catch(console.error);
    }; else

  if (command === 'info' || command === 'help') {
    channel.send('No embed yet so no help.')
      .then(message => console.log(`send message: ${message.content}`))
      .catch(console.error);
  }; else

  if (command === 'embed') {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setFooter(`Requested by ${author.username}`, uvatar)
      .setThumbnail(avatar)
      .setDescription(argresult)
      .setTimestamp();
    channel.send({embed})
    .then(message => console.log('send embed: ${message.content}'))
    .catch(console.error);
  }; else

});



client.on('message', (message) => {

  let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');

  let channel = message.channel

  if(message.author.bot) return;

  if (message.content.includes('ping')) {
    channel.send('pong')
  }; else

  if (message.content.toLowerCase().includes('pubg')) {
    var pubg = ['ja', 'nee', 'kom zelf pubg', 'waarom?', 'wel met esref', 'okay', 'kom csgo']
    channel.send(pubg[Math.floor(Math.random() *pubg.length)])
  } else

});

  // const cmdFiles = await readdir("./commands/");
  //  console.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  //  cmdFiles.forEach(f => {
  //    try {
  //      const props = require(`./commands/${f}`);
  //      if (f.split(".").slice(-1)[0] !== "js") return;
  //      client.log("log", `Loading Command: ${props.help.name}. 👌`);
  //      client.commands.set(props.help.name, props);
  //      props.conf.aliases.forEach(alias => {
  //        client.aliases.set(alias, props.help.name);
  //      });
  //    } catch (e) {
  //      client.log(`Unable to load command ${f}: ${e}`);
  //    }
  //  });

  //login
  client.login(settings.token);
