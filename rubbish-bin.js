const tmi = require('tmi.js');

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const channelName = process.env.CHANNEL_NAME;
const client = new tmi.client(opts);

client.on('connected', onConnectedHandler);
client.connect();

client.on('chat', (channel, user, message, self) => {
  const commandName = message.trim();
  // if (self) {return;}
  // if (user['username'] === client.getUsername()){
  //   return;
  // }
  if (commandName.includes('что за сервер') || 
  commandName.includes('какой сервер') || commandName === '!Сервер' || commandName === '!сервер' || 
  commandName.includes('что за сервак') || commandName.includes('какой сервак') || commandName.includes('!server') || 
  commandName.includes('!Server') || commandName.includes('какой серв') || commandName.includes('что за серв') || commandName.includes('что это за сервер') ||
  commandName.includes('Что за сервак') || commandName.includes('Что за сервер') || commandName.includes('Что это за сервер') ||
  commandName.includes('Что это за сервак') || commandName.includes('Какой сервак') || commandName.includes('Какой сервер')) {
    client.say(channelName, `@${user['display-name']} L2 Essence, Server: White, ruoff`);
    console.log(`* Executed ${commandName} command`);
  }
});
// (sent by bot) :robot:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
