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
  if (client.mod) {
    // console.log(`successful test`);
      client.timeout(channelName, "@${user['name']}", 2);
      console.log(`* Executed ${commandName} command`);
  }
});

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// const tmi = require('tmi.js');

// const opts = {
//   connection: {
//         reconnect: true,
//         secure: true
//     },
//   identity: {
//     username: process.env.BOT_USERNAME,
//     password: process.env.OAUTH_TOKEN
//   },
//   channels: [
//     process.env.CHANNEL_NAME
//   ]
// };

// const channelName = '';

// const client = new tmi.client(opts);
// client.on('connected', onConnectedHandler);
// client.connect();

// client.on('chat',(channel, user, message, self) => {
//   const commandName = message.toLowerCase().trim();
//   if (self) {return;}
//   if (user['username'] === client.getUsername()){
//     return;
//   }
//   //console.log(user['message-type'], user['username'], message);
//   if (commandName.includes(' пидр ') || commandName.includes(' пидор ') || commandName.includes(' пидарас ') ||
//       commandName.includes(' пидар ') || commandName.includes(' нига ') || commandName.includes(' нигга ') || 
//       commandName.includes(' ниггер ') || commandName.includes(' нигер ')) {
//     client.timeout('channelName', user['username'], 600);
//     console.log(`* Executed ${commandName} command`);
//   }
// });

// //Called every time the bot connects to Twitch chat
// function onConnectedHandler (addr, port) {
//   console.log(`* Connected to ${addr}:${port}`);
// }
