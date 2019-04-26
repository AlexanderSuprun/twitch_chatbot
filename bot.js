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

const channelName = 'ponchi_one'
const client = new tmi.client(opts);

client.on('connected', onConnectedHandler);
client.connect();

client.on('chat', (channel, user, message, self) => {  
  const commandName = message.trim();
  if (self) {return;}
  if (user['username'] === client.getUsername()){
    return;
  }
  if (commandName.includes('что за сервер') || 
  commandName.includes('какой сервер') || commandName.includes('!Сервер') || commandName.includes('!сервер') || 
  commandName.includes('что за сервак') || commandName.incudes('какой сервак') || commandName.includes('!server') || commandName.includes('!Server')) {
    client.say(channelName, `@${user['display-name']} L2 Essence, Server: White, ruoff`);
    console.log(`* Executed ${commandName} command`);
  }
});

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

client.on('disconnected', (reason) => {
  console.log('Disconnected from server ' + reason);
  client.connect();
});